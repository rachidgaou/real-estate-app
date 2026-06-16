import {Routes,Route} from "react-router-dom"
import Home from './pages/Home.jsx'
import Navbar from "./components/navbar.jsx"
import Properties from "./pages/Properties.jsx"
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx"
import AddProperties from "./pages/AddProperties.jsx"



function App() {
  
  return (
    <>
    <Navbar/>
 <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/properties" element={<Properties />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
   <Route path="/AddProperties" element={<AddProperties />} />
</Routes>
      
    </>
  )
}
/*
Then create these pages:

Home
Properties
PropertyDetails
About
Contact
Admin
AddProperty
EditProperty
*/
export default App
