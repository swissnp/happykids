import Header from "../components/Header";
import Footer from "../components/Footer";
import type { IViewCartResponse } from "~/lib/validation/cart";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { api } from "~/utils/api";
import { requireAuth } from "~/server/requireAuth";
import Link from "next/link";
import type { IAddToCart } from "~/lib/validation/cart";
import { useRouter } from "next/router";
import CartInputField from "~/components/CartInputFIeld";
import { isTRPCClientError } from "~/lib/validation/error";
// this page will be client side rendered

import { loadStripe } from "@stripe/stripe-js";
import { signOut } from "next-auth/react";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ``
);
const Cart = () => {
  const result = api.cart.view.useQuery(null);
  const editMutation = api.cart.edit.useMutation();
  const deleteMutation = api.cart.delete.useMutation();
  const checkoutMutation = api.cart.checkout.useMutation();
  const [error, setError] = useState("");

  const router = useRouter();

  const onChange = async (data: IAddToCart): Promise<IViewCartResponse> => {
    const response = await editMutation.mutateAsync(data);
    await result.refetch();
    return response;
  };
  const removeItem = async (data: IAddToCart) => {
    try {
      await deleteMutation.mutateAsync(data);
      await result.refetch();
    } catch (error) {
      if (isTRPCClientError(error)) {
        if (error.data?.code === "UNAUTHORIZED") {
          await signOut({ redirect: false });
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
  };
  const checkout = async () => {
    try {
      const response = await checkoutMutation.mutateAsync();
      await router.push(response.url || "");
    } catch (error) {
      if (isTRPCClientError(error)) {
        if (error.data?.code === "UNAUTHORIZED") {
          await signOut({ redirect: false});
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
  };

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <>
      <Head>
        <title>Cart - HappyKids</title>
        <meta name="description" content="Created by Nopporn Lekuthai" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen w-screen flex-col bg-base-200 overflow-y-scroll">
        <div className="fixed top-0 z-50 flex w-full justify-start px-4 py-3">
          <Header />
        </div>
        <div className="relative mx-4 mt-24 flex flex-col justify-center gap-6">
          <div className="flex w-full flex-col overflow-hidden rounded-xl bg-base-100 shadow-2xl">
            <h1 className="mx-10 my-10 text-4xl font-bold">Cart</h1>
            <div className="mb-5 overflow-x-auto rounded-none md:mx-10 md:rounded-xl md:drop-shadow-xl">
              <table className="table-compact table w-full rounded-none md:table-normal">
                {/* head */}
                <thead className="rounded-none">
                  <tr>
                    <th className="rounded-none">Items</th>
                    {/* <th>Options</th> */}
                    <th className="rounded-none">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {result.data?.detail.cart_list &&
                    result.data?.detail.cart_list.map((item) => {
                      return (
                        <tr
                          key={item.sku + item.color + item.size}
                          className=""
                        >
                          <td>
                            <div className="flex items-center space-x-3">
                              <Link
                                className="avatar"
                                href={`/product/${item.sku}`}
                              >
                                <div className="mask mask-squircle h-16 w-16">
                                  <Image
                                    src={item.fullUrl}
                                    alt={item.name}
                                    fill
                                  />
                                </div>
                              </Link>
                              <div>
                                <Link
                                  className="font-bold hover:underline"
                                  href={`/product/${item.sku}`}
                                >
                                  {item.name}
                                </Link>
                                <div className="text-sm opacity-50">
                                  {item.color}
                                </div>
                                <div className="text-sm opacity-50">
                                  {item.size}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="">
                            <CartInputField onChange={onChange} item={item} />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="inline h-5 w-5 opacity-50 hover:opacity-100 "
                              onClick={async () => {
                                await removeItem({
                                  sku: item.sku,
                                  color: item.color,
                                  size: item.size,
                                  qty: item.qty,
                                  discountedPrice: item.discountedPrice,
                                  price: item.price,
                                  name: item.name,
                                });
                              }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                            {" x "}

                            <div className="inline whitespace-nowrap">
                              <p
                                className={`inline ${
                                  item.discountedPrice != item.price
                                    ? "line-through decoration-error"
                                    : ""
                                } inline`}
                              >
                                {+item.price.toFixed(2)}
                              </p>
                              {item.discountedPrice != item.price && (
                                <p className=" inline">{` → ${+item.discountedPrice.toFixed(
                                  2
                                )}`}</p>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            {result.data?.detail.sub_total && (
              <div>
                <div className="mx-5 mb-2 flex flex-row-reverse text-lg font-bold md:mx-16">{`Subtotal ${
                  +result.data?.detail.sub_total.toFixed(2) || 0
                } $`}</div>
                <div
                  className={`mx-5 mb-2 flex flex-row-reverse text-lg font-bold md:mx-16 ${
                    +result.data?.detail.shipping.toFixed(2) === 0
                      ? "text-emerald-500"
                      : ""
                  }`}
                >{`Shipping ${result.data?.detail.shipping || 0} $`}</div>
                <div className="mx-5 mb-2 flex flex-row-reverse text-2xl font-bold md:mx-16">{`Total ${
                  +result.data?.detail.total.toFixed(2) || 0
                } $`}</div>
              </div>
            )}
            {error && <p className="w-full text-center text-error">{error}</p>}
            <button
              className="btn-primary btn mx-10 mb-10 mt-5 flex flex-row-reverse"
              onClick={() => checkout()}
            >
              Buy Now
            </button>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

// no idea how to fix this right now
// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

export default Cart;
