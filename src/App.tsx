import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Skills from "./components/Skills"

import Experience from './components/Experience'
import Education from "./components/Education"
import ContactMe from './components/ContactMe'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer"
import TechBackground from './components/TechBackground'


const App = () => {
  return (
    <div className="portfolio-page">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <TechBackground />
      <Navbar/>    
      <ToastContainer/>  
      <main id="main-content">
      <Hero/>
      <Skills/>
      
      <Experience/>
      <Education/>
      <ContactMe/>
      </main>
      <Footer/>
    </div>
  )
}

export default App
