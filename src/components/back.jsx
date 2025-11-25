import arrow from "../assets/logo and icons/arrow-right.png";

const GoBack = () => {
    const goBack = () => {
        window.history.back();
   }
    return (
      <div onClick={goBack} className="cursor-pointer w-fit bg-brandLightBlue/10 text-brandLightBlue p-3 rounded-md mb-3">
       <img src={arrow} alt="" className="h-5 rotate-180"/>
      </div>
    );
}
 
export default GoBack;