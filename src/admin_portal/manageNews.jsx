import { useBlogList } from "../lib/reuseableEffects";
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
import { CreateBlog, ToggleBlog, UpdateBlog, UpdateBlogImage } from "../hooks/local/reducer";
import { showSuccessToast, showErrorToast } from "../hooks/constants";
import Spinner from "../components/Spinners/spinner";
import { useState, useEffect } from "react";
import { Textarea } from "../components/ui/textarea";

const ManageNews = () => {
    const loading = useSelector((state) => state.user.loading);
    const { posts, refetch } = useBlogList();
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
    list_id: Yup.string()
      .required("Please provide a list ID"),
    upload_image: Yup.mixed()
      .required("Please upload an image")
      .test("fileType", "Unsupported file format", (value) => {
        if (!value) return false;
        return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
      }),
  }),
  onSubmit: async (values, { resetForm }) => {
    const { title, body, upload_image, list_id } = values;
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("upload_image", upload_image);
    formData.append("list_id", list_id);

    const { payload } = await dispatch(
      CreateBlog(formData)
    );
    if (payload[0].status_code === "0") {
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
        list_id: "",
      },
      validationSchema: Yup.object({
        title: Yup.string().max(100, "Title must be 100 characters or less").required("Please provide a title"),
        body: Yup.string().required("Please provide content"),
      }),
      onSubmit: async (values, { resetForm }) => {
        const { id, title, body, list_id } = values;
        
        const formData = new FormData();
        formData.append("id", id);
        formData.append("title", title);
        formData.append("body", body);
        formData.append("list_id", list_id);

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

        const { payload } = await dispatch(UpdateBlogImage(formData));
        if (payload[0].status_code === "0") {
          showSuccessToast("Blog image updated");
          resetForm();
          setIsImageDialogOpen(false);
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
      });
      setIsUpdateDialogOpen(true);
    };

    const handleToggleStatus = async (postId, currentStatus) => {
        
      const newStatus = currentStatus === "1" ? "0" : "1";

      const { payload } = await dispatch(
        ToggleBlog({
          id: postId,
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

            <DialogContent className="max-w-md overflow-y-auto max-h-[80vh]">
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
                    {createPostForm.touched.title && createPostForm.errors.title
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
                    {createPostForm.touched.body && createPostForm.errors.body
                      ? createPostForm.errors.body
                      : null}
                  </span>
                </div>

                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="list_id">List ID</Label>
                  <Input
                    type="text"
                    id="list_id"
                    name="list_id"
                    value={createPostForm.values.list_id}
                    onChange={createPostForm.handleChange}
                    onBlur={createPostForm.handleBlur}
                    maxLength={4}
                  />
                  <span className="text-red-500 text-xs">
                    {createPostForm.touched.list_id &&
                    createPostForm.errors.list_id
                      ? createPostForm.errors.list_id
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
                      createPostForm.setFieldValue(
                        "upload_image",
                        event.currentTarget.files[0]
                      );
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

          <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-sm font-bold text-start">
                  Update Blog Image
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
                      const file =
                        event.currentTarget.files &&
                        event.currentTarget.files[0];
                      if (!file) {
                        updateImageForm.setFieldValue("upload_image", null);
                        setPreviewError(null);
                        setPreviewSrc(
                          selectedPost && selectedPost.image_url
                            ? `${tlaoURL}${selectedPost.image_url}`
                            : null
                        );
                        return;
                      }
                      const allowed = ["image/jpeg", "image/png", "image/gif"];
                      if (!allowed.includes(file.type)) {
                        const msg =
                          "Unsupported file format. Please select JPG, PNG, or GIF.";
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
                        setPreviewSrc(
                          selectedPost && selectedPost.image_url
                            ? `${tlaoURL}${selectedPost.image_url}`
                            : null
                        );
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
                <th scope="col" className="pe-6 py-[18px] whitespace-nowrap">
                  List ID
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
                    {row.list_id}
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
                  <td className="text-start py-4 ps-6 pr-6 md:pr-0 flex items-center gap-4">
                    <Dialog
                      open={isUpdateDialogOpen}
                      onOpenChange={setIsUpdateDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <div
                          className="cursor-pointer"
                          onClick={() => handleEditClick(row)}
                        >
                          <Edit className="size-5" />
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
                            <Label htmlFor="list_id">List ID</Label>
                            <Input
                              type="text"
                              id="list_id"
                              placeholder="Enter list ID"
                              name={"list_id"}
                              value={updatePostForm.values.list_id}
                              onChange={updatePostForm.handleChange}
                              onBlur={updatePostForm.handleBlur}
                            />
                            <span className="text-red-500 text-xs">
                              {updatePostForm.touched.list_id &&
                              updatePostForm.errors.list_id
                                ? updatePostForm.errors.list_id
                                : null}
                            </span>
                          </div>

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
                    <span
                      onClick={() => handleToggleStatus(row.id, row.status)}
                      className="cursor-pointer"
                    >
                      {row.status === "1" ? (
                        <ToggleLeft className="text-muted-foreground" />
                      ) : (
                        <ToggleRight className="text-emerald-500" />
                      )}
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
