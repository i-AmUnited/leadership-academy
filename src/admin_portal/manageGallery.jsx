import { useGalleryList } from "../lib/reuseableEffects";
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
import {
  CreateGallery,
  ToggleGallery,
  UpdateGallery,
} from "../hooks/local/reducer";
import { showErrorToast, showSuccessToast } from "../hooks/constants";
import Spinner from "../components/Spinners/spinner";
import { useEffect, useState } from "react";


const ManageGallery = () => {
  const loading = useSelector((state) => state.user.loading);
  const { gallery, refetch } = useGalleryList();
  const tlaoURL = "http://tlao.ristherhen.com/tlao_api/";

  const dispatch = useDispatch();

  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
      const [selectedPost, setSelectedPost] = useState(null);
      const [previewSrc, setPreviewSrc] = useState(null);
      const [previewLoading, setPreviewLoading] = useState(false);
      const [previewError, setPreviewError] = useState(null);

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

           const updateImageForm = useFormik({
  initialValues: {
    id: "",
    // list_id: "",
    upload_image: null,
  },
  validationSchema: Yup.object({
    // list_id: Yup.number()
    //   .required("Please enter a list ID")
    //   .positive("List ID must be a positive number")
    //   .integer("List ID must be a whole number"),
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
    // formData.append("list_id", values.list_id);
    formData.append("upload_image", values.upload_image);

    const { payload } = await dispatch(UpdateGallery(formData));
    if (payload[0].status_code === "0") {
      showSuccessToast("Blog image updated");
      resetForm();
      setIsImageDialogOpen(false);
      refetch();
    }
  },
});

  const handleToggleStatus = async (galleryId, currentStatus) => {
    const newStatus = currentStatus === "1" ? "0" : "1";

    const { payload } = await dispatch(
      ToggleGallery({
        id: galleryId,
        status: newStatus,
      })
    );

    if (payload?.status_code === "0") {
      showSuccessToast(
        `Image ${newStatus === "0" ? "activated" : "deactivated"}`
      );
      refetch();
      return;
    }
    showErrorToast(payload?.message || "Unable to toggle image status");
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const createGalleryForm = useFormik({
  initialValues: {
    upload_image: "",
    list_id: "",
  },
  validationSchema: Yup.object({
    list_id: Yup.number()
      .required("Please enter a list ID")
      .positive("List ID must be a positive number")
      .integer("List ID must be a whole number"),
    upload_image: Yup.mixed()
      .required("Please upload an image")
      .test(
        "fileType",
        "Unsupported file format. Please select JPG, PNG, or GIF.",
        (value) => {
          if (!value) return false;
          return ["image/jpeg", "image/png", "image/gif"].includes(
            value.type
          );
        }
      )
      .test("fileSize", "File too large. Max size is 5MB.", (value) => {
        if (!value) return false;
        return value.size <= 5 * 1024 * 1024;
      }),
  }),
  onSubmit: async (values, { resetForm }) => {
    const { upload_image, list_id } = values;
    let createGalleryData = { upload_image, list_id };
    const { payload } = await dispatch(CreateGallery(createGalleryData));

    if (payload[0].status_code === "0") {
      showSuccessToast("Gallery created");
      resetForm();
      setIsDialogOpen(false);
      refetch();
    }
  },
});

  return (
    <div>
      <Spinner loading={useSelector((state) => state.user).loading} />
      <GoBack />
      <div className="flex items-center justify-between">
        <p className="brandFont font-bold text-xl">Manage Gallery</p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <div className="text-xs font-semibold flex items-center gap-1 text-brandBlue cursor-pointer p-2 hover:bg-gray-50">
              <Plus className="size-4" />
              <span>Create gallery</span>
            </div>
          </DialogTrigger>

          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-sm font-bold text-start">
                Create Gallery
              </DialogTitle>
            </DialogHeader>

            {/* FORM CONTENT */}
            <form
  onSubmit={createGalleryForm.handleSubmit}
  className="grid gap-4 mt-4"
>
  <div className="grid w-full items-center gap-2">
    <Label htmlFor="list_id">List ID</Label>
    <Input
      type="number"
      id="list_id"
      placeholder="Enter a list ID"
      name="list_id"
      value={createGalleryForm.values.list_id}
      onChange={createGalleryForm.handleChange}
      onBlur={createGalleryForm.handleBlur}
    />
    <span className="text-red-500 text-xs">
      {createGalleryForm.touched.list_id &&
      createGalleryForm.errors.list_id
        ? createGalleryForm.errors.list_id
        : null}
    </span>
  </div>

  <div className="grid w-full items-center gap-2">
    <Label htmlFor="upload_image">Upload Image</Label>
    <Input
      type="file"
      id="upload_image"
      name="upload_image"
      accept="image/jpeg,image/png,image/gif"
      onChange={(e) => {
        const file = e.target.files[0];
        createGalleryForm.setFieldValue("upload_image", file);
      }}
      onBlur={createGalleryForm.handleBlur}
    />
    <span className="text-red-500 text-xs">
      {createGalleryForm.touched.upload_image &&
      createGalleryForm.errors.upload_image
        ? createGalleryForm.errors.upload_image
        : null}
    </span>
    {createGalleryForm.values.upload_image && (
      <div className="mt-2">
        <img
          src={URL.createObjectURL(
            createGalleryForm.values.upload_image
          )}
          alt="Preview"
          className="h-32 w-32 object-cover rounded border"
        />
      </div>
    )}
  </div>

  <Button
    role={"submit"}
    buttonText={"Create gallery"}
    background={"bg-brandLightBlue"}
    textColor={"text-white"}
    loading={loading}
  />
</form>
          </DialogContent>
        </Dialog>
        <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
  <DialogContent className="max-w-md">
    <DialogHeader>
      <DialogTitle className="text-sm font-bold text-start">
        Update Gallery
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

      {/* <div className="grid w-full items-center gap-2">
        <Label htmlFor="update-list_id">List ID</Label>
        <Input
          type="number"
          id="update-list_id"
          placeholder="Enter a list ID"
          name="list_id"
          value={updateImageForm.values.list_id}
          onChange={updateImageForm.handleChange}
          onBlur={updateImageForm.handleBlur}
        />
        <span className="text-red-500 text-xs">
          {updateImageForm.touched.list_id &&
          updateImageForm.errors.list_id
            ? updateImageForm.errors.list_id
            : null}
        </span>
      </div> */}

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
              {/* <th scope="col" className="pe-6 py-[18px] whitespace-nowrap">
                List ID
              </th> */}
              <th scope="col" className="pe-6 py-[18px] whitespace-nowrap">
                Image preview
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
            {gallery.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-[#c4c4c416] transition duration-500 relative"
              >
                <td className="text-start py-4 ps-6 pe-2 sticky left-0 bg-white z-10">
                  {index + 1}.
                </td>
                 {/* <td className="text-start py-4 ps-6 pe-2 sticky left-0 bg-white z-10">
                  {row.list_id}.
                </td> */}
                <td className="text-start py-4 pe-6 ps-1 max-w-60 md:max-w-80 truncate">
                  <img
                    src={`${tlaoURL}${row.image_url}`}
                    alt=""
                    className="h-24 aspect-square rounded object-cover"
                  />
                </td>
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
                <td className="text-start py-4 ps-6 flex items-center gap-4 pt-12">
                  <button
                      type="button"
                      aria-label={`Toggle status for ${row.name || "gallery"}`}
                      onClick={() => handleToggleStatus(row.id, row.status)}
                      className="cursor-pointer"
                    >
                      {row.status === "1" ? (
                        <ToggleLeft className="text-muted-foreground" />
                      ) : (
                        <ToggleRight className="text-emerald-500" />
                      )}
                    </button>
                    <span
                      className="cursor-pointer text-muted-foreground hover:text-brandLightBlue transition-colors"
                      onClick={() => {
                        setSelectedPost(row);
                        updateImageForm.setFieldValue("id", row.id);
                        updateImageForm.setFieldValue("upload_image", null);
                        updateImageForm.setFieldValue("list_id", row.list_id);
                        setIsImageDialogOpen(true);
                      }}
                    >
                      <Image className="size-5" />
                    </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageGallery;
