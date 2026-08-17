import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Skills from "./components/Skills"

import Experience from './components/Experience'
import Education from "./components/Education"
import ContactMe from './components/ContactMe'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer"


const App = () => {
  return (
    <div>
      <Navbar/>    
      <ToastContainer/>  
      <Hero/>
      <Skills/>
      
      <Experience/>
      <Education/>
      <ContactMe/>
      <Footer/>
    </div>
  )
}

export default App
