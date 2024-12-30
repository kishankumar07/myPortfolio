import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Skills from "./components/Skills"
import Projects from './components/Projects'
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
      <Projects/>
      <Experience/>
      <Education/>
      <ContactMe/>
      <Footer/>
    </div>
  )
}

export default App
