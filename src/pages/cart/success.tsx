import Head from "next/head";
import Image from "next/image";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
const Success = () => {
    return (
      <>
        <Head>
          <title>HappyKids</title>
          <meta name="description" content="Created by Nopporn Lekuthai" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex min-h-screen w-screen flex-col bg-base-200">
          <div className="fixed top-0 z-50 flex w-full justify-start px-4 py-3">
            <Header />
          </div>
          <div className="relative mx-4 mt-24 flex flex-col justify-center gap-6">
            <div className="flex w-full overflow-hidden rounded-xl shadow-2xl">
              <div className="hero bg-base-100">
                <div className="hero-content w-full max-w-none flex-col-reverse px-0 py-0 md:flex-row">
                  <div className="relative left-0 h-[25rem] w-full md:w-1/2 md:my-20 my-10">
                    <Image
                      alt="banner"
                      src="/app delivery.png"
                      priority={true} //this is a largest contentful paint so we will make it priority
                      fill
                      className="z-10 object-contain"
                    />
                  </div>
                  <div className="px-10 pt-10 md:py-10 w-full md:w-1/2">
                    <h1 className=" text-5xl font-bold">
                      Successful
                    </h1>
                    <p className="py-6 text-lg">
                      Your items is on the way
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </>
    );
  };
  
  export default Success;