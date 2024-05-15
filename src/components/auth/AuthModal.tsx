"use client";

import { useLoginModalStore } from "@/store/modalStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CloseIcon from "../../../public/CloseIcon.svg";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import TechLogo from "../../../public/TechLogo.svg";
import LoginForm from "./LoginForm";

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
            Вхід
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
          <LoginForm showLoginForm={showLoginForm} />
          <div>
            {showLoginForm ? (
              <p>
                Dont have accout{" "}
                <button onClick={() => setShowLoginForm(false)}>
                  Register
                </button>
              </p>
            ) : (
              <p>
                Already have account{" "}
                <button onClick={() => setShowLoginForm(true)}>Login</button>
              </p>
            )}
          </div>
        </div>
      </div>
      <div
        className={
          showLoginModal
            ? "fixed top-0 left-0 bg-black bg-opacity-30 h-screen w-full"
            : "hidden"
        }
        onClick={setShowLoginModal}
      ></div>
    </>
  );
};

export default AuthModal;
