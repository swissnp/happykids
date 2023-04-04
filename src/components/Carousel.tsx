import React, { useState } from "react";
import type { INewArrivalSchemaMedia } from "./validation/newArrival";
const Carousel = ({ mediaList, sku }: { mediaList: INewArrivalSchemaMedia[], sku:string }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  return (
    <div className="carousel w-full">
      {mediaList.map((item: INewArrivalSchemaMedia) => {
        return (
          <div
            id={`slide${sku}${item.index}`}
            key={item.index}
            className="carousel-item relative w-full"
          >
            <img src={item.url} className="w-full" />
            <div className="  ">
              {(item.index-1 >= 0) && <a
                href={`#slide${sku}${item.index -1}`}
                className="btn-circle btn absolute left-5 top-1/2 flex transform"
              >
                ❮
              </a>}
              {(item.index+1 <= mediaList.length-1) &&<a
                href={`#slide${sku}${item.index + 1}`}
                className="btn-circle btn absolute right-5 top-1/2 flex transform"
              >
                ❯
              </a>}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Carousel;
