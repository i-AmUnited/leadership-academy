import "./App.css";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import logo from "../src/assets/logo and icons/TLAO_LOGO.png";
import LandingPage from "./pages/landing";
import sendMessageBanner from "../src/assets/images/sendMessageBanner.png";
import Button from "./components/button";
import arrowIcon from "../src/assets/logo and icons/arrow-right.png";
import location from "../src/assets/logo and icons/map-pin-red.png";
import clock from "../src/assets/logo and icons/clock-red.png";
import message from "../src/assets/logo and icons/mail-red.png";
import phone from "../src/assets/logo and icons/phone-red.png";
import facebook from "../src/assets/logo and icons/facebook.png";
import insta from "../src/assets/logo and icons/instagram.png";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./components/ui/tooltip"
import WhoWeAre from "./pages/About us/whoWeAre";
import Facilities from "./pages/About us/facilities";
import Achievements from "./pages/About us/achievements";
import Staff from "./pages/About us/staff";
import SchoolPolicy from "./pages/About us/schoolPolicy";
import Enrollment from "./pages/admissions/enrollments";
import Admissions from "./pages/admissions/admissions";
import Academics from "./pages/academics";
import BlogList from "./pages/blog/blogLists";
import BlogPost from "./pages/blog/blogPost";
import Gallery from "./pages/gallery";
import ContactUs from "./pages/contactUs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";
import { ChevronDown } from "lucide-react";

