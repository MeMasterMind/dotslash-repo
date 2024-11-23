import NavbarL from './NavbarL'
import Hero from './Hero'
import Features from './Features'
import WhatWeDo from './WhatWeDo'
import WhyChooseUs from './WhyChooseUs'
import Contact from './Contact'
import Footer from './Footer'
import '../App.css'

function LandingPage({user}) {
  return (
    <div className="App">
      <NavbarL  user={user}/>
      <Hero />
      <Features />
      <WhatWeDo />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </div>
  )
}

export default LandingPage

