import React from "next/router";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Carousel from "~/components/Carousel";
import Collection from "~/components/Collection";
import Select from "react-tailwindcss-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "~/utils/api";
import { getSku, getProductData } from "~/lib/product";
import { useEffect, useState } from "react";
import type { IProductDetail } from "~/lib/validation/productDetail";
import type { SelectValue } from "react-tailwindcss-select/dist/components/type";
import { type IAddToCart } from "~/lib/validation/cart";
import { isTRPCClientError } from "~/lib/validation/error";
import type {
  INewArrivalSchemaList,
  INewArrivalSchema,
} from "~/lib/validation/newArrival";
//ISR this page for better SEO and performance

const ProductPage = ({
  productData,
  res,
}: {
  res: Array<INewArrivalSchemaList>;
  productData: IProductDetail["detail"]["data"]["catalog"]["product"];
}) => {
  const [error, setError] = useState<string>("");
  const [state, setState] = useState<{ loading: boolean }>({
    loading: false,
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formSelection, setSelection] = useState<{
    color: string | null;
    size: SelectValue | null;
    sizeValue: string | null;
    qty: number;
  }>({ color: null, size: null, sizeValue: null, qty: 1 });

  // this will set the state when there is only one color
  useEffect(() => {
    productData.options.map((option) => {
      if (option.title === "Color") {
        if (option.selections.length === 1) {
          // if there is only one color, set it to state
          setSelection({
            ...formSelection, // destructuring the old state
            color: option?.selections[0]?.description || null, // set color to new state
          });
        }
      }
    });
  }, [productData.options]); // dont need formSelection because we need to set it only once when the page is loaded and not when the state is changed

  const { mutateAsync } = api.cart.add.useMutation();
  const router = useRouter();

  const onSubmit = async (data: IAddToCart) => {
    if (!formSelection.color) {
      setError("Please select a color");
      return;
    } else if (!formSelection.sizeValue) {
      setError("Please select a size");
      return;
    } else if (formSelection.qty < 1) {
      setError("Please select a quantity");
      return;
    } else {
      try {
        setState({ loading: true });
        await mutateAsync(data);
      } catch (error) {
        if (isTRPCClientError(error)) {
          if (error.data?.code === "UNAUTHORIZED") {
            await router.push({
              pathname: "/login",
              query: {
                message: "Unauthorize, Please login first.",
                redirect: router.asPath,
              },
            });
          } else {
            setError(error.message);
          }
        }
      }
    }
    toast.success("Product added to the cart", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setState({ loading: false });
    setError("");
  };

  return (
    <>
      <Head>
        <title>{productData.name + " - HappyKids"}</title>
        <meta name="description" content="Created by Nopporn Lekuthai" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen w-screen flex-col bg-base-200">
        <ToastContainer />
        <div className="fixed top-0 z-50 flex w-full justify-start px-4 py-3">
          <Header trigger={submitted} />
        </div>
        <div className="relative mt-24 flex flex-col justify-center px-4">
          <div className="mb-5 flex flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="hero bg-base-100">
              <div className="hero-content w-full flex-col p-0 md:flex-row md:px-5 md:py-10">
                {/* <div className="h-[30rem] w-full overflow-hidden md:w-[30rem] md:rounded-3xl md:align-middle md:drop-shadow-xl md:justify-items-center object-center"> */}
                {productData ? (
                  <Carousel
                    mediaList={productData.media.map((item) => {
                      return { ...item, url: item.fullUrl };
                    })}
                    sku={productData.sku}
                    classNameDiv="h-[30rem] w-full overflow-hidden md:w-[30rem] md:rounded-3xl md:drop-shadow-xl"
                  />
                ) : (
                  <progress className="progress w-56 align-middle"></progress>
                )}
                {/* </div> */}
                <div className="px-10 py-10 md:w-1/2 md:px-10">
                  <h1 className="pb-3 text-5xl font-bold">
                    {productData?.name}
                    {productData.ribbon && (
                      <div className="badge-accent badge mx-5 align-middle">
                        {productData.ribbon}
                      </div>
                    )}
                  </h1>

                  <p className="pb-3">{productData?.description}</p>
                  <div className="whitespace-nowrap pb-3">
                    <p
                      className={`${
                        productData.discountedPrice != productData.price
                          ? "line-through decoration-error"
                          : ""
                      } inline`}
                    >
                      {productData.formattedPrice}
                    </p>
                    {productData.discountedPrice != productData.price && (
                      <p className=" inline">{` → ${productData.formattedDiscountedPrice}`}</p>
                    )}
                  </div>
                  <div className="mb-5">
                    <div className="flex flex-wrap gap-x-5">
                      {productData.options.map((option) => {
                        if (option.title === "Color") {
                          if (option.selections.length > 1) {
                            // if there is only 1 color option then dont show the color option
                            return (
                              <div key={option.title}>
                                <p className="mb-1">Color</p>
                                {option.selections.map((selection) => {
                                  return (
                                    <input
                                      key={selection.key}
                                      type="radio"
                                      name="radio-7"
                                      style={{
                                        backgroundColor: selection.value, // shouldnt do this but tailwind cant change class after build time
                                        // borderColor: selection.value,
                                      }}
                                      // href={`#slide${productData.sku}${selection.linkedMediaItems[0]?.index || 0}`}
                                      value={selection.description}
                                      onClick={(e) => {
                                        location.href = `#slide${
                                          productData.sku
                                        }${
                                          selection.linkedMediaItems[0]
                                            ?.index || 0
                                        }`;
                                        setSelection({
                                          ...formSelection, // destructuring the old state
                                          color: (e.target as HTMLInputElement)
                                            .value, // set new color to state
                                        });
                                      }}
                                      className={`radio mr-2`}
                                    ></input>
                                  );
                                })}
                              </div>
                            );
                          }
                        } else {
                          return (
                            <div key={option.title} className="mb-1 h-20 w-40">
                              <p className="mb-1">Size</p>
                              <Select
                                primaryColor={"blue"}
                                value={formSelection?.size}
                                onChange={(value: SelectValue) => {
                                  const size = value as {
                                    value: string;
                                    label: string;
                                  };
                                  setSelection({
                                    ...formSelection, // destructuring the old state
                                    size: value, // set color to new state
                                    sizeValue: size.value,
                                  });
                                }}
                                options={option.selections.map((selection) => {
                                  return {
                                    value: selection.value,
                                    label: selection.description,
                                  };
                                })}
                              />
                            </div>
                          );
                        }
                      })}
                      <div className="mb-1 h-20 w-40">
                        <p className="mb-1">Quantity</p>
                        <input
                          type="number"
                          className="input-bordered input h-10 w-20 rounded-md bg-white text-gray-500"
                          inputMode="numeric"
                          min="1"
                          defaultValue={"1"}
                          max="100"
                          onChange={(e) => {
                            setSelection({
                              ...formSelection,
                              qty: parseInt(e.target.value),
                            });
                          }}
                        ></input>
                      </div>
                    </div>
                    {error && <p className="text-sm text-error">{error}</p>}
                  </div>
                  <button
                    className={`btn-primary btn relative ${
                      state.loading ? "loading" : ""
                    }`}
                    onClick={async () => {
                      setSubmitted(false);
                      await onSubmit({
                        sku: productData.sku,
                        qty: formSelection.qty,
                        color: formSelection.color || "",
                        size: formSelection.sizeValue || "",
                        price: productData.price,
                        discountedPrice: productData.discountedPrice,
                        name: productData.name,
                      });
                      setSubmitted(true);
                    }}
                  >
                    {"ADD TO CART"}
                  </button>
                </div>
              </div>
            </div>
            <div className="mx-10 my-14 flex flex-col gap-10 md:m-20 md:flex-row">
              {productData?.additionalInfo?.map((info) => {
                return (
                  <div className="w-full" key={info.id}>
                    <div className="flex w-full flex-col">
                      <h1 className="mb-3 text-2xl font-bold">{info.title}</h1>
                      {info.description.slice(3, -5)} {/* remove the <p> tag */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex w-full flex-col  items-center justify-center rounded-xl bg-base-100 drop-shadow-lg">
            <h1 className="my-10 text-4xl font-bold ">Related Products</h1>
            <div className="w-full overflow-scroll">
              <Collection response={res} />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export async function getStaticPaths() {
  const paths = await getSku();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { sku: string } }) {
  const productData = await getProductData(params.sku);
  const res = await fetch(
    "https://skillkamp-api.com/v1/api/products/new_arrivals"
  )
    .then((response) => response.json()) // convert json string to object
    .then((data: INewArrivalSchema) => {
      return data.detail.data.catalog.category.productsWithMetaData.list;
    })
    .catch((err) => {
      console.log(err);
    });

  return {
    props: {
      productData,
      res,
    },
    revalidate: 60,
  };
}
export default ProductPage;
