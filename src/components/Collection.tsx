import React, { useEffect, useState } from "react";
import type { INewArrivalScema, INewArrivalScemaList } from "./validation/newArrival";
const Collection = () => {
  const [response, setResponse] = useState<Array<INewArrivalScemaList>>([]);
  useEffect(() => {
    fetch("https://skillkamp-api.com/v1/api/products/new_arrivals")
      .then((response) => response.json())
      .then((data: INewArrivalScema) => {
        setResponse(data.detail.data.catalog.category.productsWithMetaData.list);
        console.log(response)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="flex flex-row max-w-5 gap-x-4 pb-5 mx-5">
      {response.map(
        (item: INewArrivalScemaList) => {
          return (
            <div className="card w-96 bg-base-100 shadow-xl shrink-0" key={item.sku}>
              <figure>
                <img
                  src={item.media[0]?.url}
                  alt={item.media[0]?.altText || "image"}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                    {item.name}
                  {item.ribbon && <div className="badge badge-accent">{item.ribbon}</div>}
                </h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-secondary-focus btn-outline">Details</button>
                    <button className={`btn btn-primary ${(item.isInStock === false) ? 'btn-disabled' : ''}`}>{`Buy Now ${item.formattedDiscountedPrice}`}</button>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};
export default Collection;
