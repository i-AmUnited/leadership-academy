import heroImage from "../assets/images/heroImage.png"
import Button from "../components/button";
import mapIcon from "../assets/logo and icons/map-pin.png";
import messageIcon from "../assets/logo and icons/mail.png";
import capIcon from "../assets/logo and icons/graduation-cap.png";
import whoWeAre from "../assets/images/whoWeAre.png";
import arrowIcon from "../assets/logo and icons/arrow-right.png";
import downloadIcon from "../assets/logo and icons/download.png";
import classrooms from "../assets/logo and icons/classrooms.png";
import stem from "../assets/logo and icons/stem.png";
import art from "../assets/logo and icons/art.png";
import sports from "../assets/logo and icons/sports.png";
import school from "../assets/logo and icons/school.png";
import meals from "../assets/logo and icons/meal.png";
import nextStep from "../assets/images/next step.png";
import { Link } from "react-router-dom";
import img1 from "../assets/images/Rectangle 11.png";
import img2 from "../assets/images/Rectangle 12.png";
import img3 from "../assets/images/Rectangle 13.png";

const LandingPage = () => {
    const features = [
  {
    title: "Modern Classrooms",
    description: "Bright, tech-equipped spaces that enhance learning.",
    icon: classrooms,
  },
  {
    title: "STEM Lab",
    description: "Hands-on science and innovation experience.",
    icon: stem,
  },
  {
    title: "Arts & Creativity",
    description: "Expressive opportunities in music, drama, and art.",
    icon: art,
  },
  {
    title: "Sports Grounds",
    description: "Facilities that support fitness and team spirit.",
    icon: sports,
  },
  {
    title: "School Transport",
    description: "Safe and reliable pick-up & drop-off services.",
    icon: school,
  },
  {
    title: "Healthy Meals",
    description: "Balanced meals served fresh every day.",
    icon: meals,
  },
];

const nextSteps = [
  {
    title: "Admissions Info",
    label: "Everything you need to know to get started",
    buttonText: "View Admissions",
    destination: "/",
    type: "link",
  },
  {
    title: "Contact Us",
    label: "Reach out with questions or to start enrolment",
    buttonText: "Send Enquiry",
    destination: "/",
    type: "link",
  },
  {
    title: "Book a Visit",
    label: "Schedule a tour and see our school in action",
    buttonText: "Book now",
    destination: "/",
    type: "link",
  },
  {
    title: "Download Prospectus",
    label: "Learn more about our curriculum and environment",
    buttonText: "Download PDF",
    destination: "/",
    type: "download",
  },
];

const blogPosts = [
  {
    title: "Nurturing Tomorrow’s Leaders Today",
    label: "We instil values of leadership, responsibility, and creativity that prepare students to make a positive impact in the world.",
    poster: img1,
  },
  {
    title: "Building a Strong Academic Foundation",
    label: "From early years to advanced levels, our curriculum is designed to foster critical thinking, problem-solving, and a lifelong love of learning.",
    poster: img2,
  },
  {
    title: "Where Learning Meets Creativity",
    label: "We encourage students to explore their talents in arts, sports, and technology, ensuring a well-rounded education.",
    poster: img3,
  },
];


    return (
      <div className="grid gap-20">
        {/* Hero section */}
        <div className="relative">
          <img
            src={heroImage}
            alt=""
            className="h-[90vh] w-full object-cover"
          />
          <div className="text-white absolute top-0 w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="smallTitle flex items-center justify-center gap-2">
                <span>
                  <img src={mapIcon} alt="" className="h-5" />
                </span>
                <span className="grid relative">
                  <span className="z-10">Owo,Ondo State, Nigeria.</span>
                  <span className="h-[6px] bg-brandRed w-full text-start items-start absolute bottom-1"></span>
                </span>
              </div>
              <div className="bigTitle py-5">The Leadership Academy, Owo.</div>
              <div className="text-sm">Leadership, Knowledge & Development</div>
              <div className="grid md:flex items-center justify-center gap-4 mt-10">
                <Button
                  background={"bg-brandLightBlue"}
                  buttonText={"Start Application"}
                  hasIcon
                  icon={capIcon}
                />
                <Button
                  background={"bg-white border-2 border-brandLightBlue"}
                  buttonText={"Make an enquiry"}
                  hasIcon
                  icon={messageIcon}
                  textColor={"text-brandLightBlue"}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Stats */}
        <div className="px-4 md:px-30 lg:px-[290px] grid gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-brandLightBlack">
            <div>
              Welcome to The Leadership Academy Owo, a place where young
              learners are nurtured to grow with confidence, curiosity, and
              compassion.{" "}
            </div>
            <div>
              We are proud to provide a safe, inclusive, and engaging
              environment where every child is valued and encouraged to reach
              their full potential.
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-24 text-sm text-brandLightBlack">
            <div className="flex items-end gap-4">
              <span className="bigTitle">6+</span>
              <span className="font-semibold">
                Years of education experience{" "}
              </span>
            </div>
            <div className="flex items-end gap-4">
              <span className="bigTitle">200+</span>
              <span className="font-semibold">
                Students enrolled since 2019{" "}
              </span>
            </div>
            <div className="flex items-end gap-4">
              <span className="bigTitle">26</span>
              <span className="font-semibold">Qualified teachers & staff </span>
            </div>
          </div>
          <hr className="md:w-2/3 flex md:justify-self-center mt-4 border-[#c4c4c480]" />
        </div>
        {/* Where learning begins */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-25 px-4 md:px-[120px]">
          <div className="text-sm">
            <span className="smallTitle w-fit grid relative">
              <span className="z-10 text-brandRed">Who we are.</span>
              <span className="h-[6px] bg-brandRed/15 w-full text-start items-start absolute bottom-1"></span>
            </span>
            <div className="brandFont text-4xl font-bold text-pretty mb-6 mt-2">
              Where Learning Begins and Confidence Grows
            </div>
            <div>
              We believe in a balanced approach to education — blending academic
              excellence with emotional and social development. <br /> <br />
              Our experienced staff, well-structured curriculum, and supportive
              environment ensure that every child receives the individual
              attention they need to thrive.
            </div>
            <div className="mt-7">
              <Button
                background={
                  "border-2 border-brandLightBlue text-brandLightBlue"
                }
                buttonText={"More about us"}
                hasIcon
                icon={arrowIcon}
              />
            </div>
          </div>
          <img src={whoWeAre} alt="" />
        </div>
        {/* What we do AND next steps */}
        <div>
          {/* What we have to offer */}
          <div className="bg-[#FAFAFA] py-20 px-4 md:px-[120px]">
            <div className="text-center">
              <div className="flex justify-center">
                <div className="smallTitle w-fit grid relative">
                  <span className="z-10 text-brandRed">
                    What we have to offer.
                  </span>
                  <span className="h-[6px] bg-brandRed/15 w-full text-start items-start absolute bottom-1"></span>
                </div>
              </div>
              <div className="brandFont text-4xl font-bold text-pretty mb-6 mt-2 md:w-1/2 flex justify-self-center text-brandBlue">
                Facilities and features that make our school special.
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-8 p-6 bg-white border-l-[2px] border-brandLightBlue"
                >
                  <img src={item.icon} alt={item.title} className="size-12" />
                  <div>
                    <span className="font-semibold text-sm text-brandBlue">
                      {item.title}
                    </span>
                    <p className="text-brandLightBlack text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Next steps */}
          <div
            className="bg-cover bg-center py-24"
            style={{ backgroundImage: `url(${nextStep})` }}
          >
            <div className="px-4 md:px-[120px]">
              <div className="brandFont text-3xl font-bold text-white">
                Take the Next Step.
              </div>
              <div className="text-white mt-2 text-sm">
                Everything you need to enrol, connect, and learn more.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {nextSteps.map((item, index) => (
                  <div
                    key={index}
                    className="grid p-6 bg-white border-l-[2px] border-brandLightBlue"
                  >
                    <div className="font-semibold text-sm text-brandBlue">
                      {item.title}
                    </div>
                    <div className="text-brandLightBlack text-sm my-3">
                      {item.label}
                    </div>
                    {item.type === "download" ? (
                      <a
                        key={index}
                        href={item.href}
                        download
                        className="bg-brandLightBlue/10 border-2 border-brandLightBlue text-brandLightBlue font-medium text-sm px-[22px] py-4 flex justify-center"
                      >
                        <span className="flex items-center gap-2">
                          {item.buttonText}
                          <img src={downloadIcon} alt="" className="size-6" />
                        </span>
                      </a>
                    ) : (
                      <Link
                        to={item.destination}
                        className="bg-brandLightBlue/10 border-2 border-brandLightBlue text-brandLightBlue font-medium text-sm px-[22px] py-4 text-center"
                      >
                        {item.buttonText}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Blog */}
        <div className="py-10 px-4 md:px-[120px]">
          <div className="text-center">
            <div className="flex justify-center">
              <div className="smallTitle w-fit grid relative">
                <span className="z-10 text-brandRed">News & Events</span>
                <span className="h-[6px] bg-brandRed/15 w-full text-start items-start absolute bottom-1"></span>
              </div>
            </div>
            <div className="brandFont text-4xl font-bold text-pretty mb-6 mt-2 flex justify-self-center text-brandBlue">
              Latest from Our Blog.
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {blogPosts.map((item, index) => (
              <div key={index} className="grid gap-4">
                <img src={item.poster} alt={item.title} className="aspect-video w-full" />
                <div>
                  <div className="font-semibold text-sm text-brandBlue">
                    {item.title}
                  </div>
                  <p className="text-brandLightBlack text-sm mt-2 mb-4 line-clamp-1">
                    {item.label}
                  </p>
                  <Link to={"/"} className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-brandLightBlue">Read more</span> <img src={arrowIcon} alt="" className="size-5"/>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
              <Button
                background={"border-2 border-brandLightBlue text-brandLightBlue"}
                buttonText={"View All News"}
                hasIcon
                icon={arrowIcon}
              />
          </div>
        </div>
      </div>
    );
}
 
export default LandingPage;