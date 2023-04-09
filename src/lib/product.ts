import type { INewArrivalSchema, INewArrivalSchemaList } from "~/lib/validation/newArrival";
import type { IProductDetail } from "~/lib/validation/productDetail";

// This function gets called at build time
// This function gets all possible values of sku
// by calling a get all produucts api since there is no specific api for getting all sku
// this will only run once at build time so it will not affect performance
export async function getSku(): Promise<{ params: { sku: string }}[]> {
    return await fetch(`https://skillkamp-api.com/v1/api/products/`)
        .then((response) => response.json()) // convert json string to object
        .then((data: INewArrivalSchema) => { 
          return data.detail.data.catalog.category.productsWithMetaData.list.map((item: INewArrivalSchemaList) => {
            return{ params: { sku: item.sku }}; //array of sku
          })
        })
  }

export function getProductData(sku:string) {
    return fetch(`https://skillkamp-api.com/v1/api/products/details/${sku}`)
    .then((response) => response.json()) // convert json string to object
    .then((data: IProductDetail) => {
      return data.detail.data.catalog.product
    })
    .catch((err) => {
      console.log(err);
    });
}

  //staticly generated pages


  