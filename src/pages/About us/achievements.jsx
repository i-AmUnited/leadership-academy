import achievementIcon from "../../assets/logo and icons/achievement.png"
const Achievements = () => {
    const achievements = [
          {
            year: "2024",
            achievement: "1st position Spelling Bee – Ondo State Education Awards",
            icon: achievementIcon,
          },
          {
            year: "2024",
            achievement: "8th position in the Nation Spelling Bee",
            icon: achievementIcon,
          },
          {
            year: "2024",
            achievement: "3rd best mathematics – Ondo State Education Awards",
            icon: achievementIcon,
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
                Our facilities
            </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {achievements.map((item, index) => (
              <div key={index} className="bg-white p-6 border-b-2 border-brandRed">
                <img
                  src={item.icon}
                  alt={item.year}
                  className="size-[100px] flex justify-center mx-auto"
                />
                <div className="grid gap-4 text-sm mt-4 text-center">
                 <span className="font-bold">{item.achievement}</span>
                 <span className="leading-6 text-brandLightBlack/60">{item.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
     );
}
 
export default Achievements;