import Image from "next/image";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ThreeDotsSymbolMobile from "./ThreeDotsSymbolMobile";

const ProductInCard = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full">
        <Image
          src="/shoppingCardItemTest.svg"
          alt="shoppingCardItem"
          width={210}
          height={320}
          className="w-[104px] h-[158px] md:w-[210px] md:h-[320px]"
        />
        <div className="flex flex-col w-full justify-between pl-6">
          <div className="flex">
            <p className="text-sm text-[14px] leading-5 md:text-body1">
              Дуже довга назва товару з якимись цифрами HTG-7658
            </p>
            <div className="md:hidden">
              <ThreeDotsSymbolMobile />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="hidden md:flex">
              <Button
                variant="text"
                size="large"
                startIcon={<DeleteIcon />}
                sx={{ color: "#04C2C2" }}
              >
                Видалити
              </Button>
            </div>
            <div className="flex items-center md:gap-8 justify-between w-full md:w-auto">
              <div className="flex items-center">
                <button>
                  <Image
                    src="/removeFilled.svg"
                    alt="removeFilled"
                    width={18}
                    height={18}
                  />
                </button>
                <input
                  type="text"
                  name="count"
                  defaultValue={1}
                  readOnly
                  className="w-12 h-10 mx-3 border-2 rounded-md border-slate-300 text-center"
                  width={48}
                  height={40}
                />
                <button>
                  <Image
                    src="/addFilled.svg"
                    alt="addFilled"
                    width={18}
                    height={18}
                  />
                </button>
              </div>
              <div className="flex flex-col md:gap-2 items-end">
                <span className="text-xs text-[#26262680] md:text-deWiseBlack md:text-[20px] md:font-medium md:leading-8 line-through">
                  28 999
                </span>
                <span className="text-deWiseRed text-subtitle1 md:text-Headline4">
                  19 999
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInCard;
