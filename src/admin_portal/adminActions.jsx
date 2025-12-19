import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AdminActions = () => {
    return ( 
        <div>
            <p className="brandFont font-bold text-xl">Welcome Admin!</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                <Link to={"../manage-achievements"} className="border rounded-md p-4 flex items-end justify-between gap-4">
                    <div className="grid truncate">
                        <span className="smallTitle">Achievements</span>
                        <span className="text-xs text-muted-foreground">Manage TLAO's achiements</span>
                    </div>
                    <ArrowRight className="size-4" />
                </Link>
                <Link to={"../manage-admission-requests"} className="border rounded-md p-4 flex items-end justify-between gap-4">
                    <div className="grid truncate">
                        <span className="smallTitle">Admission requests</span>
                        <span className="text-xs text-muted-foreground">Manage admission requests</span>
                    </div>
                    <ArrowRight className="size-4" />
                </Link>
                <Link to={"../manage-contact-us-requests"} className="border rounded-md p-4 flex items-end justify-between gap-4">
                    <div className="grid truncate">
                        <span className="smallTitle">Contact us requests</span>
                        <span className="text-xs text-muted-foreground">Manage contact us requests</span>
                    </div>
                    <ArrowRight className="size-4" />
                </Link>
                <Link to={"../manage-blog-posts"} className="border rounded-md p-4 flex items-end justify-between gap-4">
                    <div className="grid truncate">
                        <span className="smallTitle">Manage news</span>
                        <span className="text-xs text-muted-foreground">Manage blog posts and news events</span>
                    </div>
                    <ArrowRight className="size-4" />
                </Link>
                <Link to={"../manage-staff"} className="border rounded-md p-4 flex items-end justify-between gap-4">
                    <div className="grid truncate">
                        <span className="smallTitle">Manage staff</span>
                        <span className="text-xs text-muted-foreground">Manage TLAO's staff</span>
                    </div>
                    <ArrowRight className="size-4" />
                </Link>
            </div>
        </div>
     );
}
 
export default AdminActions;