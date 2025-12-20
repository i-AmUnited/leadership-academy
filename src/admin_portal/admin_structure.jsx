import { Route, Routes } from "react-router-dom";
import SignIn from "./signIn";
import AdminActions from "./adminActions";
import ManageAchievements from "./manageAchievements";
import AdmissionRequests from "./manageAdmissionRequests";
import ContactRequests from "./manageContactRequests";
import ManageNews from "./manageNews";
import ManageStaff from "./manageStaff";
import ManageGallery from "./manageGallery";

const Admin = () => {
    return ( 
        <div className="px-4 md:px-[120px] py-10">
        <Routes>
          <Route index element={<SignIn />} />
          <Route path="dashboard" element={<AdminActions />} />
          <Route path="manage-achievements" element={<ManageAchievements />} />
          <Route path="manage-admission-requests" element={<AdmissionRequests />} />
          <Route path="manage-contact-us-requests" element={<ContactRequests />} />
          <Route path="manage-blog-posts" element={<ManageNews />} />
          <Route path="manage-staff" element={<ManageStaff />} />
          <Route path="manage-gallery" element={<ManageGallery />} />
        </Routes>
        </div>
     );
}
 
export default Admin;