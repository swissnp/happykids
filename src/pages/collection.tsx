import Head from "next/head";
import Header from "~/components/Header";
import { Slider } from "antd";
import { useEffect, useState } from "react";
import { type IFilterRes } from "~/lib/validation/filter";
import { Select, Tag } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { Controller, useForm } from "react-hook-form";
import type {
  INewArrivalSchema,
  INewArrivalSchemaList,
} from "~/lib/validation/newArrival";
import Collection from "~/components/Collection";
import Footer from "~/components/Footer";

const tagRender = (props: CustomTagProps) => {
  // no control over the props
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <div className="">
      <Tag
        color={`${label === "Blue" ? "#ECF9FF" : (value as string)}`}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginTop: 2,
          marginBottom: 2,
          marginRight: 3,
          color: `${label === "Blue" ? "Blue" : "Black"}`,
        }}
      >
        {label}
      </Tag>
    </div>
  );
};

// export default App;

const ShopCollection = () => {
  const [filter, setFilter] = useState<IFilterRes | null>(null);
  //   const [productState, setProductState] = useState<{loading: boolean, error: boolean}>({loading: false, error: false});
  const [productData, setProductData] = useState<Array<INewArrivalSchemaList>>(
    []
  );
  const priceMarks: { [key: number]: string } = {};

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isSubmitted },
  } = useForm({
    defaultValues: {
      PRICE: [17.99, 19.99] as [number, number],
      OPTION_COLOR: [],
      CATEGORY: "",
      OPTION_LIST: "",
    },
    mode: "onChange",
  });

  // fetch filter data
  useEffect(() => {
    void fetch("https://skillkamp-api.com/v1/api/filters/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 403) {
          //doesnt documented in backend api
          console.log("403");
        } else {
          console.log("error");
        }
      })
      .then((data: IFilterRes) => {
        setFilter(data);
      });
  }, []);

  // fetch product data
  useEffect(() => {
    {
      !isSubmitted && // dont fetch again when form is submitted
        void fetch("https://skillkamp-api.com/v1/api/products/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else if (response.status === 403) {
              //doesnt documented in backend api
              console.log("403");
            } else {
              console.log("error");
            }
          })
          .then((data: INewArrivalSchema) => {
            setProductData(
              data.detail.data.catalog.category.productsWithMetaData.list
            );
          });
    }
  }, []);

  filter?.data.catalog.filters
    .find((item) => item.name === "price")
    ?.values.map((item) => {
      if ((parseFloat(item.key) - 0.49) % 0.5 === 0) {
        priceMarks[parseFloat(item.key)] = item.value;
      }
    });
  const colorOption: { label: string; value: string }[] =
    filter?.data.catalog.filters
      .find((item) => item.name === "Color")
      ?.values.map((item) => {
        return { value: item.key, label: item.value };
      }) || [];

  const catagoryOption: { label: string; value: string }[] =
    filter?.data.catalog.filters
      .find((item) => item.name === "categoryId")
      ?.values.map((item) => {
        return { value: item.value, label: item.value };
      }) || [];

  const sizeOption: { label: string; value: string }[] =
    filter?.data.catalog.filters
      .find((item) => item.name === "Size")
      ?.values.map((item) => {
        return { value: item.key, label: item.value };
      }) || [];

  const onSubmit = async (data: {
    PRICE: [number, number];
    OPTION_COLOR: { value: string; label: string }[];
    CATEGORY: string;
    OPTION_LIST: string;
  }) => {
    const inputUrl = new URL("https://skillkamp-api.com/v1/api/products/");
    data.CATEGORY && inputUrl.searchParams.append("CATEGORY", data.CATEGORY);
    data.PRICE &&
      inputUrl.searchParams.append(
        "PRICE",
        `${data.PRICE[0]}-${data.PRICE[1]}`
      );
    data.OPTION_COLOR.length > 0 &&
      inputUrl.searchParams.append(
        "OPTION_COLOR",
        data.OPTION_COLOR.map((item) => item.label).join(",")
      );
    data.OPTION_LIST &&
      inputUrl.searchParams.append("OPTION_LIST", data.OPTION_LIST);
    console.log(inputUrl.toString());
    await fetch(inputUrl.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 403) {
          //doesnt documented in backend api
          console.log("403");
        } else {
          console.log("error");
        }
      })
      .then((data: INewArrivalSchema) => {
        setProductData(
          data.detail.data.catalog.category.productsWithMetaData.list
        );
      });
  };

  return (
    <>
      <Head>
        <title>HappyKids</title>
        <meta name="description" content="Created by Nopporn Lekuthai" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen w-screen flex-col bg-base-200 overflow-y-scroll">
        <div className="fixed top-0 z-50 flex w-full justify-start px-4 py-3">
          <Header />
        </div>
        <div className="relative mx-4 mt-24 flex flex-col justify-center gap-6 lg:flex-row">
          <div className="flex h-fit w-full flex-col overflow-hidden rounded-xl bg-base-100 px-5 py-10 shadow-2xl lg:w-1/4">
            <h1 className="mb-3 text-2xl font-bold">Filters</h1>
            {filter ? (
              <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-1">
                <div className="w-full">
                  <h4 className="text-md">Prices</h4>
                  <div className="mx-4">
                    <Controller
                      control={control}
                      name="PRICE"
                      render={({ field }) => (
                        <Slider
                          range
                          marks={priceMarks}
                          step={0.1}
                          min={17.99}
                          max={19.99}
                          defaultValue={[17.99, 19.99]}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="mb-2 w-full">
                  <h4 className="text-md">Color</h4>
                  <Controller
                    control={control}
                    name="OPTION_COLOR"
                    render={({ field }) => (
                      <Select
                        labelInValue
                        mode="multiple"
                        showArrow
                        // placeholder="Select Color"
                        tagRender={tagRender}
                        style={{ width: "100%" }}
                        options={colorOption}
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className="mb-2 w-full">
                  <h4 className="text-md">Category</h4>
                  <Controller
                    control={control}
                    name="CATEGORY"
                    render={({ field }) => (
                      <Select
                        showArrow
                        placeholder="Select a category"
                        style={{ width: "100%" }}
                        options={catagoryOption}
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className="mb-2 w-full">
                  <h4 className="text-md">Size</h4>
                  <Controller
                    control={control}
                    name="OPTION_LIST"
                    render={({ field }) => (
                      <Select
                        showArrow
                        placeholder="Select sizes"
                        style={{ width: "100%" }}
                        options={sizeOption}
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
            ) : (
              <progress className="progress mb-10 w-full align-middle"></progress>
            )}
            <button
              onClick={handleSubmit(async (data) => {
                await onSubmit(data);
                console.log(data);
              })}
              className={`btn ${isSubmitting ? "loading" : ""}`}
            >
              {" "}
              submit
            </button>
          </div>
          <div className="flex h-fit flex-col overflow-hidden rounded-xl bg-base-100 shadow-2xl lg:w-3/4">
            <h1 className="mx-10 my-10 text-4xl font-bold">Collection</h1>
            <div className="overflow-scroll">
              {isSubmitting ? (
                <progress className="progress mb-10 w-full px-20 align-middle"></progress>
              ) : (
                <Collection response={productData} />
              )}
              {productData.length === 0 && (
                <div className="mx-10 mb-10 text-2xl">Nothing here yet😢</div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};
export default ShopCollection;
