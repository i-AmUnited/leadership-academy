import classroom from "../../assets/logo and icons/classroom.png";
import lab from "../../assets/logo and icons/lab.png";
import library from "../../assets/logo and icons/library.png";
import dining from "../../assets/logo and icons/dining.png";
import clinic from "../../assets/logo and icons/clinic.png";
import hostel from "../../assets/logo and icons/hostel.png";
import studio from "../../assets/logo and icons/studio.png";
import field from "../../assets/logo and icons/field.png";
import computer from "../../assets/logo and icons/computer.png";

const Facilities = () => {

    const facilities = [
      {
        title: "Modern Classrooms",
        caption: "Our classrooms are bright, spacious, and equipped with modern teaching tools that create a comfortable and effective learning environment for every student.",
        icon: classroom,
      },
      {
        title: "Science Laboratories",
        caption: "Well-equipped science labs provide hands-on learning experiences in Physics, Chemistry, and Biology, encouraging curiosity and experimentation.",
        icon: lab,
      },
      {
        title: "Library & Resource Centre",
        caption: "The school library offers a wide collection of books, digital resources, and quiet study spaces to support academic growth and independent learning.",
        icon: library,
      },
      {
        title: "ICT & Computer Lab",
        caption: "Our ICT lab is designed to give students practical skills in technology, coding, and digital literacy to prepare them for the modern world.",
        icon: computer,
      },
      {
        title: "Sports & Recreation Facilities",
        caption: "We believe in balancing academics with physical fitness. Our sports fields and courts encourage teamwork, discipline, and healthy competition.",
        icon: field,
      },
      {
        title: "Arts & Creative Studio",
        caption: "From music and drama to visual arts, our creative spaces give students opportunities to express themselves and develop their talents.",
        icon: studio,
      },
      {
        title: "School Hostel",
        caption: "Our hostel offers students a safe and supportive home. Students can focus on their studies and enjoy a friendly environment.",
        icon: hostel,
      },
      {
        title: "School Clinic",
        caption: "The school’s health centre ensures students’ well-being with first aid, basic medical care, and wellness support.",
        icon: clinic,
      },
      {
        title: "Cafeteria & Dining Hall",
        caption: "Our cafeteria provides nutritious meals and snacks in a clean, friendly environment where students can relax and socialise.",
        icon: dining,
      },
    ];
    return ( 
        <div className="px-4 md:px-[120px] py-20 grid gap-10">
            <div className="text-center">
            <div className="flex justify-center">
                <div className="smallTitle w-fit grid relative">
                <span className="z-10 text-brandRed">About us</span>
                <span className="h-[6px] bg-brandRed/15 w-full text-start items-start absolute bottom-1"></span>
                </div>
            </div>
            <div className="brandFont text-4xl font-bold text-pretty mb-6 mt-2 text-brandBlue">
                Our facilities
            </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-14 mb-10">
            {facilities.map((item, index) => (
              <div key={index} className="">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="size-[100px]"
                />
                <div className="grid gap-4 text-sm mt-4">
                 <span className="font-bold">{item.title}</span>
                 <span className="leading-6">{item.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
     );
}
 
export default Facilities;