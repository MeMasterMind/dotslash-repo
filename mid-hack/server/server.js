const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const multer = require('multer');
const spawn = require('child_process').spawn;
const bodyParser = require('body-parser');
const createObjectCsvWriter = require('csv-writer').createObjectCsvWriter
const fs = require('fs');

// MongoDB user schema and model
const User = require('./models/User');

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Express app setup
const app = express();
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000', // React app URL
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
    cors({
      origin: process.env.FRONTEND_URL, // React app URL
      credentials: true, 
    })
  );

// Passport Google OAuth configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        image: profile.photos[0].value,
      };
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        } else {
          user = await User.create(newUser);
          return done(null, user);
        }
      } catch (err) {
        console.error(err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    // Redirect to frontend after successful login
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  }
);

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect(`${process.env.FRONTEND_URL}/`);
  });
});

app.get('/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});

app.post('/contact', (req, res) => {
  console.log(req.body);
  res.json({ message: 'Message received!' });
});


const upload = multer({ dest: 'uploads/' });
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    console.log(`Uploaded file: ${req.file.originalname} feeding the model...`);
    
    const newFilePath = path.join(req.file.destination, `${req.file.filename}.csv`);
    
    fs.rename(req.file.path, newFilePath, (err) => {
      if (err) {
        return res.status(500).send('Error renaming the file.');
      }
  
      const pythonProcess = spawn('python3', ['prediction_model.py', newFilePath]);
  
      let dataToSend = '';
      pythonProcess.stdout.on('data', (data) => {
        dataToSend += data.toString();
      });
  
      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          return res.status(500).send('Error in processing the CSV file.');
        }
  
        // clean up the uploaded file after processing
        // fs.unlink(newFilePath, (err) => {
        //   if (err) {
        //     console.error('Error removing uploaded file:', err);
        //   }
        // });
  
        try {
          const parsedResult = JSON.parse(dataToSend);
          res.json(parsedResult);
        } catch (err) {
          console.error('Error parsing Python output:', err);
          res.status(500).send('Failed to parse output.');
        }
      });
  
      pythonProcess.stderr.on('data', (data) => {
        console.error(`Python error: ${data.toString()}`);
      });
    });
  });
  
  
  const csvWriter = createObjectCsvWriter({
    path: 'transactions.csv',
    header: [
      { id: 'user', title: 'User' },
      { id: 'card', title: 'Card' },
      { id: 'year', title: 'Year' },
      { id: 'month', title: 'Month' },
      { id: 'day', title: 'Day' },
      { id: 'time', title: 'Time' },
      { id: 'amount', title: 'Amount' },
      { id: 'use_chip', title: 'Use Chip' },
      { id: 'merchant_name', title: 'Merchant Name' },
      { id: 'merchant_city', title: 'Merchant City' },
      { id: 'merchant_state', title: 'Merchant State' },
      { id: 'zip', title: 'Zip' },
      { id: 'mcc', title: 'MCC' },
      { id: 'errors', title: 'Errors?' },
      { id: 'is_fraud', title: 'Is Fraud?' }
    ]
  });
  
// endpoint to receive the form data, convert it to CSV, and feed it to the model. If the csv already exists, it will be appended to and the model will be trained on the new data.
  app.post('/upload-form', (req, res) => {
    console.log(req.body);
    const received = req.body; // Expecting an array of objects
    
    const records = received.map((item) => {
      const [Year, Month, Day] = item.date.split('-');
      return {
        user: 0, 
        card: 0, 
        year: Year,
        month: Month,
        day: Day,
        time: item.time,
        amount: '$' + item.amount,
        use_chip: item.use_chip,
        merchant_name: item.merchant_name,
        merchant_city: item.merchant_city,
        merchant_state: item.merchant_state,
        zip: item.zip,
        mcc: item.mcc,
        errors: item.errors,
        is_fraud: "No"
      };
    });
  
    csvWriter.writeRecords(records).then(() => {
      const newFilePath = path.join('transactions.csv');
      fs.rename(newFilePath, newFilePath, (err) => {
        if (err) {
          return res.status(500).send('Error renaming the file.');
        }
        
        const pythonProcess = spawn('python3', ['prediction_model.py', newFilePath]);
        
        let dataToSend = '';
        pythonProcess.stdout.on('data', (data) => {
          dataToSend += data.toString();
        });
  
        pythonProcess.on('close', (code) => {
          if (code !== 0) {
            return res.status(500).send('Error in processing the CSV file.');
          }
  
          try {
            const parsedResult = JSON.parse(dataToSend);
            res.json(parsedResult);
          } catch (err) {
            console.error('Error parsing Python output:', err);
            res.status(500).send('Failed to parse output.');
          }
        });
  
        pythonProcess.stderr.on('data', (data) => {
          console.error(`Python error: ${data.toString()}`);
        });
      });
    });
  });
  
// Start server
const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
