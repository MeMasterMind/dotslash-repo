import Navbar from './NavbarL'
import Hero from './Hero'
import Features from './Features'
import WhatWeDo from './WhatWeDo'
import WhyChooseUs from './WhyChooseUs'
import Contact from './Contact'
import Footer from './Footer'
import '../App.css'

function LandingPage() {
  return (
    <div className="App">
      <Navbar />
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

