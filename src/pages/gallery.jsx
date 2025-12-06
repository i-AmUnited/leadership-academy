import { useState } from 'react';
import { Button } from "../components/ui/button";
import { ChevronDown } from "lucide-react"
import { useSelector } from 'react-redux';
import Spinner from '../components/Spinners/spinner';
import { useGalleryList } from '../lib/reuseableEffects';

const Gallery = () => {
  const {gallery} = useGalleryList();
  const tlaoURL = "http://tlao.ristherhen.com/tlao_api/"
   
    const [visibleCount, setVisibleCount] = useState(5);

    const loadMore = () => {
        setVisibleCount(prev => Math.min(prev + 5, gallery.length));
    };

    const visibleImages = gallery.slice(0, visibleCount);
    const hasMore = visibleCount < gallery.length;

    return (
      <div className="py-20 grid gap-10">
        <Spinner loading={useSelector((state) => state.user).loading} />
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
                src={`${tlaoURL}${item.image_url}`}
                alt=""
                className={`w-full object-cover ${
                  (index - 3) % 5 === 0 && index >= 3
                    ? "lg:col-span-2 aspect-video"
                    : "aspect-square h-auto"
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