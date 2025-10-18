import banner from "../assets/images/academicsBanner.png"

const Academics = () => {
    return ( 
        <div className="py-20 grid gap-10 bg-[#fafafa]">
            <div className="text-center md:px-[120px] lg:px-[231px]">
            <div className="flex justify-center">
                <div className="smallTitle w-fit grid relative">
                <span className="z-10 text-brandRed">Academics</span>
                <span className="h-[6px] bg-brandRed/15 w-full text-start items-start absolute bottom-1"></span>
                </div>
            </div>
            <div className="brandFont text-4xl font-bold text-pretty mb-6 mt-2 text-brandBlue">
                Academics at The Leadership Academy
            </div>
            </div>
            <div className="md:px-[120px] lg:px-[231px]">
                  <img src={banner} alt="" className="mb-5" /> 
                  <div className="bg-white p-4 md:p-6">
                    <div className="grid gap-4">
                        <span className="brandFont text-3xl font-bold">Our Curriculum</span>
                        <span className="text-sm leading-6">At The Leadership Academy, we follow the Nigerian curriculum, preparing students for the West African Examinations Council (WAEC) and the National Examinations Council (NECO). This curriculum is designed to provide a strong academic foundation while equipping learners with the knowledge and critical thinking skills they need to thrive. <br/><br/>
                          Our programmes emphasise a balance between core subjects and broader learning experiences, ensuring that students are well-prepared not only for examinations but also for future challenges in higher education and careers.
                        </span>
                    </div>
                  </div>
                  <div className="bg-white p-4 md:p-6">
                    <div className="grid gap-4">
                        <span className="brandFont text-3xl font-bold">Subjects Offered</span>
                        <span className="text-sm">Students benefit from a wide range of subjects that encourage both academic and personal growth. These typically include:</span>
                        <ul className="text-sm list-disc list-inside grid gap-2">
                          <li><span className="font-bold">Core Subjects:</span> English Language, Mathematics, Basic Science, Social Studies</li>
                          <li><span className="font-bold">Sciences:</span> Physics, Chemistry, Biology</li>
                          <li><span className="font-bold">Humanities:</span>  Literature-in-English, Government, History, Economics, Geography</li>
                          <li><span className="font-bold">Vocational & Creative Subjects:</span> Agricultural Science, Home Economics, Fine Arts, Music</li>
                          <li><span className="font-bold">Technology & ICT:</span>  Computer Science and practical ICT skills</li>
                          <li><span className="font-bold">Languages:</span> French and other Nigerian languages (depending on class level)</li>
                        </ul>
                        <span>This variety allows students to discover their strengths and interests while meeting national education standards.</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 md:p-6">
                    <div className="grid gap-4">
                        <span className="brandFont text-3xl font-bold">Teaching & Learning Approach</span>
                        <span className="text-sm leading-6">Our teachers go beyond traditional instruction to create an engaging and interactive classroom experience. Lessons are designed to encourage curiosity, participation, and collaboration. We combine proven teaching methods with the use of technology and practical exercises to make learning both meaningful and enjoyable.  <br/><br/>
                          Class sizes are kept manageable to ensure that each student receives personal attention and support.
                        </span>
                    </div>
                  </div>
                  <div className="bg-white p-4 md:p-6">
                    <div className="grid gap-4">
                        <span className="brandFont text-3xl font-bold">Assessments & Examinations</span>
                        <span className="text-sm leading-6">Assessment is a vital part of the learning process. Students are regularly evaluated through classwork, assignments, projects, and periodic tests. These assessments help teachers track progress and provide additional support where needed.  <br/><br/>
                          The academic journey culminates with preparation for the WAEC and NECO examinations, which serve as gateways to higher education opportunities both within Nigeria and internationally.
                        </span>
                    </div>
                  </div>
                  <div className="bg-white p-4 md:p-6">
                    <div className="grid gap-4">
                        <span className="brandFont text-3xl font-bold">Academic Support</span>
                        <span className="text-sm">We believe every child can succeed with the right guidance. Our academic support includes:</span>
                        <ul className="text-sm list-disc list-inside grid gap-2">
                          <li>Extra coaching sessions for students who need additional help</li>
                          <li>Study groups and peer learning activities</li>
                          <li>Access to the school library and ICT lab for research and assignments</li>
                          <li>Guidance and counselling to help students set academic and career goals</li>
                        </ul>
                        <span>This variety allows students to discover their strengths and interests while meeting national education standards.</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 md:p-6">
                    <div className="grid gap-4">
                        <span className="brandFont text-3xl font-bold">Preparing for the Future</span>
                        <span className="text-sm leading-6">Our commitment extends beyond passing examinations. We aim to nurture well-rounded students who can think critically, solve problems, and adapt to a changing world. By combining academic excellence with moral values and life skills, The Leadership Academy ensures that every graduate is ready to succeed in further studies and contribute meaningfully to society.
                        </span>
                    </div>
                  </div>
            </div>
        </div>
     );
}
 
export default Academics;