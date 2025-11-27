import { useAdmissionRequestList } from "../lib/reuseableEffects";
import Spinner from "../components/Spinners/spinner";
import GoBack from "../components/back";
import { useSelector } from "react-redux";
import { formatDateTime } from "../lib/utils";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Edit } from "lucide-react";

const AdmissionRequests = () => {
    const { requests = [] } = useAdmissionRequestList();
    // const singleAdmission = useSingleAdmissionDetail();
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleEditClick = (request) => {
      setSelectedRequest(request);
      setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
      setIsDialogOpen(false);
      setSelectedRequest(null);
    };

    return (
      <div>
        <Spinner loading={useSelector((state) => state.user).loading} />
        <GoBack />
        <div>
          <p className="brandFont font-bold text-xl">Manage Admission Requests</p>
        </div>
        <div className="grid grid-cols-1 whitespace-nowrap overflow-x-auto border rounded-md mt-6">
          <table className="w-full text-sm text-left bg-white">
            <thead className="border-b">
              <tr className="">
                <th
                  scope="col"
                  className="ps-6 pe-2 py-[18px] whitespace-nowrap sticky left-0 z-10 bg-white"
                >
                  No.
                </th>
                <th scope="col" className="pe-6 py-[18px] whitespace-nowrap">
                  Student name
                </th>
                <th scope="col" className="px-6 py-[18px] whitespace-nowrap">
                  Request submitted
                </th>
                <th scope="col" className="px-6 py-[18px] whitespace-nowrap">
                  Year group
                </th>
                <th scope="col" className="px-6 py-[18px] whitespace-nowrap">
                  Gender
                </th>
                <th scope="col" className="px-6 py-[18px] whitespace-nowrap">
                  Date of birth
                </th>
                <th scope="col" className="px-6 py-[18px] whitespace-nowrap">
                  Status
                </th>
                <th scope="col" className="px-6 py-[18px] whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((row, index) => (
                <tr key={row.id || index} className="hover:bg-[#c4c4c416] transition duration-500 relative" >
                  <td className="text-start py-4 ps-6 pe-2 sticky left-0 bg-white z-10"> {index + 1}. </td>
                  <td className="text-start py-4 pe-6 ps-1 max-w-60 md:max-w-80 truncate">
                    {row.names}
                  </td>
                  <td className="text-start py-4 ps-6"> {formatDateTime(row.inserted_dt)}</td>
                  <td className="text-start py-4 ps-6 capitalize"> {row.year_group}</td>
                  <td className="text-start py-4 ps-6 capitalize"> {row.gender}</td>
                  <td className="text-start py-4 ps-6"> {formatDateTime(row.dob)}</td>
                  <td className={`text-start py-4 ps-6 ${row.status === "0" ? "text-emerald-500" : "text-red-500"}`}> {row.status === "0" ? "Reviewed" : "Pending"}</td>
                  <td className="text-start py-4 ps-6">
                    <div className="cursor-pointer" onClick={() => handleEditClick(row)}>
                      <Edit className="size-5"/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Single Dialog Outside the Table */}
        <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-sm font-bold text-start">
                Admission Request Details
              </DialogTitle>
            </DialogHeader>

            {selectedRequest && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="grid">
                  <span className="font-semibold text-xs text-muted-foreground">Request ID:</span>
                  <span className="text-sm">{selectedRequest.id}</span>
                </div>
                <div className="grid">
                  <span className="font-semibold text-xs text-muted-foreground">Student Name:</span>
                  <span className="text-sm">{selectedRequest.names}</span>
                </div>
                <div className="grid">
                  <span className="font-semibold text-xs text-muted-foreground">Gender:</span>
                  <span className="text-sm capitalize">{selectedRequest.gender}</span>
                </div>
                <div className="grid">
                  <span className="font-semibold text-xs text-muted-foreground">Date of Birth:</span>
                  <span className="text-sm">{formatDateTime(selectedRequest.dob)}</span>
                </div>
                <div className="grid">
                  <span className="font-semibold text-xs text-muted-foreground">Year Group:</span>
                  <span className="capitalize text-sm">{selectedRequest.year_group}</span>
                </div>
                <div className="grid">
                  <span className="font-semibold text-xs text-muted-foreground">Nationality:</span>
                  <span className="text-sm capitalize">{selectedRequest.nationality}</span>
                </div>
                <div className="grid">
                  <span className="font-semibold text-xs text-muted-foreground">Guardian Name:</span>
                  <span className="text-sm">{selectedRequest.guardian_name}</span>
                </div>
                <div className="grid">
                  <span className="font-semibold text-xs text-muted-foreground">Guardian Phone:</span>
                  <span className="text-sm">{selectedRequest.guardian_phonenumber}</span>
                </div>
                <div className="grid">
                  <span className="font-semibold text-xs text-muted-foreground">Guardian Email:</span>
                  <span className="text-sm">{selectedRequest.email}</span>
                </div>
                <div className="grid">
                  <span className="font-semibold text-xs text-muted-foreground">Status:</span>
                  <span className="text-sm">
                    {selectedRequest.status === "0" ? "Reviewed" : "Pending"}
                  </span>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
}

export default AdmissionRequests;