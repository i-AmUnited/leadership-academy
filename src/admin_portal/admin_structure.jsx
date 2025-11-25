import { Route, Routes } from "react-router-dom";
import SignIn from "./signIn";
import AdminActions from "./adminActions";
import ManageAchievements from "./manageAchievements";
import AdmissionRequests from "./manageAdmissionRequests";

const Admin = () => {
    return ( 
        <div className="px-4 md:px-[120px] py-10">
        <Routes>
          <Route index element={<SignIn />} />
          <Route path="dashboard" element={<AdminActions />} />
          <Route path="manage-achievements" element={<ManageAchievements />} />
          <Route path="manage-admission-requests" element={<AdmissionRequests />} />
        </Routes>
        </div>
     );
}
 
export default Admin;