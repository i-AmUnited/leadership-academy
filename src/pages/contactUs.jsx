import banner from "../assets/images/contactBanner.png";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import Button from "../components/button";

const ContactUs = () => {
    return (
      <div className="py-20 grid gap-10">
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
          <div className="lg:col-span-2 pe-25">
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
              textColor={"text-white"}
              background={"bg-brandLightBlue"}
              buttonText={"Send message"}
            />
          </div>
          <div className="lg:col-span-1">
            <img src={banner} alt="" />
          </div>
        </div>
      </div>
    );
}
 
export default ContactUs;