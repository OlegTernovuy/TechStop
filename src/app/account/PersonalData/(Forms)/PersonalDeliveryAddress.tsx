"use client";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { CustomTextField } from "./PersonalContactInfo";
import { useState } from "react";
import { DeliveryAddressData } from "@/constants";
import Image from "next/image";
import HomeDelivery from "../(DeliveryAddressForms)/HomeDelivery";
import NovaPostDelivery from "../(DeliveryAddressForms)/NovaPostDelivery";
import UkrPostDelivery from "../(DeliveryAddressForms)/UkrPostDelivery";

const PersonalDeliveryAddress = () => {
  const [selected, setSelected] = useState(null);

  const toggle = (i: any) => {
    if (selected === i) {
      return setSelected(null);
    }
    return setSelected(i);
  };

  const classes = CustomTextField();

  return (
    <div>
      <h2 className="text-Headline5 md:text-Headline4 text-TechStopBlue mb-6">
        Адреса доставки
      </h2>
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <FormControl sx={{ width: "100%" }}>
          <RadioGroup className="gap-6 md:gap-8">
            {DeliveryAddressData?.map((item, i) => {
              return (
                <div key={item.id}>
                  <FormControlLabel
                    control={
                      <Radio
                        value={item.title}
                        size="medium"
                        sx={{
                          "& svg": { width: "24px", height: "24px" },
                          color: "#02275099",
                          "&.Mui-checked": {
                            color: "#02275099",
                          },
                        }}
                        onClick={() => toggle(i)}
                      />
                    }
                    className={"w-full text-TechStopBlue60"}
                    label={
                      item.id === 1 ? (
                        item.title
                      ) : (
                        <>
                          <Image
                            src={item.icon}
                            alt="Icon"
                            width={item.id === 2 ? 140 : 180}
                            height={50}
                            className="pl-4 min-h-[50px]"
                          />
                        </>
                      )
                    }
                    sx={{
                      ".css-ahj2mt-MuiTypography-root": {
                        fontSize: "20px",
                        fontWeight: "500",
                      },
                    }}
                  />
                  <div
                    className={
                      selected === i ? "h-auto" : "max-h-0 overflow-hidden"
                    }
                  >
                    {item.id === 1 ? (
                      <HomeDelivery />
                    ) : item.id === 2 ? (
                      <NovaPostDelivery />
                    ) : (
                      <UkrPostDelivery />
                    )}
                  </div>
                </div>
              );
            })}
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default PersonalDeliveryAddress;
