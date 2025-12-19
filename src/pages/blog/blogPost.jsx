import { Share2Icon } from "lucide-react";
import { Button } from "../../components/ui/button";
import arrowIcon from "../../assets/logo and icons/arrow-right.png"
import { useBlogDetail, useBlogList } from "../../lib/reuseableEffects";
import { useParams } from "react-router-dom";
import { formatDateTime } from "../../lib/utils";
import { showSuccessToast } from "../../hooks/constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinners/spinner";
import GoBack from "../../components/back";
import { useMemo, useEffect } from "react";
import arrow from "../../assets/logo and icons/arrow-right.png";

const BlogPost = () => {
  const { blogID } = useParams();
  const decryptedID = atob(blogID)
  const { detail } = useBlogDetail(decryptedID);

  const { posts } = useBlogList();
  
  // Add blogID and decryptedID to dependencies
  const randomPosts = useMemo(() => {
    if (!posts || posts.length === 0) return [];
    
    // Filter out the current post
    const filteredPosts = posts.filter(post => post.id !== decryptedID);
    
    // Create a copy and shuffle
    const shuffled = [...filteredPosts].sort(() => Math.random() - 0.5);
    
    // Return first 3 items (or less if array is smaller)
    return shuffled.slice(0, Math.min(3, filteredPosts.length));
  }, [posts, decryptedID]); // Added decryptedID to dependencies
  
  // Scroll to top when blogID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blogID]);
  
  const tlaoURL = "http://tlao.ristherhen.com/tlao_api/"

  const postURL = window.location.href;
  const handleCopy = () => {
    navigator.clipboard
      .writeText(postURL)
      .then(() => {
        showSuccessToast("Link copied!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  // console.log(detail)
    return (
      <div className="pt-20 grid gap-10">
      <Spinner loading={useSelector((state) => state.user).loading} />
        <div className="px-4 md:px-[120px] lg:px-[300px]">
          <div className="border-b pb-10 mb-5 text-center ">
            {/* <GoBack /> */}
            <div className="flex items-start">
              <Link to={"/blog"} className="cursor-pointer bg-brandLightBlue/10 text-brandLightBlue p-3 rounded-md mb-3">
                <img src={arrow} alt="" className="h-5 rotate-180"/>
              </Link>
            </div>
            <div className="brandFont text-4xl font-bold text-pretty mb-6 mt-2 text-brandBlue">
           {detail[0]?.title}
            </div>
            <div className="smallTitle text-brandLightBlack flex items-center gap-4 justify-center">
              <span>
              {formatDateTime(detail[0]?.inserted_dt)}
              </span>
            </div>
          </div>
          <div>
            <img src={`${tlaoURL}${detail[0]?.image_url}`} alt="" className="aspect-video object-cover"/>
          </div>
          <div className="mt-6 mb-10 text-sm leading-6">
            {detail[0]?.body}
          </div>
          <div className="grid md:flex items-center gap-5 justify-between text-sm">
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
              <Button variant="outline" size="sm" className="text-xs py-5 cursor-pointer" onClick={handleCopy}>
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
                {randomPosts.map((item, index) => (
                  <div key={index} className="">
                    <Link to={`/blog/${btoa(item.id)}`}>
                    <img
                      src={`${tlaoURL}${item.image_url}`}
                      alt={item.title}
                      className="aspect-video object-cover rounded-lg"
                    />
                    <div className="grid text-sm mt-2">
                      <span className="font-semibold">{item.title}</span>
                      <span className="leading-6 line-clamp-2 text-gray-600">
                        {item.body}
                      </span>
                      <span className="text-sm flex items-center gap-3 mt-5 text-blue-600 cursor-pointer hover:text-blue-800">
                        <span>Read more</span>
                        <img src={arrowIcon} alt="" className="size-4" />
                      </span>
                    </div>
                    </Link>
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