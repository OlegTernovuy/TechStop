"use client";

import { useLoginModalStore } from "@/store/modalStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CloseIcon from "../../../public/CloseIcon.svg";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import TechLogo from "../../../public/TechLogo.svg";
import googleIcon from "../../../public/googleIcon.svg";
import LoginForm from "./LoginForm";
import axios from "axios";

const AuthModal = () => {
  const showLoginModal = useLoginModalStore((state) => state.showLoginModal);
  const setShowLoginModal = useLoginModalStore(
    (state) => state.setShowLoginModal
  );

  useEffect(() => {
    const closeShoppingCartModal = (e: KeyboardEvent) => {
      if (e.code == "Escape" && showLoginModal) {
        setShowLoginModal();
      }
    };
    window.addEventListener("keyup", closeShoppingCartModal);
    if (showLoginModal) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
    return () => {
      window.removeEventListener("keyup", closeShoppingCartModal);
      enableBodyScroll(document.body);
    };
  }, [showLoginModal]);

  const [showLoginForm, setShowLoginForm] = useState(true);
  const [pending, setPending] = useState(false);

  const googleAuth = async () => {
    try {
      const res = await axios.get(`${process.env.BASE_URL}/google`);
      if (res.status !== 200) {
        throw new Error("Something went wrong");
      }

      return res.data;
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return (
    <>
      <div
        className={
          showLoginModal
            ? "fixed lg:absolute lg:top-[162px] mx-auto p-4 lg:p-10 inset-0 bg-white overflow-y-auto h-full w-full z-10 lg:max-w-[560px] lg:h-min lg:max-h-[648px] lg:rounded-lg flex flex-col text-TechStopBlue"
            : "hidden"
        }
      >
        <div className="flex justify-between mb-20">
          <h3 className="hidden lg:flex text-Headline3 text-TechStopBlue">
            {showLoginForm ? "Вхід" : "Реєстрація"}
          </h3>
          <Image
            src={TechLogo}
            alt="TechLogo"
            width={66}
            height={51}
            className="lg:hidden"
          />
          <button onClick={setShowLoginModal}>
            <Image src={CloseIcon} alt="close" width={24} height={24} />
          </button>
        </div>
        <div>
          <h3 className="flex justify-center lg:hidden text-Headline5 text-TechStopBlue mb-6">
            Вхід
          </h3>
          <LoginForm showLoginForm={showLoginForm} setPending={setPending} />
          <div className="w-full flex justify-between items-center mt-14 mb-6 text-TechStopBlue60 text-Headline6">
            <span className="w-full h-[1px] bg-TechStopBlue60"></span>
            <span className="px-4">або</span>
            <span className="w-full h-[1px] bg-TechStopBlue60"></span>
          </div>
          <button
            className="h-[52px] w-full flex justify-center items-center gap-2 py-2 mb-4 border border-TechStopBlue60 rounded"
            onClick={googleAuth}
          >
            <Image src={googleIcon} alt="googleIcon" width={24} height={24} />
            <span className="text-[15px] text-TechStopBlue tracking-wide font-medium uppercase">
              google
            </span>
          </button>
          <div className="text-Headline6">
            {showLoginForm ? (
              <p className="flex items-center gap-4">
                Немає профілю?
                <button
                  className="h-[52px] flex justify-center items-center p-2"
                  onClick={() => setShowLoginForm(false)}
                >
                  Register
                </button>
              </p>
            ) : (
              <p className="flex items-center gap-4">
                Вже є профіль?
                <button
                  className="h-[52px] flex justify-center items-center p-2"
                  onClick={() => setShowLoginForm(true)}
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
      <div
        className={
          showLoginModal
            ? `fixed top-0 left-0 bg-black bg-opacity-30 h-screen w-full ${
                pending ? "z-50" : ""
              } `
            : "hidden"
        }
        onClick={() => {
          if (pending === false) setShowLoginModal();
        }}
      ></div>
    </>
  );
};

export default AuthModal;
