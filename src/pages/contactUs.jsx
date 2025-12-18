import banner from "../assets/images/contactBanner.png";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import Button from "../components/button";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CreateContactUsRequest } from "../hooks/local/reducer";
import { showSuccessToast } from "../hooks/constants";
import Spinner from "../components/Spinners/spinner";

const ContactUs = () => {
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();
  const contactUsForm = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phonenumber: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Please provide your firstname"),
      lastname: Yup.string().required("Please provide your lastname"),
      phonenumber: Yup.string().required("Please provide your phone number"),
      email: Yup.string().email("Please provide a valid email").required("Please provide your email"),
      subject: Yup.string().required("Please provide a subject for your message"),
      message: Yup.string().required("Please type in your message"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const { firstname, lastname, phonenumber, email, subject, message } = values;
      let contactUsData = { firstname, lastname, phonenumber, email, subject, message };
      const { payload } = await dispatch(
        CreateContactUsRequest(contactUsData)
      );
      if (payload.status_code === "0") {
        showSuccessToast("Message sent!");
        resetForm();
      }
    },
  });
    return (
      <div className="py-20 grid gap-10">
        <Spinner loading={useSelector((state) => state.user).loading} />
        <div className="text-center px-4 md:px-[120px] lg:px-[231px]">
          <div className="brandFont text-4xl font-bold text-pretty mb-6 mt-2 text-brandBlue">
            Contact us
          </div>
          <div className="flex justify-center">
            <div className="smallTitle text-brandLightBlack flex items-center gap-4 justify-center lg:w-1/2">
              Please fill the form below to get in touch with us and a member of
              our team will get back to you promptly.
            </div>
          </div>
        </div>
        <div className="px-4 md:px-[120px] lg:px-[231px] grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-0">
          <form onSubmit={contactUsForm.handleSubmit} className="lg:col-span-2 lg:pe-25">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    type="text"
                    id="firstName"
                    placeholder="First name" 
                    name="firstname"
                    value={contactUsForm.values.firstname}
                    onChange={contactUsForm.handleChange}
                    onBlur={contactUsForm.handleBlur}
                  />
                  <span className="text-red-500 text-xs">
                    {contactUsForm.touched.firstname &&
                    contactUsForm.errors.firstname
                      ? contactUsForm.errors.firstname
                      : null}
                  </span>
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input type="text" id="lastName" placeholder="Last name"
                    name="lastname"
                    value={contactUsForm.values.lastname}
                    onChange={contactUsForm.handleChange}
                    onBlur={contactUsForm.handleBlur}
                  />
                  <span className="text-red-500 text-xs">
                    {contactUsForm.touched.lastname &&
                    contactUsForm.errors.lastname
                      ? contactUsForm.errors.lastname
                      : null}
                  </span>
                </div>
            </div>
            <div className="grid mt-6">
              <div className="grid w-full items-center gap-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input type="tel" id="phone" placeholder="Phone number" 
                    name="phonenumber"
                    value={contactUsForm.values.phonenumber}
                    onChange={contactUsForm.handleChange}
                    onBlur={contactUsForm.handleBlur}
                  />
                  <span className="text-red-500 text-xs">
                    {contactUsForm.touched.phonenumber &&
                    contactUsForm.errors.phonenumber
                      ? contactUsForm.errors.phonenumber
                      : null}
                  </span>
                </div>
            </div>
            <div className="grid mt-6">
              <div className="grid w-full items-center gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" placeholder="Email" 
                    name="email"
                    value={contactUsForm.values.email}
                    onChange={contactUsForm.handleChange}
                    onBlur={contactUsForm.handleBlur}
                  />
                  <span className="text-red-500 text-xs">
                    {contactUsForm.touched.email &&
                    contactUsForm.errors.email
                      ? contactUsForm.errors.email
                      : null}
                  </span>
                </div>
            </div>
            <div className="grid mt-6">
              <div className="grid w-full items-center gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input type="text" id="subject" placeholder="Suject" 
                    name="subject"
                    value={contactUsForm.values.subject}
                    onChange={contactUsForm.handleChange}
                    onBlur={contactUsForm.handleBlur}
                  />
                  <span className="text-red-500 text-xs">
                    {contactUsForm.touched.subject &&
                    contactUsForm.errors.subject
                      ? contactUsForm.errors.subject
                      : null}
                  </span>
                </div>
            </div>
            <div className="grid my-6">
              <div className="grid w-full items-center gap-2">
                  <Label htmlFor="message">Your message</Label>
                  <Textarea id="message" placeholder="Start typing..."
                    name="message"
                    value={contactUsForm.values.message}
                    onChange={contactUsForm.handleChange}
                    onBlur={contactUsForm.handleBlur}
                  />
                  <span className="text-red-500 text-xs">
                    {contactUsForm.touched.message &&
                    contactUsForm.errors.message
                      ? contactUsForm.errors.message
                      : null}
                  </span>
                </div>
            </div>
            <Button
              role={"submit"}
              textColor={"text-white"}
              background={"bg-brandLightBlue"}
              buttonText={"Send message"}
              loading={loading}
            />
          </form>
          <div className="lg:col-span-1">
            <img src={banner} alt="" className="h-full object-cover" />
          </div>
        </div>
      </div>
    );
}
 
export default ContactUs;