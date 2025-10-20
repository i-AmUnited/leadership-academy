import { Share, Share2Icon } from "lucide-react";
import banner from "../../assets/images/blog_banner.png";
import { Button } from "../../components/ui/button";
import blogImage from "../../assets/images/staff_1.png";
import arrowIcon from "../../assets/logo and icons/arrow-right.png"

const BlogPost = () => {
     const blogPosts = [
      {
        image: blogImage,
        title: "Annual School Fair Brings Families Together",
        post: "Parents and students gathered for a day of games, food, and community bonding at the annual school fair.",
        topic: "parents",
        category: "events",
        year: 2025,
      },
      {
        image: blogImage,
        title: "Student Wins National Science Award",
        post: "A final-year student took home the National Science Award for her groundbreaking project on renewable energy.",
        topic: "students",
        category: "news",
        year: 2025,
      },
     ]
    return (
      <div className="pt-20 grid gap-10">
        <div className="px-4 md:px-[120px] lg:px-[300px]">
          <div className="border-b pb-10 mb-5 text-center ">
            <div className="brandFont text-4xl font-bold text-pretty mb-6 mt-2 text-brandBlue">
              End Of The Year Awards Ceremony (2025 SESSION)
            </div>
            <div className="smallTitle text-brandLightBlack flex items-center gap-4 justify-center">
              <span>26th June 2025</span> • <span>200 views</span>
            </div>
          </div>
          <div>
            <img src={banner} alt="" />
          </div>
          <div className="mt-6 mb-10 text-sm leading-6">
            Sollicitudin et blandit risus ultricies adipiscing. Ac at odio purus
            egestas est vivamus et cursus. Tempus eget fames massa ullamcorper
            suscipit morbi elementum ultrices amet. Lobortis convallis turpis
            lacus nulla. In pretium et euismod tempus fermentum convallis
            tincidunt est vitae. Sed placerat in suspendisse senectus ut vitae
            quam. Sit netus eu urna in ac cras metus faucibus ac. Viverra odio
            sagittis non potenti sed. Ornare volutpat eget mattis egestas vitae
            euismod pulvinar. Donec. <br /> <br /> Sollicitudin et blandit risus
            ultricies adipiscing. Ac at odio purus egestas est vivamus et
            cursus. Tempus eget fames massa ullamcorper suscipit morbi elementum
            ultrices amet. Lobortis convallis turpis lacus nulla. In pretium et
            euismod tempus fermentum convallis tincidunt est vitae. Sed placerat
            in suspendisse senectus ut vitae quam. Sit netus eu urna in ac cras
            metus faucibus ac. Viverra odio sagittis non potenti sed. Ornare
            volutpat eget mattis egestas vitae euismod pulvinar. Donec.
          </div>
          <div className="grid md:flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-brandLightBlack"></div>
              <div className="grid">
                <span className="text-xs">Authored by:</span>
                <span className="brandFont text-lg font-medium">
                  The Leadership Academy Owo
                </span>
              </div>
            </div>
            <div>
              <Button variant="outline" size="sm">
                Share <Share2Icon />
              </Button>
            </div>
          </div>
        </div>
        <div className="px-4 md:px-[120px] lg:px-[300px] bg-[#fafafa]">
          <div className="my-20">
            <div className="text-pretty mb-6 mt-2 ">
              <div className="mb-5 brandFont font-bold text-2xl text-brandBlue">More events</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {blogPosts.map((item, index) => (
                  <div key={index} className="">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="aspect-video object-cover rounded-lg"
                    />
                    <div className="grid text-sm mt-2">
                      <span className="font-semibold">{item.title}</span>
                      <span className="leading-6 line-clamp-2 text-gray-600">
                        {item.post}
                      </span>
                      <span className="text-sm flex items-center gap-3 mt-5 text-blue-600 cursor-pointer hover:text-blue-800">
                        <span>Read more</span>
                        <img src={arrowIcon} alt="" className="size-4" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default BlogPost;