// Create a separate Navbar component to use useLocation
function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;

  // Check if current path matches or starts with the given path
  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  // Check if any "About Us" route is active
  const isAboutUsActive = ['/who-we-are', '/facilities', '/achievements', '/staff', '/school-policy'].some(
    path => pathname.startsWith(path)
  );

  const navLinkClass = (path) => {
    return isActive(path) 
      ? "underline decoration-2 decoration-brandRed font-semibold" 
      : "hover:text-brandRed transition-colors";
  };

  return (
    <div className="bg-brandBlue px-4 md:px-[120px] py-5 flex justify-between items-center sticky top-0 z-50">
      <img src={logo} alt="" className="h-9" />
      <div className="text-white text-sm hidden md:flex gap-10">
        <Link to={"/"} className={navLinkClass('/')}>
          Home
        </Link>
        
        <Popover>
          <PopoverTrigger 
            className={`flex items-center gap-2 cursor-pointer ${
              isAboutUsActive 
                ? "decoration-2 border-brandRed font-semibold" 
                : "hover:text-brandRed transition-colors"
            }`}
          >
            <span className={`${isAboutUsActive?"underline decoration-2 decoration-brandRed font-semibold":""}`}>About us</span> <ChevronDown className="size-4"/>
          </PopoverTrigger>
          <PopoverContent className={"grid text-sm gap-4 mt-4"}>
            <Link 
              to={"/who-we-are"}
              className={isActive('/who-we-are') ? "font-semibold underline decoration-2 decoration-brandRed" : "hover:text-brandRed transition-colors"}
            >
              Who we are
            </Link>
            <Link 
              to={"/facilities"}
              className={isActive('/facilities') ? "font-semibold underline decoration-2 decoration-brandRed" : "hover:text-brandRed transition-colors"}
            >
              Our facilities
            </Link>
            <Link 
              to={"/achievements"}
              className={isActive('/achievements') ? "font-semibold underline decoration-2 decoration-brandRed" : "hover:text-brandRed transition-colors"}
            >
              Our achievements
            </Link>
            <Link 
              to={"/staff"}
              className={isActive('/staff') ? "font-semibold underline decoration-2 decoration-brandRed" : "hover:text-brandRed transition-colors"}
            >
              Our staff
            </Link>
            <Link 
              to={"/school-policy"}
              className={isActive('/school-policy') ? "font-semibold underline decoration-2 decoration-brandRed" : "hover:text-brandRed transition-colors"}
            >
              School policy
            </Link>
          </PopoverContent>
        </Popover>

        <Link to={"/admissions"} className={navLinkClass('/admissions')}>
          Admissions
        </Link>
        <Link to={"/academics"} className={navLinkClass('/academics')}>
          Academics
        </Link>
        <Link to={"/blog"} className={navLinkClass('/blog')}>
          News & Events
        </Link>
        <Link to={"/gallery"} className={navLinkClass('/gallery')}>
          Gallery
        </Link>
        <Link to={"/contact"} className={navLinkClass('/contact')}>
          Contact us
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/who-we-are" element={<WhoWeAre />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/school-policy" element={<SchoolPolicy />} />
        <Route path="/enrollment" element={<Enrollment />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/post" element={<BlogPost />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>

      <div>
        <div
          className="bg-cover bg-center py-24"
          style={{ backgroundImage: `url(${sendMessageBanner})` }}
        >
          <div className="px-4 md:px-[120px] text-center">
            <div className="brandFont text-3xl font-bold text-white">
              Have Questions? Ready to Apply?
            </div>
            <div className="text-white mt-2 mb-10 text-sm">
              Our admissions team is happy to assist you.
            </div>
            <div className="flex justify-center">
              <Button
                buttonText="Send us a message"
                background="bg-white border-2 border-brandLightBlue"
                textColor="text-brandLightBlue"
                hasIcon={true}
                icon={arrowIcon}
              />
            </div>
          </div>
        </div>
        <div className="px-4 md:px-[120px] py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 border">
          <div className="grid gap-4">
            <div className="brandFont text-3xl font-bold">Join us today!</div>
            <div className="grid md:flex gap-3 items-center text-sm">
              <img src={location} alt="" className="size-5" />
              <span>
                The Leadership Academy, Otapete, along Owo, Akure road, Owo
              </span>
            </div>
            <div className="grid md:flex gap-3 items-center text-sm">
              <img src={clock} alt="" className="size-5" />
              <span>Mon – Fri: 8:00 AM – 4:00 PM</span>
            </div>
            <div className="mt-5">
              <Button
                buttonText="Contact Admissions"
                background="bg-brandLightBlue"
                textColor="text-white"
              />
            </div>
          </div>
          <div className="truncate">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
              <div className="grid gap-4">
                <div className="font-bold">Quick links</div>
                <ul className="text-sm grid gap-2 text-brandLightBlack">
                  <li>Home</li>
                  <li>Academics</li>
                  <li>Admissions</li>
                  <li>Gallery</li>
                  <li>Contact Us</li>
                </ul>
              </div>
              <div className="grid gap-4">
                <div className="font-bold">About us</div>
                <ul className="text-sm grid gap-2 text-brandLightBlack">
                  <li>Who are we</li>
                  <li>Facilities</li>
                  <li>Achievements</li>
                  <li>Staff</li>
                  <li>School policy</li>
                </ul>
              </div>
              <div>
                <div className="col-span-2 grid gap-4">
                  <div className="font-bold">Contact Information</div>
                  <ul className="text-sm grid gap-5 text-brandLightBlack">
                    <li className="grid gap-2">
                      <img src={message} alt="" className="size-5" />
                      <span className="grid">
                        <Tooltip>
                          <TooltipTrigger className="truncate cursor-pointer">
                            theleadershipacademyowo@yahoo.com
                          </TooltipTrigger>
                          <TooltipContent className="bg-brandBlue text-white py-2 cursor-default">
                            <span>theleadershipacademyowo@yahoo.com</span>
                          </TooltipContent>
                        </Tooltip>
                      </span>
                    </li>
                    <li className="grid gap-2">
                      <img src={phone} alt="" className="size-5" />
                      <span>08167589732</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 md:px-[120px] py-4 bg-brandBlue flex items-center gap-10 justify-center">
          <div className="text-white text-xs">
            Copyright © The Leadership Academy, Owo. All rights reserved.
          </div>
          <span className="text-2xl text-brandLightBlue">•</span>
          <div className="flex items-center gap-4">
            <img src={facebook} alt="" className="size-5" />
            <img src={insta} alt="" className="size-5" />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;