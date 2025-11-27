import { Link } from "react-router-dom";
import Spinner from "./Spinners/inlineSpinner";

const Button = ({buttonText, background, textColor, loading, role, destination}) => {
    return ( 
        <div className="w-fit">
            {role === "submit" ?
            <button type="submit" disabled={loading} className={`${background} ${textColor} font-medium text-sm px-[22px] py-4 flex items-center gap-[10px] cursor-pointer`}> 
              {loading ? 
              <div className="flex items-center gap-2">
                <Spinner />
                <span>Loading...</span>
              </div>
              : 
              <div className="">
                <span>{buttonText}</span>
              </div>
              }
            </button>
            :
            <Link to={destination} className={`${background} ${textColor} font-medium text-sm px-[22px] py-4 flex items-center gap-[10px]`}>
            {buttonText}
            </Link> 
            }
        </div>
     );
}
 
export default Button;