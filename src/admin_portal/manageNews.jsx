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
import { CreateAchievements, ToggleAchievement, UpdateAchievements } from "../hooks/local/reducer";
import { showSuccessToast } from "../hooks/constants";
import Spinner from "../components/Spinners/spinner";
import { useState } from "react";
import { Textarea } from "../components/ui/textarea";

const ManageNews = () => {
    const loading = useSelector((state) => state.user.loading);
    const { posts, refetch } = useBlogList();
    // console.log(achievements)
    const dispatch = useDispatch();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

    const createAchievementForm = useFormik({
      initialValues: {
        title: "",
        year: "",
      },
      validationSchema: Yup.object({
        title: Yup.string().required("Please provide an achievement"),
        year: Yup.string().required("Please provide a year"),
      }),
      onSubmit: async (values, { resetForm }) => {
        const { title, year } = values;
        let createAchievementData = { title, year };
        const { payload } = await dispatch(
          CreateAchievements(createAchievementData)
        );
        if (payload.status_code === "0") {
          showSuccessToast("Achievment created");
          resetForm();
          setIsDialogOpen(false);
          refetch();
        }
      },
    });

    const updateAchievementForm = useFormik({
      initialValues: {
        id: "",
        title: "",
        year: "",
      },
      validationSchema: Yup.object({
        title: Yup.string().required("Please provide an achievement"),
        year: Yup.string().required("Please provide a year"),
      }),
      onSubmit: async (values, { resetForm }) => {
        const { id, title, year } = values;
        let updateAchievementData = { id, title, year };
        const { payload } = await dispatch(
          UpdateAchievements(updateAchievementData)
        );
        if (payload.status_code === "0") {
          showSuccessToast("Achievment updated");
          resetForm();
          setIsUpdateDialogOpen(false);
          refetch();
        }
      },
    });

    const handleEditClick = (post) => {
      updateAchievementForm.setValues({
        id: post.id,
        title: post.title,
        body: post.body
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
          `Achievement ${newStatus === "0" ? "activated" : "deactivated"}`
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
                onSubmit={createAchievementForm.handleSubmit}
                className="grid gap-4 mt-4"
              >
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    type="text"
                    id="title"
                    placeholder="Enter achievement title"
                    name={"title"}
                    value={createAchievementForm.values.title}
                    onChange={createAchievementForm.handleChange}
                    onBlur={createAchievementForm.handleBlur}
                  />
                  <span className="text-red-500 text-xs">
                    {createAchievementForm.touched.title &&
                    createAchievementForm.errors.title
                      ? createAchievementForm.errors.title
                      : null}
                  </span>
                </div>

                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    type="text"
                    id="year"
                    placeholder="2025"
                    name={"year"}
                    value={createAchievementForm.values.year}
                    onChange={createAchievementForm.handleChange}
                    onBlur={createAchievementForm.handleBlur}
                  />
                  <span className="text-red-500 text-xs">
                    {createAchievementForm.touched.year &&
                    createAchievementForm.errors.year
                      ? createAchievementForm.errors.year
                      : null}
                  </span>
                </div>

                <Button
                  role={"submit"}
                  buttonText={"Create achievement"}
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
                          onSubmit={updateAchievementForm.handleSubmit}
                          className="grid gap-4 mt-4"
                        >
                          <div className="grid w-full items-center gap-2">
                            <Label htmlFor="update-title">Title</Label>
                            <Input
                              type="text"
                              id="update-title"
                              placeholder="Enter achievement title"
                              name={"title"}
                              value={updateAchievementForm.values.title}
                              onChange={updateAchievementForm.handleChange}
                              onBlur={updateAchievementForm.handleBlur}
                            />
                            <span className="text-red-500 text-xs">
                              {updateAchievementForm.touched.title &&
                              updateAchievementForm.errors.title
                                ? updateAchievementForm.errors.title
                                : null}
                            </span>
                          </div>

                          <div className="grid w-full items-center gap-2">
                            <Label htmlFor="update-year">Blog content</Label>
                            <Textarea
                              type="text"
                              id="update-year"
                            //   placeholder="2025"
                              name={"year"}
                              value={updateAchievementForm.values.year}
                              onChange={updateAchievementForm.handleChange}
                              onBlur={updateAchievementForm.handleBlur}
                            />
                            <span className="text-red-500 text-xs">
                              {updateAchievementForm.touched.year &&
                              updateAchievementForm.errors.year
                                ? updateAchievementForm.errors.year
                                : null}
                            </span>
                          </div>

                          <Button
                            role={"submit"}
                            buttonText={"Update achievement"}
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