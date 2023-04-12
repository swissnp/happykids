import Head from "next/head";
import Image from "next/image";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
const Contact = () => {
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
              <div className="hero-content w-full max-w-none flex-col-reverse px-0 py-0 ">
                <div className="relative left-0 h-[35rem] w-full overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBihRtzJfrEgwggZXNJTWeedhv1Nz-anFQ
                    &q=Space+Needle,Seattle+WA"
                  ></iframe>
                </div>
                <div className="w-full px-10 pt-10 md:py-10">
                  <h1 className="text-5xl font-bold text-center my-5">Contact</h1>
                  <div className="my-8 gap-6 grid grid-cols-1 md:grid-cols-3">
                    <div className="prose w-full text-center text-lg">
                      <b>{"VISIT US"}</b>
                      <br />
                      500 Terry Francois St. <br />
                      San Francisco, CA 94158 <br />
                      123-456-7890
                    </div>
                    <div className="w-full text-center text-lg">
                      <b>OPENING HOURS</b> <br />
                      Mon - Fri: 7am - 10pm
                      <br />
                      ​​Saturday: 8am - 10pm
                      <br />
                      ​Sunday: 8am - 11pm
                    </div>
                    <div className="w-full text-center text-lg">
                      <b>CUSTOMER SERVICE</b> <br />
                      1-800-000-000
                      <br />
                      123-456-7890
                      <br />
                      info@mysite.com
                    </div>
                  </div>
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

export default Contact;
