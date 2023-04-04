import type { INewArrivalSchema, INewArrivalSchemaList } from "~/components/validation/newArrival";
import type { IProductDetail } from "~/components/validation/productDetail";

// This function gets called at build time
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


  