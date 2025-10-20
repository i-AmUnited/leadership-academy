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

const Admissions = () => {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState(new Date())
    return (
      <div className="py-20 grid gap-10 bg-[#fafafa]">
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
          <div className="bg-white p-4 md:p-6 text-sm grid gap-10">
            <div className="grid">
              <span className="w-full border-b pb-2">
                Section 1: Student information
              </span>
              <div className="mt-6 grid grid-cols-1 gap-5">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="fulName">Full name of student</Label>
                  <Input type="text" id="fullName" placeholder="Full name" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="date" className="px-1">
                    Date of birth
                  </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <div className="w-full py-2 flex justify-between items-center cursor-pointer font-normal h-12 rounded-md px-6 has-[>svg]:px-4 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50" id="date">
                        {date ? date.toLocaleDateString() : "Date of birth"}
                        <img src={calenderIcon} alt="" className="size-5" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setDate(date);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="px-1">Gender</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      {/* <SelectItem value="system">System</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input type="text" id="nationality" placeholder="Nigerian" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="px-1">Propsed year group</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Jss 1</SelectItem>
                      <SelectItem value="female">Jss 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   <div className="grid w-full items-center gap-2">
                  <Label htmlFor="state">State of origin</Label>
                  <Input type="text" id="state" placeholder="Lagos state" />
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="fulName">LGA</Label>
                  <Input type="text" id="fullName" placeholder="" />
                </div>
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input type="text" id="address" placeholder="" />
                </div>
              </div>
            </div>
            <div className="grid">
              <span className="w-full border-b pb-2">
                Section 2: Parent information
              </span>
              <div className="mt-6 grid grid-cols-1 gap-5">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input type="text" id="name" placeholder="Full name" />
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="profession">Profession</Label>
                  <Input type="text" id="profession" placeholder="" />
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input type="email" id="email" placeholder="example@gmail.com" />
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <Button
                buttonText={"Submit & pay"}
                background={"bg-brandLightBlue"}
                textColor={"text-white"}
              />
              <span className="text-xs italic text-brandLightBlack font-semibold">(Please note that you will be redirected to paystack to make payment of N15,000)</span>
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default Admissions;