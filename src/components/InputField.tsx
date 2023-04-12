import { type FieldError } from "react-hook-form";
const InputField = ({
  label,
  placeholder,
  inputtype,
  name,
  form,
  error,
}: {
  label: string;
  placeholder: string;
  inputtype: "text" | "number" | "email" | "password";
  name?: string;
  form?: object;
  error?: FieldError;
}) => {
  return (
    <div className="mb-4 h-auto w-full align-top">
      <div className="mb-2 inline-block overflow-hidden whitespace-nowrap text-right align-middle leading-snug">
        <label
          title={label}
          className="ml-px mr-2 cursor-default text-neutral-700"
        >
          {label}
        </label>
      </div>
      <div className="">
        <div className="w-full">
          <span className="">
            <input
              placeholder={placeholder}
              type={inputtype}
              name={name}
              // onChange={(e) => {
              // }}
              className={`${
                error ? "input-error" : ""
              } input-bordered input inline-block h-12 w-full appearance-none overflow-visible overflow-ellipsis bg-white bg-none py-1`}
              {...form}
            ></input>
            {error && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {error?.message}
                </span>
              </label>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InputField;
