import { useGalleryList } from "../lib/reuseableEffects";
import GoBack from "../components/back";
import { formatDateTime } from "../lib/utils";
import { Edit, Plus, ToggleLeft, ToggleRight } from "lucide-react";
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
  ToggleAchievement,
  UpdateGallery,
} from "../hooks/local/reducer";
import { showSuccessToast } from "../hooks/constants";
import Spinner from "../components/Spinners/spinner";
import { useState } from "react";

/**
 * Generate a unique 4-digit list id for staff records.
 * @param {Set<string>} existingIds Existing list ids
 * @returns {string} Four-digit id from 1000 to 9999
 */
const generateUniqueListId = (existingIds) => {
  let listId = "";
  let attempts = 0;
  while (!listId || existingIds.has(listId)) {
    listId = Math.floor(1000 + Math.random() * 9000).toString();
    attempts += 1;
    if (attempts > 10000) break;
  }
  return listId;
};

const ManageGallery = () => {
  const loading = useSelector((state) => state.user.loading);
  const { gallery, refetch } = useGalleryList();
  const tlaoURL = "http://tlao.ristherhen.com/tlao_api/";

  const dispatch = useDispatch();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const createGalleryForm = useFormik({
    initialValues: {
      upload_image: "",
      list_id: "",
    },
    validationSchema: Yup.object({
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
      if (payload.status_code === "0") {
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
                <Label htmlFor="upload_image">Upload Image</Label>
                <Input
                  type="file"
                  id="upload_image"
                  name="upload_image"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    createGalleryForm.setFieldValue("upload_image", file);

                    // Generate unique list_id when file is selected
                    if (file) {
                      const existingIds = new Set(
                        gallery.map((item) => item.list_id)
                      );
                      const newListId = generateUniqueListId(existingIds);
                      createGalleryForm.setFieldValue("list_id", newListId);
                    }
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
                  edit and toggle status
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
