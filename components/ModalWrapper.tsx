"use client";

import CloseIcon from "@mui/icons-material/Close";
import { useRouter, useSearchParams } from "next/navigation";
import { IModal } from "../types";

export default function ModalWrapper({ children, title, search }: IModal) {
  const searchParams = useSearchParams();
  const show = searchParams.get(search);

  const router = useRouter();
  return (
    show && (
      <div className="fixed inset-0 bg-white overflow-y-auto h-full w-full md:max-w-[960px] md:h-min md:max-h-[760px] m-auto md:rounded-lg flex flex-col text-black divide-y divide-slate-300">
        <div className="flex justify-between p-4">
          <h3 className="text-Headline5 text-deWiseBlack">{title}</h3>
          <button onClick={router.back}>
            <CloseIcon fontSize="medium" />
          </button>
        </div>
        <div className="text-deWiseBlack">{children}</div>
      </div>
    )
  );
}
