import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"
import React from "react";
import calenderIcon from "../../assets/logo and icons/Calendar.png"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import Button from "../../components/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showSuccessToast } from "../../hooks/constants";
import Spinner from "../../components/Spinners/spinner";
import { useDispatch, useSelector } from "react-redux";
import { CreateAdmission } from "../../hooks/local/reducer";

const Admissions = () => {
    const [open, setOpen] = React.useState(false);
    
    const loading = useSelector((state) => state.user.loading);
    
    const dispatch = useDispatch();

    const createAdmissionRequestForm = useFormik({
          initialValues: {
            names: "",
            dob: "",
            gender: "",
            nationality: "",
            state_id: "",
            lga_id: "",
            year_group: "",
            guardian_name: "",
            guardian_phonenumber: "",
            email: "",
            address: ""
          },
          validationSchema: Yup.object({
            names: Yup.string().required("Please provide the full name of the student"),
            dob: Yup.string().required("Please provide the date of birth"),
            gender: Yup.string().required("Select a gender"),
            nationality: Yup.string().required("Please provide student nationality"),
            state_id: Yup.string().required("Please provide state of origin"),
            lga_id: Yup.string().required("Please provide LGA"),
            year_group: Yup.string().required("Select proposed year group"),
            guardian_name: Yup.string().required("Please provide guardian's full name"),
            guardian_phonenumber: Yup.string().required("Please provide guardian's phone number"),
            email: Yup.string().email("Invalid email address").required("Please provide guardian's email address"),
            address: Yup.string().required("Please provide physical address"),
          }),
          onSubmit: async (values, { resetForm }) => {
            const { names, dob, gender, nationality, state_id, lga_id, year_group, guardian_name, guardian_phonenumber, email, address } = values;
            let createAdmissionRequestData = { names, dob, gender, nationality, state_id, lga_id, year_group, guardian_name, guardian_phonenumber, email, address };
            const { payload } = await dispatch(
              CreateAdmission(createAdmissionRequestData)
            );
            if (payload.status_code === "0") {
              showSuccessToast("Admission request submitted");
              resetForm();
            }
          },
        });

    return (
      <div className="py-20 grid gap-10 bg-[#fafafa]">
        <Spinner loading={loading} />
        <div className="text-center md:px-[120px] lg:px-[231px]">
          <div className="flex justify-center">
            <div className="smallTitle w-fit grid relative">
              <span className="z-10 text-brandRed">Admissions</span>
              <span className="h-[6px] bg-brandRed/15 w-full text-start items-start absolute bottom-1"></span>
            </div>
          </div>
          <div className="brandFont text-4xl font-bold text-pretty mb-6 mt-2 text-brandBlue">
            Online Admissions Form
          </div>
        </div>
        <div className="px-4 md:px-[120px] lg:px-[300px]">
          <form
            onSubmit={createAdmissionRequestForm.handleSubmit}
            className="bg-white p-4 md:p-6 text-sm grid gap-10"
          >
            <div className="grid">
              <span className="w-full border-b pb-2">
                Section 1: Student information
              </span>
              <div className="mt-6 grid grid-cols-1 gap-5">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="fullName">Full name of student</Label>
                  <Input
                    type="text"
                    id="fullName"
                    placeholder="Full name"
                    name="names"
                    value={createAdmissionRequestForm.values.names}
                    onChange={createAdmissionRequestForm.handleChange}
                    onBlur={createAdmissionRequestForm.handleBlur}
                  />
                  <span className="text-red-500 text-xs">
                    {createAdmissionRequestForm.touched.names &&
                    createAdmissionRequestForm.errors.names
                      ? createAdmissionRequestForm.errors.names
                      : null}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="date" className="px-1">
                    Date of birth
                  </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <div
                        className="w-full py-2 flex justify-between items-center cursor-pointer font-normal h-12 rounded-md px-6 has-[>svg]:px-4 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
                        id="date"
                      >
                        {createAdmissionRequestForm.values.dob
                          ? new Date(
                              createAdmissionRequestForm.values.dob
                            ).toLocaleDateString()
                          : "Date of birth"}
                        <img src={calenderIcon} alt="" className="size-5" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={
                          createAdmissionRequestForm.values.dob
                            ? new Date(createAdmissionRequestForm.values.dob)
                            : undefined
                        }
                        captionLayout="dropdown"
                        onSelect={(selectedDate) => {
                          createAdmissionRequestForm.setFieldValue(
                            "dob",
                            selectedDate
                          );
                          setOpen(false);
                        }}
                        onBlur={() =>
                          createAdmissionRequestForm.setFieldTouched(
                            "dob",
                            true
                          )
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <span className="text-red-500 text-xs">
                    {createAdmissionRequestForm.touched.dob &&
                    createAdmissionRequestForm.errors.dob
                      ? createAdmissionRequestForm.errors.dob
                      : null}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="px-1">Gender</Label>
                  <Select
                    value={createAdmissionRequestForm.values.gender}
                    onValueChange={(value) =>
                      createAdmissionRequestForm.setFieldValue("gender", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-red-500 text-xs">
                    {createAdmissionRequestForm.touched.gender &&
                    createAdmissionRequestForm.errors.gender
                      ? createAdmissionRequestForm.errors.gender
                      : null}
                  </span>
                </div>

                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    type="text"
                    id="nationality"
                    placeholder="Nigerian"
                    name="nationality"
                    value={createAdmissionRequestForm.values.nationality}
                    onChange={createAdmissionRequestForm.handleChange}
                    onBlur={createAdmissionRequestForm.handleBlur}
                  />
                  <span className="text-red-500 text-xs">
                    {createAdmissionRequestForm.touched.nationality &&
                    createAdmissionRequestForm.errors.nationality
                      ? createAdmissionRequestForm.errors.nationality
                      : null}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="state">State of origin</Label>
                    <Input
                      type="text"
                      id="state"
                      placeholder="Lagos state"
                      name="state_id"
                      value={createAdmissionRequestForm.values.state_id}
                      onChange={createAdmissionRequestForm.handleChange}
                      onBlur={createAdmissionRequestForm.handleBlur}
                    />
                    <span className="text-red-500 text-xs">
                      {createAdmissionRequestForm.touched.state_id &&
                      createAdmissionRequestForm.errors.state_id
                        ? createAdmissionRequestForm.errors.state_id
                        : null}
                    </span>
                  </div>
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="lga">LGA</Label>
                    <Input
                      type="text"
                      id="lga"
                      placeholder=""
                      name="lga_id"
                      value={createAdmissionRequestForm.values.lga_id}
                      onChange={createAdmissionRequestForm.handleChange}
                      onBlur={createAdmissionRequestForm.handleBlur}
                    />
                    <span className="text-red-500 text-xs">
                      {createAdmissionRequestForm.touched.lga_id &&
                      createAdmissionRequestForm.errors.lga_id
                        ? createAdmissionRequestForm.errors.lga_id
                        : null}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="px-1">Proposed year group</Label>
                  <Select
                    value={createAdmissionRequestForm.values.year_group}
                    onValueChange={(value) =>
                      createAdmissionRequestForm.setFieldValue(
                        "year_group",
                        value
                      )
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jss1">JSS 1</SelectItem>
                      <SelectItem value="jss2">JSS 2</SelectItem>
                      <SelectItem value="jss3">JSS 3</SelectItem>
                      <SelectItem value="ss1">SS 1</SelectItem>
                      <SelectItem value="ss2">SS 2</SelectItem>
                      <SelectItem value="ss3">SS 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-red-500 text-xs">
                    {createAdmissionRequestForm.touched.year_group &&
                    createAdmissionRequestForm.errors.year_group
                      ? createAdmissionRequestForm.errors.year_group
                      : null}
                  </span>
                </div>

                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="address">Physical Address</Label>
                  <Input
                    type="text"
                    id="address"
                    placeholder=""
                    name="address"
                    value={createAdmissionRequestForm.values.address}
                    onChange={createAdmissionRequestForm.handleChange}
                    onBlur={createAdmissionRequestForm.handleBlur}
                  />
                  <span className="text-red-500 text-xs">
                    {createAdmissionRequestForm.touched.address &&
                    createAdmissionRequestForm.errors.address
                      ? createAdmissionRequestForm.errors.address
                      : null}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid">
              <span className="w-full border-b pb-2">
                Section 2: Guardian information
              </span>
              <div className="mt-6 grid grid-cols-1 gap-5">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="guardian_name">Full name</Label>
                  <Input
                    type="text"
                    id="guardian_name"
                    placeholder="Full name"
                    name="guardian_name"
                    value={createAdmissionRequestForm.values.guardian_name}
                    onChange={createAdmissionRequestForm.handleChange}
                    onBlur={createAdmissionRequestForm.handleBlur}
                  />
                  <span className="text-red-500 text-xs">
                    {createAdmissionRequestForm.touched.guardian_name &&
                    createAdmissionRequestForm.errors.guardian_name
                      ? createAdmissionRequestForm.errors.guardian_name
                      : null}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="phone_number">Phone number</Label>
                    <Input
                      type="text"
                      id="phone_number"
                      placeholder=""
                      name="guardian_phonenumber"
                      value={
                        createAdmissionRequestForm.values.guardian_phonenumber
                      }
                      onChange={createAdmissionRequestForm.handleChange}
                      onBlur={createAdmissionRequestForm.handleBlur}
                    />
                    <span className="text-red-500 text-xs">
                      {createAdmissionRequestForm.touched
                        .guardian_phonenumber &&
                      createAdmissionRequestForm.errors.guardian_phonenumber
                        ? createAdmissionRequestForm.errors.guardian_phonenumber
                        : null}
                    </span>
                  </div>
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="example@gmail.com"
                      name="email"
                      value={createAdmissionRequestForm.values.email}
                      onChange={createAdmissionRequestForm.handleChange}
                      onBlur={createAdmissionRequestForm.handleBlur}
                    />
                    <span className="text-red-500 text-xs">
                      {createAdmissionRequestForm.touched.email &&
                      createAdmissionRequestForm.errors.email
                        ? createAdmissionRequestForm.errors.email
                        : null}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <Button
                role={"submit"}
                buttonText={"Submit & pay"}
                background={"bg-brandLightBlue"}
                textColor={"text-white"}
                loading={loading}
              />
              <span className="text-xs italic text-brandLightBlack font-semibold">
                (Please note that you will be redirected to paystack to make
                payment of N15,000)
              </span>
            </div>
          </form>
        </div>
      </div>
    );
}
 
export default Admissions;