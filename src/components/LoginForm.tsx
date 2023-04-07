import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type ILogin } from "~/components/validation/auth";
import InputField from "~/components/InputField";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useRouter } from "next/router";
import { type SignInResponse } from "next-auth/react";
// import type { signUpRouter } from "~/server/api/routers/routers";
dayjs.extend(customParseFormat);

export default function LoginForm({
  onSubmit,
}: {
  onSubmit: (data: ILogin) => Promise<SignInResponse | undefined>;
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });
  const router = useRouter();



  return (
    <form
      className="form-control flex text-sm leading-normal"
      id="login-form"
      onSubmit={handleSubmit(async (data) => {
        const response = await onSubmit(data);
        if (!response) {
          setError("root.serverError", { message: "Unknown error, please try again later" });
        } else if (response.ok) {
          await router.push("/");
        } else if (response.status === 401) {
          setError("root.serverError", { message: "Invalid email or password" });
        } else if (response.status === 422) {
          setError("root.serverError", { message: "Invalid data, please recheck your information." });
        } else {
          setError("root.serverError", { message: "Unknown error, please try again later" });
        }
      })}
    >
      <div className="relative grid h-auto w-full flex-nowrap text-neutral-500">
        <div className="sh-auto table-row w-full">
          <InputField
            label="E-mail"
            name="email"
            placeholder="Enter e-mail"
            inputtype="email"
            form={register("email")}
            error={errors.email}
          />
        </div>
        <div className="table-row h-auto w-full">
          <InputField
            label="Password"
            name="password"
            placeholder="Enter password"
            inputtype="password"
            form={register("password")}
            error={errors.password}
          />
        </div>
        <div className="table-row h-auto w-full">
          {errors.root?.serverError ? (
            <div className="pb-3 text-error">
              {errors.root.serverError.message}
            </div>
          ) : null}
        </div>
        <div className="table-row h-auto w-full">
          <div className="flex justify-end">
            <button
              type="submit"
              className={`btn-primary btn ${!isValid ? "btn-disabled" : ""} ${
                isSubmitting ? "loading" : ""
              }`}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
