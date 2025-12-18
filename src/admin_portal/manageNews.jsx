import { useBlogList } from "../lib/reuseableEffects";
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
import { CreateBlog, ToggleAchievement, UpdateBlog } from "../hooks/local/reducer";
import { showSuccessToast } from "../hooks/constants";
import Spinner from "../components/Spinners/spinner";
import { useState } from "react";
import { Textarea } from "../components/ui/textarea";

const generateListId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const ManageNews = () => {
    const loading = useSelector((state) => state.user.loading);
    const { posts, refetch } = useBlogList();
    const dispatch = useDispatch();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

    const createPostForm = useFormik({
      initialValues: {
        title: "",
        body: "",
        upload_image: null,
        list_id: "",
      },
      validationSchema: Yup.object({
        title: Yup.string().max(100, "Title must be 100 characters or less").required("Please provide a title"),
        body: Yup.string().required("Please provide content"),
        upload_image: Yup.mixed()
          .required("Please upload an image")
          .test("fileType", "Unsupported file format", (value) => {
            if (!value) return false;
            return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
          }),
      }),
      onSubmit: async (values, { resetForm }) => {
        const { title, body, upload_image } = values;
        const list_id = generateListId();
        
        const formData = new FormData();
        formData.append("title", title);
        formData.append("body", body);
        formData.append("upload_image", upload_image);
        formData.append("list_id", list_id);

        const { payload } = await dispatch(
          CreateBlog(formData)
        );
        if (payload.status_code === "0") {
          showSuccessToast("Blog post created");
          resetForm();
          setIsDialogOpen(false);
          refetch();
        }
      },
    });

    const updatePostForm = useFormik({
      initialValues: {
        id: "",
        title: "",
        body: "",
        upload_image: null,
        list_id: "",
      },
      validationSchema: Yup.object({
        title: Yup.string().max(100, "Title must be 100 characters or less").required("Please provide a title"),
        body: Yup.string().required("Please provide content"),
        upload_image: Yup.mixed()
          .test("fileType", "Unsupported file format", (value) => {
            if (!value) return true;
            return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
          }),
      }),
      onSubmit: async (values, { resetForm }) => {
        const { id, title, body, upload_image, list_id } = values;
        
        const formData = new FormData();
        formData.append("id", id);
        formData.append("title", title);
        formData.append("body", body);
        formData.append("list_id", list_id);
        if (upload_image) {
          formData.append("upload_image", upload_image);
        }

        const { payload } = await dispatch(
          UpdateBlog(formData)
        );
        if (payload.status_code === "0") {
          showSuccessToast("Blog post updated");
          resetForm();
          setIsUpdateDialogOpen(false);
          refetch();
        }
      },
    });

    const handleEditClick = (post) => {
      updatePostForm.setValues({
        id: post.id,
        title: post.title,
        body: post.body,
        list_id: post.list_id || "",
        upload_image: null
      });
      setIsUpdateDialogOpen(true);
    };

    const handleToggleStatus = async (achievementId, currentStatus) => {
        
      const newStatus = currentStatus === "1" ? "0" : "1";

      const { payload } = await dispatch(
        ToggleAchievement({
          achievementID: achievementId,
          status: newStatus,
        })
      );

      if (payload.status_code === "0") {
        showSuccessToast(
          `Post ${newStatus === "0" ? "activated" : "deactivated"}`
        );
        refetch();
      }
    };

    return (
      <div>
        <Spinner loading={useSelector((state) => state.user).loading} />
        <GoBack />
        <div className="flex items-center justify-between">
          <p className="brandFont font-bold text-xl">Manage Blog Posts</p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <div className="text-xs font-semibold flex items-center gap-1 text-brandBlue cursor-pointer p-2 hover:bg-gray-50">
                <Plus className="size-4" />
                <span>Create blog post</span>
              </div>
            </DialogTrigger>

            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-sm font-bold text-start">
                  Create Blog Post
                </DialogTitle>
              </DialogHeader>

              {/* FORM CONTENT */}
              <form
                onSubmit={createPostForm.handleSubmit}
                className="grid gap-4 mt-4"
              >
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    type="text"
                    id="title"
                    placeholder="Enter blog title"
                    name={"title"}
                    value={createPostForm.values.title}
                    onChange={createPostForm.handleChange}
                    onBlur={createPostForm.handleBlur}
                  />
                  <span className="text-red-500 text-xs">
                    {createPostForm.touched.title &&
                    createPostForm.errors.title
                      ? createPostForm.errors.title
                      : null}
                  </span>
                </div>

                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="body">Content</Label>
                  <Textarea
                    id="body"
                    placeholder="Enter blog content"
                    name={"body"}
                    value={createPostForm.values.body}
                    onChange={createPostForm.handleChange}
                    onBlur={createPostForm.handleBlur}
                  />
                  <span className="text-red-500 text-xs">
                    {createPostForm.touched.body &&
                    createPostForm.errors.body
                      ? createPostForm.errors.body
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
                      createPostForm.setFieldValue("upload_image", event.currentTarget.files[0]);
                    }}
                    onBlur={createPostForm.handleBlur}
                  />
                  <span className="text-red-500 text-xs">
                    {createPostForm.touched.upload_image &&
                    createPostForm.errors.upload_image
                      ? createPostForm.errors.upload_image
                      : null}
                  </span>
                </div>

                <Button
                  role={"submit"}
                  buttonText={"Create blog post"}
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
                  Blog post title
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
              {posts.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#c4c4c416] transition duration-500 relative"
                >
                  <td className="text-start py-4 ps-6 pe-2 sticky left-0 bg-white z-10">
                    {index + 1}.
                  </td>
                  <td className="text-start py-4 pe-6 ps-1 max-w-60 md:max-w-80 truncate">
                    {row.title}
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
                  <td className="text-start py-4 ps-6 flex items-center gap-4">
                    <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                      <DialogTrigger asChild>
                        <div className="cursor-pointer" onClick={() => handleEditClick(row)}>
                          <Edit className="size-5"/>
                        </div>
                      </DialogTrigger>

                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-sm font-bold text-start">
                            Edit Blog Post
                          </DialogTitle>
                        </DialogHeader>

                        {/* FORM CONTENT */}
                        <form
                          onSubmit={updatePostForm.handleSubmit}
                          className="grid gap-4 mt-4"
                        >
                          <div className="grid w-full items-center gap-2">
                            <Label htmlFor="update-title">Title</Label>
                            <Input
                              type="text"
                              id="update-title"
                              placeholder="Enter blog title"
                              name={"title"}
                              value={updatePostForm.values.title}
                              onChange={updatePostForm.handleChange}
                              onBlur={updatePostForm.handleBlur}
                            />
                            <span className="text-red-500 text-xs">
                              {updatePostForm.touched.title &&
                              updatePostForm.errors.title
                                ? updatePostForm.errors.title
                                : null}
                            </span>
                          </div>

                          <div className="grid w-full items-center gap-2">
                            <Label htmlFor="update-body">Content</Label>
                            <Textarea
                              id="update-body"
                              placeholder="Enter blog content"
                              name={"body"}
                              value={updatePostForm.values.body}
                              onChange={updatePostForm.handleChange}
                              onBlur={updatePostForm.handleBlur}
                            />
                            <span className="text-red-500 text-xs">
                              {updatePostForm.touched.body &&
                              updatePostForm.errors.body
                                ? updatePostForm.errors.body
                                : null}
                            </span>
                          </div>

                          <div className="grid w-full items-center gap-2">
                            <Label htmlFor="update-upload_image">Upload Image</Label>
                            <Input
                              type="file"
                              id="update-upload_image"
                              accept=".jpg,.jpeg,.png,.gif"
                              name="upload_image"
                              onChange={(event) => {
                                updatePostForm.setFieldValue("upload_image", event.currentTarget.files[0]);
                              }}
                              onBlur={updatePostForm.handleBlur}
                            />
                            <span className="text-red-500 text-xs">
                              {updatePostForm.touched.upload_image &&
                              updatePostForm.errors.upload_image
                                ? updatePostForm.errors.upload_image
                                : null}
                            </span>
                          </div>

                          <Button
                            role={"submit"}
                            buttonText={"Update blog post"}
                            background={"bg-brandLightBlue"}
                            textColor={"text-white"}
                            loading={loading}
                          />
                        </form>
                      </DialogContent>
                    </Dialog>
                    <span onClick={() => handleToggleStatus(row.id, row.status)} className="cursor-pointer">
                      { row.status === "1" ?
                      <ToggleLeft className="text-muted-foreground" />:
                      <ToggleRight className="text-emerald-500" />
                      }
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}
 
export default ManageNews;