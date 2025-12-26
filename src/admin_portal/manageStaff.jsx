import { useStaffList } from "../lib/reuseableEffects";
import GoBack from "../components/back";
import { formatDateTime } from "../lib/utils";
import { Edit, Image, Plus, ToggleLeft, ToggleRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import Button from "../components/button";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CreateStaff, ToggleStaff, UpdateStaff, UpdateStaffImage } from "../hooks/local/reducer";
import { showErrorToast, showSuccessToast } from "../hooks/constants";
import Spinner from "../components/Spinners/spinner";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";


/**
 * Staff edit modal dialog.
 */
const EditStaffDialog = ({ open, onOpenChange, formik, loading }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="text-sm font-bold text-start">
          Edit Staff
        </DialogTitle>
      </DialogHeader>

      <form onSubmit={formik.handleSubmit} className="grid gap-4 mt-4">
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="update-name">Staff name</Label>
          <Input
            type="text"
            id="update-name"
            placeholder="Enter staff full name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span className="text-red-500 text-xs">
            {formik.touched.name && formik.errors.name ? formik.errors.name : null}
          </span>
        </div>

        <div className="grid w-full items-center gap-2">
          <Label htmlFor="update-post">Role</Label>
          <Input
            type="text"
            id="update-post"
            placeholder="e.g. Principal"
            name="post"
            value={formik.values.post}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span className="text-red-500 text-xs">
            {formik.touched.post && formik.errors.post ? formik.errors.post : null}
          </span>
        </div>

        <div className="grid w-full items-center gap-2">
          <Label htmlFor="update-list_id">List ID</Label>
          <Input
            type="text"
            id="update-list_id"
            placeholder="1234"
            name="list_id"
            value={formik.values.list_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span className="text-red-500 text-xs">
            {formik.touched.list_id && formik.errors.list_id ? formik.errors.list_id : null}
          </span>
        </div>

        <Button
          role="submit"
          buttonText="Update staff"
          background="bg-brandLightBlue"
          textColor="text-white"
          loading={loading}
        />
      </form>
    </DialogContent>
  </Dialog>
);

EditStaffDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  formik: PropTypes.shape({
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    values: PropTypes.shape({
      name: PropTypes.string,
      post: PropTypes.string,
      list_id: PropTypes.string,
      id: PropTypes.string,
    }).isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
};

const ManageStaff = () => {
    const loading = useSelector((state) => state.user.loading);
    const { staff, refetch } = useStaffList();
    const dispatch = useDispatch();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [previewSrc, setPreviewSrc] = useState(null);
    const [previewLoading, setPreviewLoading] = useState(false);
    const [previewError, setPreviewError] = useState(null);

    const tlaoURL = "http://tlao.ristherhen.com/tlao_api/";

    const ImagePreview = ({ src, alt, loading, error }) => (
      <div
        className="w-full md:w-[50%] aspect-square mx-auto rounded-md overflow-hidden border relative flex items-center justify-center bg-gray-100"
        aria-busy={loading}
      >
        {loading ? (
          <div
            className="animate-spin size-8 border-2 border-gray-300 border-t-brandLightBlue rounded-full"
            aria-label="Loading image"
          />
        ) : error ? (
          <div className="text-xs text-red-500" role="alert">{error}</div>
        ) : src ? (
          <img
            src={src}
            alt={alt || "Blog image preview"}
            className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
          />
        ) : (
          <div className="text-xs text-gray-500">No image available</div>
        )}
      </div>
    );

    useEffect(() => {
          if (!isImageDialogOpen) return;
          setPreviewError(null);
          updateImageForm.setFieldValue("upload_image", null);
          if (selectedPost && selectedPost.image_url) {
            setPreviewLoading(true);
            const url = `${tlaoURL}${selectedPost.image_url}`;
            const img = new window.Image();
            img.onload = () => {
              setPreviewSrc(url);
              setPreviewLoading(false);
            };
            img.onerror = () => {
              setPreviewError("Unable to load image");
              setPreviewLoading(false);
              setPreviewSrc(null);
            };
            img.src = url;
          } else {
            setPreviewSrc(null);
          }
        }, [isImageDialogOpen, selectedPost]);

    const createStaffForm = useFormik({
      initialValues: {
        name: "",
        post: "",
        upload_image: null,
        list_id: "",
      },
      validationSchema: Yup.object({
        name: Yup.string().required("Please provide staff name"),
        post: Yup.string().required("Please provide staff role"),
        list_id: Yup.string().required("Please provide list id"),
        upload_image: Yup.mixed()
          .required("Please upload a profile image")
          .test("fileType", "Unsupported file format. Please select JPG, PNG, or GIF.", (value) => {
            if (!value) return false;
            return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
          })
          .test("fileSize", "File too large. Max size is 5MB.", (value) => {
            if (!value) return false;
            return value.size <= 5 * 1024 * 1024;
          }),
      }),
      onSubmit: async (values, { resetForm }) => {
        const { name, post, upload_image, list_id } = values;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("post", post);
        formData.append("upload_image", upload_image);
        formData.append("list_id", list_id);

        const { payload } = await dispatch(CreateStaff(formData));
        if (payload[0]?.status_code === "0") {
          showSuccessToast("Staff created");
          resetForm();
          setIsDialogOpen(false);
          refetch();
        }
      },
    });

    const updateStaffForm = useFormik({
      initialValues: {
        id: "",
        name: "",
        post: "",
        list_id: "",
      },
      validationSchema: Yup.object({
        name: Yup.string().required("Please provide staff name"),
        post: Yup.string().required("Please provide staff role"),
        list_id: Yup.string().required("Please provide list id"),
      }),
      onSubmit: async (values, { resetForm }) => {
        const { id, name, post, list_id } = values;
        const formData = new FormData();
        formData.append("id", id);
        formData.append("name", name);
        formData.append("post", post);
        formData.append("list_id", list_id);

        const { payload } = await dispatch(UpdateStaff(formData));
        if (payload?.status_code === "0") {
          showSuccessToast("Staff updated");
          resetForm();
          setIsUpdateDialogOpen(false);
          refetch();
        }
      },
    });

    const updateImageForm = useFormik({
          initialValues: {
            id: "",
            upload_image: null,
          },
          validationSchema: Yup.object({
            upload_image: Yup.mixed()
              .required("Please upload an image")
              .test("fileType", "Unsupported file format. Please select JPG, PNG, or GIF.", (value) => {
                if (!value) return false;
                return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
              })
              .test("fileSize", "File too large. Max size is 5MB.", (value) => {
                if (!value) return false;
                return value.size <= 5 * 1024 * 1024;
              }),
          }),
          onSubmit: async (values, { resetForm }) => {
            const formData = new FormData();
            formData.append("id", values.id);
            formData.append("upload_image", values.upload_image);
    
            const { payload } = await dispatch(UpdateStaffImage(formData));
            if (payload[0].status_code === "0") {
              showSuccessToast("Staff image updated");
              resetForm();
              setIsImageDialogOpen(false);
              refetch();
            }
          },
        });

    const handleEditClick = (staffRow) => {
      updateStaffForm.setValues({
        id: staffRow.id,
        name: staffRow.name || "",
        post: staffRow.post || "",
        list_id: String(staffRow.list_id || ""),
      });
      setIsUpdateDialogOpen(true);
    };

    const handleToggleStatus = async (staffId, currentStatus) => {
      const newStatus = currentStatus === "1" ? "0" : "1";

      const { payload } = await dispatch(
        ToggleStaff({
          id: staffId,
          status: newStatus,
        })
      );

      if (payload?.status_code === "0") {
        showSuccessToast(
          `Staff ${newStatus === "0" ? "activated" : "deactivated"}`
        );
        refetch();
        return;
      }
      showErrorToast(payload?.message || "Unable to update staff status");
    };

    return (
      <div>
        <Spinner loading={useSelector((state) => state.user).loading} />
        <GoBack />
        <div className="flex items-center justify-between">
          <p className="brandFont font-bold text-xl">Manage TLAO's Staff</p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <div className="text-xs font-semibold flex items-center gap-1 text-brandBlue cursor-pointer p-2 hover:bg-gray-50">
                <Plus className="size-4" />
                <span>Create staff</span>
              </div>
            </DialogTrigger>

            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-sm font-bold text-start">
                  Create Staff
                </DialogTitle>
              </DialogHeader>

              <form
                onSubmit={createStaffForm.handleSubmit}
                className="grid gap-4 mt-4"
              >
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="name">List ID</Label>
                  <Input
                    type="number"
                    id="list_id"
                    placeholder="Enter list ID"
                    name="list_id"
                    value={createStaffForm.values.list_id}
                    onChange={createStaffForm.handleChange}
                    onBlur={createStaffForm.handleBlur}
                  />
                  <span className="text-red-500 text-xs">
                    {createStaffForm.touched.list_id &&
                    createStaffForm.errors.list_id
                      ? createStaffForm.errors.list_id
                      : null}
                  </span>
                </div>

                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="name">Staff name</Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Enter staff full name"
                    name="name"
                    value={createStaffForm.values.name}
                    onChange={createStaffForm.handleChange}
                    onBlur={createStaffForm.handleBlur}
                  />
                  <span className="text-red-500 text-xs">
                    {createStaffForm.touched.name &&
                    createStaffForm.errors.name
                      ? createStaffForm.errors.name
                      : null}
                  </span>
                </div>

                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="post">Role</Label>
                  <Input
                    type="text"
                    id="post"
                    placeholder="e.g. Principal"
                    name="post"
                    value={createStaffForm.values.post}
                    onChange={createStaffForm.handleChange}
                    onBlur={createStaffForm.handleBlur}
                  />
                  <span className="text-red-500 text-xs">
                    {createStaffForm.touched.post &&
                    createStaffForm.errors.post
                      ? createStaffForm.errors.post
                      : null}
                  </span>
                </div>

                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="upload_image">Upload Image</Label>
                  <Input
                    type="file"
                    id="upload_image"
                    accept=".jpg,.jpeg,.png,.gif"
                    name="upload_image"
                    onChange={(event) => {
                      const file = event.currentTarget.files && event.currentTarget.files[0];
                      createStaffForm.setFieldValue("upload_image", file || null);
                    }}
                    onBlur={createStaffForm.handleBlur}
                  />
                  <span className="text-red-500 text-xs">
                    {createStaffForm.touched.upload_image &&
                    createStaffForm.errors.upload_image
                      ? createStaffForm.errors.upload_image
                      : null}
                  </span>
                </div>

                <Button
                  role="submit"
                  buttonText="Create staff"
                  background="bg-brandLightBlue"
                  textColor="text-white"
                  loading={loading}
                />
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-sm font-bold text-start">
                Update Staff Image
              </DialogTitle>
            </DialogHeader>

            <form
              onSubmit={updateImageForm.handleSubmit}
              className="grid gap-4 mt-4"
            >
                <ImagePreview
                  src={previewSrc}
                  alt={selectedPost?.title || "Blog image preview"}
                  loading={previewLoading}
                  error={previewError}
                />

              <div className="grid w-full items-center gap-2">
                <Label htmlFor="update-image">Upload New Image</Label>
                <Input
                  type="file"
                  id="update-image"
                  accept=".jpg,.jpeg,.png,.gif"
                  onChange={(event) => {
                    const file = event.currentTarget.files && event.currentTarget.files[0];
                    if (!file) {
                      updateImageForm.setFieldValue("upload_image", null);
                      setPreviewError(null);
                      setPreviewSrc(selectedPost && selectedPost.image_url ? `${tlaoURL}${selectedPost.image_url}` : null);
                      return;
                    }
                    const allowed = ["image/jpeg", "image/png", "image/gif"];
                    if (!allowed.includes(file.type)) {
                      const msg = "Unsupported file format. Please select JPG, PNG, or GIF.";
                      updateImageForm.setFieldError("upload_image", msg);
                      setPreviewError(msg);
                      showErrorToast(msg);
                      return;
                    }
                    if (file.size > 5 * 1024 * 1024) {
                      const msg = "File too large. Max size is 5MB.";
                      updateImageForm.setFieldError("upload_image", msg);
                      setPreviewError(msg);
                      showErrorToast(msg);
                      return;
                    }
                    updateImageForm.setFieldValue("upload_image", file);
                    setPreviewError(null);
                    setPreviewSrc(URL.createObjectURL(file));
                  }}
                />
                <span className="text-red-500 text-xs" aria-live="assertive">
                  {updateImageForm.touched.upload_image &&
                  updateImageForm.errors.upload_image
                    ? updateImageForm.errors.upload_image
                    : null}
                </span>
                {updateImageForm.values.upload_image && (
                  <button
                    type="button"
                    className="text-xs text-brandLightBlue underline w-fit"
                    onClick={() => {
                      updateImageForm.setFieldValue("upload_image", null);
                      setPreviewSrc(selectedPost && selectedPost.image_url ? `${tlaoURL}${selectedPost.image_url}` : null);
                    }}
                  >
                    Clear selection
                  </button>
                )}
              </div>

              <Button
                role={"submit"}
                buttonText={"Update image"}
                background={"bg-brandLightBlue"}
                textColor={"text-white"}
                loading={loading}
              />
            </form>
          </DialogContent>
        </Dialog>
        </div>

        <EditStaffDialog
          open={isUpdateDialogOpen}
          onOpenChange={(open) => {
            setIsUpdateDialogOpen(open);
          }}
          formik={updateStaffForm}
          loading={loading}
        />

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
                  List ID
                </th>
                <th scope="col" className="pe-6 py-[18px] whitespace-nowrap">
                  Staff name
                </th>
                <th scope="col" className="px-6 py-[18px] whitespace-nowrap">
                  Role
                </th>
                <th scope="col" className="px-6 py-[18px] whitespace-nowrap">
                  Date created
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
              {staff.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#c4c4c416] transition duration-500 relative"
                >
                  <td className="text-start py-4 ps-6 pe-2 sticky left-0 bg-white z-10">
                    {index + 1}.
                  </td>
                  <td className="text-start py-4 pe-6 ps-1 max-w-60 md:max-w-80 truncate">
                    {row.list_id}
                  </td>
                  <td className="text-start py-4 pe-6 ps-1 max-w-60 md:max-w-80 truncate">
                    {row.name}
                  </td>
                  <td className="text-start py-4 ps-6"> {row.post}</td>
                  <td className="text-start py-4 ps-6">
                    {formatDateTime(row.inserted_dt)}
                  </td>
                  <td
                    className={`text-start py-4 px-6 font-semibold ${
                      row.status === "1" ? "text-red-500" : "text-emerald-500"
                    }`}
                  >
                    {row.status === "1" ? "Inactive" : "Active"}
                  </td>
                  <td className="text-start py-4 ps-6 flex items-center gap-4">
                    <button
                      type="button"
                      aria-label={`Edit staff ${row.name || ""}`}
                      className="cursor-pointer"
                      onClick={() => handleEditClick(row)}
                    >
                      <Edit className="size-5" />
                    </button>
                    <span
                                          className="cursor-pointer text-muted-foreground hover:text-brandLightBlue transition-colors"
                                          onClick={() => {
                                            setSelectedPost(row);
                                            updateImageForm.setFieldValue("id", row.id);
                                            updateImageForm.setFieldValue("upload_image", null);
                                            setIsImageDialogOpen(true);
                                          }}
                                        >
                                          <Image className="size-5" />
                                        </span>
                    <button
                      type="button"
                      aria-label={`Toggle status for ${row.name || "staff"}`}
                      onClick={() => handleToggleStatus(row.id, row.status)}
                      className="cursor-pointer"
                    >
                      {row.status === "1" ? (
                        <ToggleLeft className="text-muted-foreground" />
                      ) : (
                        <ToggleRight className="text-emerald-500" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}
 
export default ManageStaff;
