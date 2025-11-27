import { useContactUsRequestList } from "../lib/reuseableEffects";
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

const ContactRequests = () => {
    const { requests = [] } = useContactUsRequestList();
    console.log(requests);

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
          <p className="brandFont font-bold text-xl">Manage Contact Requests</p>
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
                  Full-name
                </th>
                <th scope="col" className="px-6 py-[18px] whitespace-nowrap">
                  Phone number
                </th>
                <th scope="col" className="px-6 py-[18px] whitespace-nowrap">
                  Email
                </th>
                <th scope="col" className="px-6 py-[18px] whitespace-nowrap">
                  Subject
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
                    {row.firstname} {row.lastname}
                  </td>
                  <td className="text-start py-4 ps-6"> {row.phonenumber}</td>
                  <td className="text-start py-4 ps-6 capitalize"> {row.email}</td>
                  <td className="text-start py-4 ps-6 capitalize truncate max-w-[300px]"> {row.subject}</td>
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
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-sm font-bold text-start">
                Admission Request Details
              </DialogTitle>
            </DialogHeader>

            {selectedRequest && (
              <div className="grid gap-4 mt-4">
                <div className="grid">
                  <span className="font-semibold text-xs text-muted-foreground">Request ID:</span>
                  <span className="text-sm">{formatDateTime(selectedRequest.inserted_dt)}</span>
                </div>
                
                <div className="grid">
                  <span className="font-semibold text-xs text-muted-foreground">Subject:</span>
                  <span className="text-sm">{selectedRequest.subject}</span>
                </div>

                <div className="grid">
                  <span className="font-semibold text-xs text-muted-foreground">Message:</span>
                  <span className="text-sm">{selectedRequest.message}</span>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
     );
}
 
export default ContactRequests;