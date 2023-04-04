import React, { useEffect, useState } from "react";
import type {
  INewArrivalSchema,
  INewArrivalSchemaList,
} from "./validation/newArrival";
import Carousel from "./Carousel";
const Collection = () => {
  const [response, setResponse] = useState<Array<INewArrivalSchemaList>>([]);
  useEffect(() => {
    fetch("https://skillkamp-api.com/v1/api/products/new_arrivals")
      .then((response) => response.json()) // convert json string to object
      .then((data: INewArrivalSchema) => {
        setResponse(
          data.detail.data.catalog.category.productsWithMetaData.list
        ); // whyyyyyyyyyyyy
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="max-w-5 mx-5 flex flex-col items-center gap-x-4 pb-5 sm:flex-row ">
      {response.map((item: INewArrivalSchemaList) => {
        return (
          <div
            className="card mb-5 w-80 shrink-0 bg-base-100 shadow-xl sm:mb-0"
            key={item.sku}
          >
            <figure>
              {/* <img
                src={item.media[0]?.url}
                alt={item.media[0]?.altText || "image"}
              /> */}
              <Carousel mediaList={item.media} sku={item.sku}/>
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
                <button className="btn-secondary btn">Details</button>
                <button
                  className={`btn-primary btn ${
                    item.isInStock === false ? "btn-disabled" : ""
                  }`}
                >{`Buy Now ${item.formattedDiscountedPrice}`}</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Collection;
