import { useEffect, useState } from "react"
import banner from "../../assets/images/admissionsBanner.png";
import Button from "../../components/button";
import phone from "../../assets/logo and icons/phone-red.png"
import message from "../../assets/logo and icons/mail-red.png"
import map from "../../assets/logo and icons/map-pin-red.png"

const Enrollment = () => {
   const sections = [
  { id: 'section1', title: 'How to apply in person' },
  { id: 'section2', title: 'How to apply online' },
  { id: 'section3', title: 'Admission Requirements' },
  { id: 'section4', title: 'Contact Our Admissions Team' },
]

const [activeSection, setActiveSection] = useState('section1')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

    return (
      <div className="pt-20 grid gap-10">
        <div className="text-center px-4 md:px-[120px] lg:px-[231px]">
          <div className="flex justify-center">
            <div className="smallTitle w-fit grid relative">
              <span className="z-10 text-brandRed">Enrollment</span>
              <span className="h-[6px] bg-brandRed/15 w-full text-start items-start absolute bottom-1"></span>
            </div>
          </div>
          <div className="brandFont text-4xl font-bold text-pretty mb-6 mt-2 text-brandBlue">
            Admissions at The Leadership Academy, Owo
          </div>
        </div>
        <div className="border-t grid grid-cols-1 lg:flex">
          <div className="hidden lg:block lg:w-[25%] text-xs font-medium p-4">
            <div className="grid gap-4 sticky top-24 ">
                {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`p-4 text-left transition-all ${
                  activeSection === section.id
                    ? 'bg-blue-500/15 border-l-4 border-blue-500 font-medium'
                    : 'hover:bg-gray-100'
                }`}
              >
                {section.title}
              </button>
            ))}
            </div>
          </div>
          <div className="bg-[#fafafa] lg:w-full">
              <div className="grid lg:w-[90%] text-sm p-4 md:p-16">
                {/* apply in person */}
                <div className="grid py-12" id="section1">
                    <img src={banner} alt="" />
                    <span className="text-2xl font-bold mt-10 mb-5 brandFont">How to Apply In Person</span>
                    <ul className="list-decimal ps-3 font-semibold grid gap-6">
                        <li><span>Purchase a Form</span> <br/> <span className="font-normal">Admission forms are available at the school office for ₦15,000</span></li>
                        <li><span>Entrance Examination</span> <br/> <span className="font-normal">After submission, candidates will be scheduled to write an entrance examination at the school.</span></li>
                        <li><span>Interview</span> <br/> <span className="font-normal">Shortlisted candidates will sit for an interview with our admissions panel.</span></li>
                        <li><span>Admission Letter</span> <br/> <span className="font-normal">Successful candidates will receive their official admission letter to confirm enrolment.</span></li>
                    </ul>
                </div>
                {/* apply online */}
                <div className="grid py-12" id="section2">
                    
                    <span className="text-2xl font-bold mt-10 mb-5 brandFont">How to Apply Online</span>
                    <ul className="list-decimal ps-3 font-semibold grid gap-6 mb-10">
                        <li><span>Fill Out the Online Form</span> <br/> <span className="font-normal">Complete the online admissions form by clicking the button below.</span></li>
                        <li><span>Make Payment</span> <br/> <span className="font-normal">Securely pay the ₦15,000 form fee online.</span></li>
                        <li><span>Schedule Your Visit</span> <br/> <span className="font-normal">A day will be arranged for your child to sit for the entrance examination and interview at the school.</span></li>
                        <li><span>Receive Admission Letter</span> <br/> <span className="font-normal">Candidates who successfully pass both stages will be offered admission.</span></li>
                    </ul>
                    <Button 
                      buttonText="Start Online Application"
                      background="bg-brandLightBlue"
                      textColor="text-white"
                      className="w-fit"
                    />
                </div>
                {/* requirements */}
                <div className="grid py-12" id="section3">
                   <span className="text-2xl font-bold mt-10 mb-5 brandFont">Admission Requirements (What you will need)</span>
                    <ul className="list-decimal ps-3 font-semibold grid gap-6">
                      <li>Completed admission form (online or paper)</li>
                      <li>Previous academic records</li>
                      <li>Doctors letter/report (if applicable)</li>
                      <li>Two recent passport photographs</li>
                    </ul>
                </div>
                {/* contact */}
                <div className="grid py-12" id="section4">
                    <span className="text-2xl font-bold mt-5 brandFont">Our admissions team is happy to guide you through the process.</span>
                    <span className="mb-5 mt-3">Our admissions team is happy to guide you through the process.</span>
                    <ul className="grid gap-6">
                      <li className="flex items-center gap-2">
                        <img src={phone} alt="" className="size-5"/>
                        <span>08167589732</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <img src={message} alt="" className="size-5"/>
                        <span>theleadershipacademyowo@yahoo.com</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <img src={map} alt="" className="size-5"/>
                        <span>The Leadership Academy, Otapete, along Owo, Akure road, Owo</span>
                      </li>
                    </ul>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
}
 
export default Enrollment;