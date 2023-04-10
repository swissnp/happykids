import React from "react";
import type {
  ICartItem,
  IViewCartResponse,
  IAddToCart,
} from "../lib/validation/cart";
import { isTRPCClientError } from "~/lib/validation/error";
import { useRouter } from "next/router";
import { useState } from "react";
import { error } from "console";
import { isError } from "@tanstack/react-query";
const CartInputField = ({
  onChange,
  item,
  ...props
}: {
  onChange: (data: IAddToCart) => Promise<IViewCartResponse>;
  item: ICartItem;
}) => {
    const router = useRouter();
    const [isError,setIsError] = useState(false);
  return (
    <input
      type="number"
      className={`input-bordered input mr-1 h-10 w-16 rounded-md bg-white pr-2 inline text-gray-500 ${isError ? 'input-error' : ''}` }
      inputMode="numeric"
      min="1"
      defaultValue={item.qty}
      max="20"
      onChange={async (e) => {
        try {
          await onChange({
            sku: item.sku,
            qty: parseInt(e.target.value),
            color: item.color,
            size: item.size,
            price: item.price,
            discountedPrice: item.discountedPrice,
            name: item.name,
          });
          setIsError(false)
        } catch (error) {
            setIsError(true);
          if (isTRPCClientError(error)) {
            if (error.data?.code === "UNAUTHORIZED") {
              await router.push({
                pathname: "/login",
                query: {
                  message: "Unauthorize, Please login first.",
                  redirect: router.asPath,
                },
              });
            }
          }
        }
      }}
    ></input>
  );
};
export default CartInputField;
