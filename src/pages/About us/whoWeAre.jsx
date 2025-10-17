import banner from "../../assets/images/whoweareBanner.png"
import founderImage from "../../assets/images/founder.png"

const WhoWeAre = () => {
    return (
      <div className="px-4 md:px-[120px] py-20 grid gap-10">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="smallTitle w-fit grid relative">
              <span className="z-10 text-brandRed">Who we are</span>
              <span className="h-[6px] bg-brandRed/15 w-full text-start items-start absolute bottom-1"></span>
            </div>
          </div>
          <div className="brandFont text-4xl font-bold text-pretty mb-6 mt-2 md:w-1/2 flex justify-self-center text-brandBlue">
            An outstanding school design to produce the total man in the
            society.
          </div>
        </div>
        <img src={banner} alt="" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-sm">
          <div>
            <div className="">
              <div className="smallTitle w-fit grid relative">
                <span className="z-10 text-brandRed">Our Mission</span>
                <span className="h-[6px] bg-brandRed/15 w-full text-start items-start absolute bottom-1"></span>
              </div>
            </div>
            <ul className="list-disc ps-4 grid gap-4 mt-4">
              <li>
                To teach with high expectations, striving to ensure
                pupils/students fulfil their potential in both the academic and
                complementary curriculum
              </li>
              <li>
                To develop inquiring, knowledgeable, creative, and articulate
                lifelong learners
              </li>
              <li>
                To encourage pupils/students to work towards leadership and
                other positive contributions to the life of the school and wider
                community
              </li>
              <li>
                To encourage pupils/students to adopt healthy, physically active
                and safe lifestyles
              </li>
              <li>
                To develop pupils/students who are both happy and capable of
                future independence
              </li>
              <li>
                To develop pupils/students who will respect others, take
                responsibility for their own actions, and become good citizens
              </li>
              <li>
                To ensure pupils/students display self-discipline and
                responsible behaviour that makes a positive difference to the
                life of the school
              </li>
              <li>
                To develop excellent working relationships between all those
                involved in the life of the school.
              </li>
            </ul>
          </div>
          <div>
            <div>
              <div className="">
                <div className="smallTitle w-fit grid relative">
                  <span className="z-10 text-brandRed">Our Core Value</span>
                  <span className="h-[6px] bg-brandRed/15 w-full text-start items-start absolute bottom-1"></span>
                </div>
              </div>
              <ul className="list-disc ps-4 grid gap-4 mt-4">
                <li>To be excellent role models in all we do</li>
                <li>To strive to make a positive difference</li>
                <li>To ensure that health and safety are never at risk</li>
                <li>To show respect for the environment</li>
                <li>To be calm, polite, and fair in all our relationships</li>
                <li>
                  To allow no place for any form of aggression or violence
                </li>
                <li>
                  To act with open-mindedness, transparency, understanding and
                  forgiveness
                </li>
                <li>
                  To ensure the needs of the individual and school community are
                  in harmony
                </li>
                <li>
                  To show respect for each person’s unique role in the life of
                  the school.
                </li>
              </ul>
            </div>
            <div className="mt-16">
              <div className="">
                <div className="smallTitle w-fit grid relative">
                  <span className="z-10 text-brandRed">Our Vision</span>
                  <span className="h-[6px] bg-brandRed/15 w-full text-start items-start absolute bottom-1"></span>
                </div>
              </div>
              <ul className="grid gap-4 mt-4">
                <li>... developing leaders for the dynamic global society</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-20 bg-[#FAFAFA] grid lg:flex items-center">
          <div className="lg:w-[60%]">
            <div className="p-6">
              <div className="">
                <div className="smallTitle w-fit grid relative">
                  <span className="z-10 text-brandRed">Word from our founder</span>
                  <span className="h-[6px] bg-brandRed/15 w-full text-start items-start absolute bottom-1"></span>
                </div>
              </div>
              <div className="brandFont text-3xl font-semibold text-pretty mb-6 mt-2 text-brandBlue leading-12">
               "Our mission is simple: to provide quality education in a nurturing environment where every child can thrive academically and personally."
              </div>
              <div className="text-sm grid">
                <span className="font-bold">Mr T. Arobike</span>
                <span className="text-brandLightBlack">Founder & Principal</span>
              </div>
            </div>
          </div>
          <div className="lg:w-[40%]">
            <img src={founderImage} alt="" />
          </div>
        </div>
      </div>
    );
}
 
export default WhoWeAre;