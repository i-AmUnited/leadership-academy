import { useState } from 'react';
import poster from "../assets/images/staff_1.png";
import { Button } from "../components/ui/button";
import { ChevronDown } from "lucide-react"

const Gallery = () => {
    const images = [
          { id: 1, image: poster },
          { id: 2, image: poster },
          { id: 3, image: poster },
          { id: 4, image: poster },
          { id: 5, image: poster },
          { id: 6, image: poster },
          { id: 7, image: poster },
          { id: 8, image: poster },
          { id: 9, image: poster },
          { id: 10, image: poster },
          { id: 11, image: poster },
          { id: 12, image: poster },
          { id: 13, image: poster },
          { id: 14, image: poster },
          { id: 15, image: poster },
          { id: 16, image: poster },
          { id: 17, image: poster },
          { id: 18, image: poster },
          { id: 19, image: poster },
          { id: 20, image: poster },
    ];

    const [visibleCount, setVisibleCount] = useState(5);

    const loadMore = () => {
        setVisibleCount(prev => Math.min(prev + 5, images.length));
    };

    const visibleImages = images.slice(0, visibleCount);
    const hasMore = visibleCount < images.length;

    return (
      <div className="py-20 grid gap-10">
        <div className="text-center px-4 md:px-[120px] lg:px-[231px]">
          <div className="flex justify-center">
            <div className="smallTitle w-fit grid relative">
              <span className="z-10 text-brandRed">Gallery</span>
              <span className="h-[6px] bg-brandRed/15 w-full text-start items-start absolute bottom-1"></span>
            </div>
          </div>
          <div className="brandFont text-4xl font-bold text-pretty mb-6 mt-2 text-brandBlue">
            In school pictures
          </div>
          <div className="flex justify-center">
            <div className="text-sm md:w-1/2 smallTitle text-brandLightBlack/70">
              From classroom learning and creative projects to sports days and
              school trips, our gallery reflects the vibrant experiences that
              shape our students every day.
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-10">
            {visibleImages.map((item, index) => (
              <img
                key={item.id}
                src={item.image}
                alt=""
                className={`w-full h-full object-cover ${
                  (index - 3) % 5 === 0 && index >= 3
                    ? "lg:col-span-2 aspect-video"
                    : ""
                }`}
              />
            ))}
          </div>
          {hasMore && (
            <Button variant="outline" size="lg" className="text-xs"  onClick={loadMore}>
              Load more images <ChevronDown className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    );
}
 
export default Gallery;