import type { INewArrivalSchemaMedia } from "../lib/validation/newArrival";
import Image from "next/image";
const Carousel = ({ mediaList, sku, className,classNameDiv }: { mediaList: INewArrivalSchemaMedia[], sku:string, className?: string, classNameDiv?: string }) => {
  return (
    <div className={`carousel w-full ${classNameDiv || ''}`}>
      {mediaList.map((item: INewArrivalSchemaMedia) => {
        return (
          <div
            id={`slide${sku}${item.index}`}
            key={item.index}
            className={`carousel-item relative w-full h-full${className || ''}`}
          >
                <Image
                    alt={item.altText || "product image"}
                    src={item.url}
                    fill
                    className=" object-cover object-center"
                  />
                
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
