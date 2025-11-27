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
      fistname: Yup.string().required("Please provide your firstname"),
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
        <div className="px-4 md:px-[120px] lg:px-[231px] grid grid-cols-1 lg:grid-cols-3">
          <form onSubmit={contactUsForm.handleSubmit} className="lg:col-span-2 pe-25">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input type="text" id="firstName" placeholder="First name" />
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input type="text" id="lastName" placeholder="Last name" />
                </div>
            </div>
            <div className="grid mt-6">
              <div className="grid w-full items-center gap-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input type="tel" id="phone" placeholder="Phone number" />
                </div>
            </div>
            <div className="grid mt-6">
              <div className="grid w-full items-center gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" placeholder="Email" />
                </div>
            </div>
            <div className="grid mt-6">
              <div className="grid w-full items-center gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input type="text" id="subject" placeholder="Suject" />
                </div>
            </div>
            <div className="grid my-6">
              <div className="grid w-full items-center gap-2">
                  <Label htmlFor="subject">Your message</Label>
                  <Textarea id="subject" placeholder="Start typing..."/>
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
            <img src={banner} alt="" />
          </div>
        </div>
      </div>
    );
}
 
export default ContactUs;