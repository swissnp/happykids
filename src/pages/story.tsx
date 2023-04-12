import Head from "next/head";
import Image from "next/image";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
const Story = () => {
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
              <div className="hero-content w-full max-w-none flex-col-reverse px-0 py-0 ">
                <div className="relative left-0 h-[35rem] w-full overflow-hidden">
                  <Image
                    alt="banner"
                    src="/story_banner.webp"
                    priority={true} //this is a largest contentful paint so we will make it priority
                    fill
                    className="z-10 object-cover object-right-top"
                  />
                </div>
                <div className="w-full px-10 pt-10 md:py-10">
                  <h1 className="text-5xl font-bold">Our Story</h1>
                  <p className="py-6 text-lg">
                    {
                      "I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me and you can start adding your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you."
                    }
                  </p>
                  <p className="text-lg"></p>
                  {
                    "​This is a great space to write long text about your company and your services. You can use this space to go into a little more detail about your company. Talk about your team and what services you provide. Tell your visitors the story of how you came up with the idea for your business and what makes you different from your competitors. Make your company stand out and show your visitors who you are."
                  }
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

export default Story;
