import Head from "next/head";
import Header from "~/components/Header";
import Image from "next/image";
import Footer from "~/components/Footer";
import Collection from "~/components/Collection";
import type {
  INewArrivalSchema,
  INewArrivalSchemaList,
} from "~/lib/validation/newArrival";
import Link from "next/link";
const Home = ({ res }: { res: Array<INewArrivalSchemaList> }) => {
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
        <div className="relative mx-4 mt-24 flex flex-col justify-center gap-6">
          <div className="flex w-full overflow-hidden rounded-xl shadow-2xl">
            <div className="hero bg-base-100">
              <div className="hero-content w-full max-w-none flex-col-reverse px-0 py-0 md:flex-row">
                <div className="relative left-0 h-[35rem] w-full overflow-hidden md:w-1/2">
                  <Image
                    alt="banner"
                    src="/Banner1.png"
                    priority={true} //this is a largest contentful paint so we will make it priority
                    fill
                    className="z-10 object-cover object-right-top"
                  />
                </div>
                <div className="w-full px-10 py-10 md:w-1/2">
                  <h1 className=" text-5xl font-bold">Happier Kids</h1>
                  <p className="py-6">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut
                    assumenda excepturi exercitationem quasi. In deleniti eaque
                    aut repudiandae et a id nisi.
                  </p>
                  <Link className="btn-primary btn" href="/collection">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col  items-center justify-center rounded-xl bg-base-100 drop-shadow-lg">
            <h1 className="my-10 text-4xl font-bold ">New Arrivals</h1>
            <div className="w-full overflow-x-scroll pb-5">
              <Collection response={res} />
            </div>
            <div className="mb-5 flex w-full place-content-center">
              <Link className="btn-secondary btn" href="/collection">
                View All
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Home;

// ISR (Incremental Static Regeneration) is a Next.js feature that allows you to update existing pages by re-rendering them in the background as traffic comes in.
export async function getStaticProps() {
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
      res,
    },
    revalidate: 60,
    // revalidate cached page every 60 seconds
  };
}
