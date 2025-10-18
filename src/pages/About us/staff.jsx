import staff_1 from "../../assets/images/staff_1.png"
import staff_2 from "../../assets/images/staff_2.png"
import staff_3 from "../../assets/images/staff_3.png"
import staff_4 from "../../assets/images/staff_4.png"
import staff_5 from "../../assets/images/staff_5.png"
import staff_6 from "../../assets/images/staff_6.png"
import staff_7 from "../../assets/images/staff_7.png"
import staff_8 from "../../assets/images/staff_8.png"

const Staff = () => {
    const staff = [
              {
                role: "Proprietor",
                name: "Oluwole Arobieke",
                profile: staff_1,
              },
              {
                role: "Principal",
                name: "Dr Akpan N I ",
                profile: staff_2,
              },
              {
                role: "Vice Principal Senior Section",
                name: "Mr Ijalana Tosin",
                profile: staff_3,
              },
              {
                role: "Vice Principal Junior Section",
                name: "Mr Owolabi Babatunde",
                profile: staff_4,
              },
              {
                role: "Physical Education Instructor",
                name: "Nneka Iyamu",
                profile: staff_5,
              },
              {
                role: "School Nurse",
                name: "Efe Ighodaro",
                profile: staff_6,
              },
              {
                role: "Hostel Manager",
                name: "Oluwatobi Adeyemi",
                profile: staff_7,
              },
              {
                role: "Speech-Language Pathologist",
                name: "Emeka Omoregie",
                profile: staff_8,
              },
        ]
    return ( 
         <div className="px-4 md:px-[120px] lg:px-[231px] py-20 grid gap-10 bg-[#fafafa]">
            <div className="text-center">
            <div className="flex justify-center">
                <div className="smallTitle w-fit grid relative">
                <span className="z-10 text-brandRed">About us</span>
                <span className="h-[6px] bg-brandRed/15 w-full text-start items-start absolute bottom-1"></span>
                </div>
            </div>
            <div className="brandFont text-4xl font-bold text-pretty mb-6 mt-2 text-brandBlue">
                Meet our dedicated staff
            </div>
            <div className="flex justify-center">
                <div className="text-sm md:w-1/2 lg:w-1/3">Passionate individuals who are committed excellent education.</div>
            </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {staff.map((item, index) => (
              <div key={index}>
                <img
                  src={item.profile}
                  alt={item.year}
                  className="aspect-square"
                />
                <div className="grid mt-4">
                 <span className="font-bold brandFont">{item.name}</span>
                 <span className="leading-6 text-brandLightBlack/60 text-xs">{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
     );
}
 
export default Staff;