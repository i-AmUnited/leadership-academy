import { useEffect, useState } from "react"


const SchoolPolicy = () => {
   const sections = [
  { id: 'section1', title: 'Attendance & Punctuality Policy' },
  { id: 'section2', title: 'Behaviour & Discipline Policy' },
  { id: 'section3', title: 'Uniform & Dress Code Policy' },
  { id: 'section4', title: 'Safeguarding & Child Protection Policy' },
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
        <div className="text-center md:px-[120px] lg:px-[231px]">
          <div className="flex justify-center">
            <div className="smallTitle w-fit grid relative">
              <span className="z-10 text-brandRed">About us</span>
              <span className="h-[6px] bg-brandRed/15 w-full text-start items-start absolute bottom-1"></span>
            </div>
          </div>
          <div className="brandFont text-4xl font-bold text-pretty mb-6 mt-2 text-brandBlue">
            School Policy & Rules
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
                {/* attendance and punctuality */}
                <div className="grid py-12" id="section1">
                    <span className="text-2xl font-semibold">Attendance & Punctuality Policy</span>
                    <span className="mb-5 mt-2"><span className="font-bold">Purpose:</span> To ensure students attend school regularly and arrive on time.</span>
                    <span className="leading-6">Regular school attendance and punctuality form the foundation of a child’s academic progress and overall growth. We expect all students to attend school consistently and to arrive on time for classes each day. Being punctual demonstrates responsibility and respect for the learning process, both for oneself and for others. <br/> <br/>
                      Parents or guardians are required to inform the school promptly of any absence, providing a valid reason such as illness, family emergency, or unavoidable circumstances. Extended absences should be communicated in advance to ensure students receive necessary academic support. Repeated lateness or unexplained absences may result in meetings with parents and further disciplinary measures. By working together, we aim to minimise disruptions and ensure that every student benefits fully from the learning opportunities available.
                    </span>
                </div>
                {/* bahaviour */}
                <div className="grid py-12" id="section2">
                    <span className="text-2xl font-semibold">Behaviour & Discipline Policy</span>
                    <span className="mb-5 mt-2"><span className="font-bold">Purpose:</span> To ensure a safe, respectful, and supportive school environment.</span>
                    <span className="leading-6">The school is dedicated to providing a safe, respectful, and inclusive environment where all members of the community can thrive. Students are expected to conduct themselves in a manner that upholds the values of honesty, integrity, kindness, and responsibility. This includes showing respect to teachers, peers, and school property, as well as maintaining appropriate behaviour both in and outside the classroom. <br/> <br/>
                      We adopt a positive approach to discipline, recognising and rewarding good conduct while addressing unacceptable behaviour through clear procedures. Acts of bullying, harassment, violence, or deliberate disruption will not be tolerated and will be dealt with firmly. Parents will be involved in any serious behavioural concerns to support the child’s growth and understanding. Our goal is to foster self-discipline and help students make positive choices that prepare them for life beyond school.
                    </span>
                </div>
                {/* dress code policy */}
                <div className="grid py-12" id="section3">
                    <span className="text-2xl font-semibold">Uniform & Dress Code Policy</span>
                    <span className="mb-5 mt-2"><span className="font-bold">Purpose:</span> To encourage unity, equality, and discipline through dress.</span>
                    <span className="leading-6">The school is dedicated to providing a safe, respectful, and inclusive environment where all members of the community can thrive. Students are expected to conduct themselves in a manner that upholds the values of honesty, integrity, kindness, and responsibility. This includes showing respect to teachers, peers, and school property, as well as maintaining appropriate behaviour both in and outside the classroom. <br/> <br/>
                      We adopt a positive approach to discipline, recognising and rewarding good conduct while addressing unacceptable behaviour through clear procedures. Acts of bullying, harassment, violence, or deliberate disruption will not be tolerated and will be dealt with firmly. Parents will be involved in any serious behavioural concerns to support the child’s growth and understanding. Our goal is to foster self-discipline and help students make positive choices that prepare them for life beyond school.
                    </span>
                </div>
                {/* safety policy */}
                <div className="grid py-12" id="section4">
                    <span className="text-2xl font-semibold">Health & Safety Policy</span>
                    <span className="mb-5 mt-2"><span className="font-bold">Purpose:</span>  To protect the well-being of all students and staff.</span>
                    <span className="leading-6">The health, safety, and welfare of every student and staff member is of paramount importance to the school. We are committed to providing a secure learning environment by following rigorous health and safety standards. This includes regular maintenance of school facilities, clear safety procedures, and the promotion of hygiene and well-being practices. Students must follow all safety instructions given by teachers and staff, particularly in science laboratories, workshops, and sports activities. <br/> <br/>
                      The school provides first aid support on site, and parents are asked to share any relevant medical information or conditions that may affect their child’s participation in school activities. In cases of emergencies, the school has established procedures to ensure swift and effective responses. Together with parents, we aim to instil in our students a strong sense of responsibility for their own health and safety, as well as that of others.
                    </span>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
}
 
export default SchoolPolicy;