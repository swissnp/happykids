import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "~/components/Header";
import SignUpForm from "~/components/SignUpForm";
import type { ISignUp, IRequestSignUp } from "~/lib/validation/auth";

const Register: NextPage = () => {
  //   const { mutateAsync } = api.auth.signUp.useMutation();
  const mergeName = (data: ISignUp): IRequestSignUp => {
    const { firstname, lastname, ...rest } = data;
    return { fullname: `${firstname} ${lastname}`, ...rest };
  };

  const onSubmit = async (data: ISignUp) => {
    const mergedData = mergeName(data);
    const result = await fetch("https://skillkamp-api.com/v1/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(mergedData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return result;
  };

  return (
    <>
      <Head>
        <title>{"Login 😀Kids"}</title>
        <meta name="description" content="😀Kids" />
        <link rel="icon" href="/fav-sw.jpg" />
      </Head>

      <main className="font-kanit flex min-h-screen flex-col bg-base-200 tabular-nums">
        <div className="fixed top-0 z-50 flex w-full justify-start px-4 py-3">
          <Header />
        </div>
        <section className="font-kanit mt-16 flex flex-col items-center bg-none px-0 py-10 font-light text-neutral-500">
          <div className="flex">
            <div className="h-90 l:hidden relative bottom-0 right-0 z-10 -mx-10 hidden w-48 md:flex">
              <Image
                className="object-contain object-right-bottom"
                src={"/she_with_file.png"}
                // priority={true} //this is a largest contentful paint so we will make it priority
                alt="icon register"
                fill
              />
            </div>
            <div className="m-5 flex w-full flex-col overflow-hidden rounded-2xl bg-white leading-5 text-neutral-500 shadow-xl">
              <div className="font-kanit relative flex h-60 grow flex-col items-start justify-center bg-primary-focus px-16 py-8 font-light leading-5 text-white">
                <div className="flex text-white">
                  <div className="flex-nowrap">
                    <h2 className="text-3xl font-bold">Register</h2>
                    <p>Begin a splendid journey with us</p>
                  </div>
                </div>
              </div>
              <div className="font-kanit p-10 font-light leading-5 text-neutral-500">
                <SignUpForm onSubmit={onSubmit} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Register;
