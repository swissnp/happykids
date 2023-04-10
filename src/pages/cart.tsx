import Header from "../components/Header";
import Footer from "../components/Footer";
// import Image from "next/image";
import Head from "next/head";
import Image from "next/image";
import { api } from "~/utils/api";
import { requireAuth } from "~/server/requireAuth";
import Link from "next/link";

// this page will be client side rendered

const Cart = () => {
  const result = api.cart.view.useQuery();
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen w-screen flex-col bg-base-200">
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
                        <tr key={item.sku + item.color + item.size}>
                          <td>
                            <div className="flex items-center space-x-3">
                              <Link className="avatar" href={`/product/${item.sku}`}>
                                <div className="mask mask-squircle h-16 w-16">
                                  <Image
                                    src={item.fullUrl}
                                    alt={item.name}
                                    fill
                                  />
                                </div>
                              </Link>
                              <div>
                                <Link className="font-bold hover:underline" href={`/product/${item.sku}`}>{item.name}</Link>
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
                            {item.qty}
                            {" x "}
                            <div className="inline whitespace-nowrap">
                              <p
                                className={`${
                                  item.discountedPrice != item.price
                                    ? "line-through decoration-error"
                                    : ""
                                } inline`}
                              >
                                {+item.price.toFixed(2)}
                              </p>
                              {item.discountedPrice != item.price && (
                                <p className=" inline">{` → ${+item.discountedPrice.toFixed(2)}`}</p>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            {result.data?.detail && 
              <div>
                <div className="mx-5 mb-2 flex flex-row-reverse text-lg font-bold md:mx-16">{`Subtotal ${
                  +result.data?.detail.sub_total.toFixed(2) || 0
                } $`}</div>
                <div
                  className={`mx-5 mb-2 flex flex-row-reverse text-lg font-bold md:mx-16 ${
                    +result.data?.detail.shipping.toFixed(2) === 0 ? "text-emerald-500" : ""
                  }`}
                >{`Shipping ${result.data?.detail.shipping || 0} $`}</div>
                <div className="mx-5 mb-2 flex flex-row-reverse text-2xl font-bold md:mx-16">{`Total ${
                  +result.data?.detail.total.toFixed(2) || 0
                } $`}</div>
              </div>
            }
            <button className="flex flex-row-reverse btn btn-primary mx-10 mt-5 mb-10">Buy Now</button>
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
