import React from "react";
import type { INewArrivalSchemaList } from "../lib/validation/newArrival";
import Carousel from "./Carousel";
import Link from "next/link";
// new arrivals component this will be used in home page
const Collection = ({
  response,
}: {
  response: Array<INewArrivalSchemaList>;
}) => {
  return (
    <div className="max-w-5 mx-5 flex flex-col items-center gap-x-4 pb-5 sm:flex-row ">
      {response.map((item: INewArrivalSchemaList) => {
        return (
          <div
            className="card mb-5 w-80 shrink-0 bg-base-100 shadow-xl sm:mb-0"
            key={item.sku}
          >
            <figure>
              <Carousel
                mediaList={item.media}
                sku={item.sku}
                classNameDiv=" w-80 h-80 "
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {item.name}
                {item.ribbon && (
                  <div className="badge-accent badge">{item.ribbon}</div>
                )}
              </h2>
              <div className="whitespace-nowrap">
                <p
                  className={`${
                    item.discountedPrice != item.price
                      ? "line-through decoration-error"
                      : ""
                  } inline`}
                >
                  {item.formattedPrice}
                </p>
                {item.discountedPrice != item.price && (
                  <p className=" inline">{` → ${item.formattedDiscountedPrice}`}</p>
                )}
              </div>
              <div className="card-actions justify-end">
                {/* <button className="btn-secondary btn">Details</button> */}
                <Link
                  href={`/product/${item.sku}`}
                  className={`btn-primary btn ${
                    item.isInStock === false ? "btn-disabled" : ""
                  }`}
                >{`Buy Now ${item.formattedDiscountedPrice}`}</Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Collection;
