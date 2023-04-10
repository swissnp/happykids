import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { ICartItem } from "~/lib/validation/cart";
import { Result } from "postcss";

const Header = () => {
  const { data: session } = useSession();
  const cart = api.cart.view.useQuery().data?.detail.cart_list;


  return (
    <div className="navbar w-full rounded-2xl bg-base-100 drop-shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a>Shop Collection</a>
            </li>
            <li>
              <a className="justify-between">Our Story</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
          </ul>
        </div>
        <Link className="btn-ghost btn text-xl normal-case" href="/">
          {"😀Kids"}
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Shop Collection</a>
          </li>
          <li>
            <a>Our Story</a>
          </li>
          <li>
            <a>Contact</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end mr-2">
        <div className="flex w-10 flex-row justify-end">
          <label tabIndex={0} className="btn-ghost btn-circle btn flex px-3">
            <Link className="indicator" href={"/cart"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cart && (
                <span className="badge badge-sm indicator-item">
                  {cart.length}
                </span>
              )}
            </Link>
          </label>
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="dropdown btn-ghost btn-circle btn flex px-3"
            >
              {/*  account button begin */}
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </label>{" "}
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact relative mt-3 w-52 bg-base-100 p-2 shadow"
            >
              {!session ? (
                <div>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                  <li>
                    <Link href="/register">Register</Link>
                  </li>
                </div>
              ) : (
                <li>
                  <button onClick={() => signOut()}>Sign out</button>
                </li>
              )}
            </ul>
          </div>
          {/*  account button end */}
        </div>
      </div>
    </div>
  );
};
export default Header;
