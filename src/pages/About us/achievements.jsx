import { useAchievements } from "../../lib/reuseableEffects";
import achievementIcon from "../../assets/logo and icons/achievement.png"
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinners/spinner";
const Achievements = () => {
  
    const { achievements } = useAchievements();
    const activeAchievements = achievements?.filter(achievement => achievement.status === "0") || [];
    return ( 
        <div className="px-4 md:px-[120px] lg:px-[231px] py-20 grid gap-10 bg-[#fafafa]">
          
        <Spinner loading={useSelector((state) => state.user).loading} />
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
            {activeAchievements.map((item, index) => (
              <div key={index} className="bg-white p-6 border-b-2 border-brandRed">
                <img
                  src={achievementIcon}
                  alt={item.year}
                  className="size-[100px] flex justify-center mx-auto"
                />
                <div className="grid gap-4 text-sm mt-4 text-center">
                 <span className="font-bold">{item.title}</span>
                 <span className="leading-6 text-brandLightBlack/60">{item.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
     );
}
 
export default Achievements;