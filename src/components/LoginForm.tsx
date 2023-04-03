import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type ISignUp } from "~/components/validation/auth";
import InputField from "~/components/InputField";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useRouter } from "next/router";
// import type { signUpRouter } from "~/server/api/routers/routers";
dayjs.extend(customParseFormat);

export default function LoginForm({
  onSubmit,
}: {
  onSubmit: (data: ISignUp) => Promise<Response>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });
  const router = useRouter();
  return (
    <form
      className="form-control flex text-sm leading-normal"
      id="register-form"
      onSubmit={
        void handleSubmit(async (data) => {
          try {
            await onSubmit(data);
            await router.push({
              pathname: "/login",
              query: { SignUpSuccess: "true" },
            });
          } catch (e) {
            // catch error from api
          }
        })
      }
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
              register
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
