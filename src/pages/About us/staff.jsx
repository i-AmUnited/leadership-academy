import { useSelector } from "react-redux";
import { useStaffList } from "../../lib/reuseableEffects"
import Spinner from "../../components/Spinners/spinner";

const Staff = () => {
  const {staff} = useStaffList();
  const activeStaff = staff?.filter(staff => staff.status === "0") || [];

  const tlaoURL = "http://tlao.ristherhen.com/tlao_api/"

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
                Meet our dedicated staff
            </div>
            <div className="flex justify-center">
                <div className="text-sm md:w-1/2 lg:w-1/3 smallTitle text-brandLightBlack/70">Passionate individuals who are committed excellent education.</div>
            </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {activeStaff.map((item, index) => (
              <div key={index}>
                <img
                  src={`${tlaoURL}${item.image_url}`}
                  alt={item.year}
                  className="aspect-square object-cover"
                />
                <div className="grid mt-4">
                 <span className="font-bold brandFont">{item.name}</span>
                 <span className="leading-6 text-brandLightBlack/60 text-xs">{item.post}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
     );
}
 
export default Staff;