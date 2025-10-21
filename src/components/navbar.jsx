import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo and icons/TLAO_LOGO.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { ChevronDown, Menu, X, ChevronUp } from "lucide-react";

function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutUsExpanded, setIsAboutUsExpanded] = useState(false);

  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const isAboutUsActive = ['/who-we-are', '/facilities', '/achievements', '/staff', '/school-policy'].some(
    path => pathname.startsWith(path)
  );

  const navLinkClass = (path) => {
    return isActive(path) 
      ? "underline decoration-2 decoration-brandRed font-semibold" 
      : "hover:text-brandRed transition-colors";
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsAboutUsExpanded(false);
  };

  return (
    <div className="bg-brandBlue px-4 md:px-[120px] py-5 flex justify-between items-center sticky top-0 z-50">
      <img src={logo} alt="" className="h-9" />
      
      {/* Desktop Navigation */}
      <div className="text-white text-sm hidden lg:flex gap-10">
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

      {/* Mobile Menu Toggle Button */}
      <button
        className="lg:hidden text-white"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-[72px] left-0 right-0 px-4 md:px-[120px] bg-brandBlue text-white lg:hidden h-[calc(100vh-72px)] overflow-y-auto z-40">
          <div className="px-6 py-8 grid gap-6 text-lg">
            <Link 
              to={"/"} 
              className={navLinkClass('/')}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            
            {/* About Us Expandable Section */}
            <div>
              <button
                className={`flex items-center justify-between w-full ${
                  isAboutUsActive 
                    ? "underline decoration-2 decoration-brandRed font-semibold" 
                    : "hover:text-brandRed transition-colors"
                }`}
                onClick={() => setIsAboutUsExpanded(!isAboutUsExpanded)}
              >
                <span>About us</span>
                {isAboutUsExpanded ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
              </button>
              
              {isAboutUsExpanded && (
                <div className="ml-6 mt-4 grid gap-4 text-base border-l-2 border-white pl-4">
                  <Link 
                    to={"/who-we-are"}
                    className={isActive('/who-we-are') ? "font-semibold underline decoration-2 decoration-brandRed" : "hover:text-brandRed transition-colors"}
                    onClick={closeMobileMenu}
                  >
                    Who we are
                  </Link>
                  <Link 
                    to={"/facilities"}
                    className={isActive('/facilities') ? "font-semibold underline decoration-2 decoration-brandRed" : "hover:text-brandRed transition-colors"}
                    onClick={closeMobileMenu}
                  >
                    Our facilities
                  </Link>
                  <Link 
                    to={"/achievements"}
                    className={isActive('/achievements') ? "font-semibold underline decoration-2 decoration-brandRed" : "hover:text-brandRed transition-colors"}
                    onClick={closeMobileMenu}
                  >
                    Our achievements
                  </Link>
                  <Link 
                    to={"/staff"}
                    className={isActive('/staff') ? "font-semibold underline decoration-2 decoration-brandRed" : "hover:text-brandRed transition-colors"}
                    onClick={closeMobileMenu}
                  >
                    Our staff
                  </Link>
                  <Link 
                    to={"/school-policy"}
                    className={isActive('/school-policy') ? "font-semibold underline decoration-2 decoration-brandRed" : "hover:text-brandRed transition-colors"}
                    onClick={closeMobileMenu}
                  >
                    School policy
                  </Link>
                </div>
              )}
            </div>

            <Link 
              to={"/admissions"} 
              className={navLinkClass('/admissions')}
              onClick={closeMobileMenu}
            >
              Admissions
            </Link>
            <Link 
              to={"/academics"} 
              className={navLinkClass('/academics')}
              onClick={closeMobileMenu}
            >
              Academics
            </Link>
            <Link 
              to={"/blog"} 
              className={navLinkClass('/blog')}
              onClick={closeMobileMenu}
            >
              News & Events
            </Link>
            <Link 
              to={"/gallery"} 
              className={navLinkClass('/gallery')}
              onClick={closeMobileMenu}
            >
              Gallery
            </Link>
            <Link 
              to={"/contact"} 
              className={navLinkClass('/contact')}
              onClick={closeMobileMenu}
            >
              Contact us
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;