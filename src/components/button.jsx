import { Link } from "react-router-dom";

const Button = ({buttonText, background, hasIcon, icon, textColor}) => {
    return ( 
        <div className="w-fit">
            <Link to={"/"} className={`${background} ${textColor} font-medium text-sm px-[22px] py-4 flex items-center gap-[10px]`}>
            {buttonText}
            {hasIcon && <img src={icon} alt="" className="h-5"/>}
            </Link>
        </div>
     );
}
 
export default Button;