import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import logo from "../src/assets/logo and icons/TLAO_LOGO.png"
import LandingPage from './pages/landing'

function App() {
  return (
    <>
    <div className='bg-brandBlue px-4 md:px-[120px] py-5 flex justify-between items-center'>
      <img src={logo} alt="" className='h-9' />
      <div className='text-white text-sm hidden md:flex gap-10'>
        <span>Home</span>
        <span>About us</span>
        <span>Admissions</span>
        <span>Academics</span>
        <span>News & Events</span>
        <span>Gallery</span>
        <span>Contact us</span>
      </div>
    </div>
        <BrowserRouter>
          <Routes>
            <Route index element={<LandingPage />} />
            {/* <Route path="/status" element={<PaymentStatus />} /> */}
          </Routes>
        </BrowserRouter>
         <div className='py-50'></div>
    </>
  )
}

export default App
