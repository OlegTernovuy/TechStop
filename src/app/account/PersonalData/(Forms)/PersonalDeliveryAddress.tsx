"use client";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import { DeliveryAddressData } from "@/constants";
import HomeDelivery from "../(DeliveryAddressForms)/HomeDelivery";

const PersonalDeliveryAddress = () => {
  const [selected, setSelected] = useState(null);

  const toggle = (i: any) => {
    if (selected === i) {
      return setSelected(null);
    }
    return setSelected(i);
  };

  return (
    <div className="mb-6 w-full">
      <h2 className="text-Headline5 md:text-Headline4 text-TechStopBlue mb-6">
        Адреса доставки
      </h2>
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <FormControl sx={{ width: "100%" }}>
          <RadioGroup className="gap-6 md:gap-8">
            {DeliveryAddressData?.map((item, i) => {
              return (
                <div
                  className={`w-full px-3 border-TechStopBlue40 border rounded items-center ${
                    selected === i ? "h-auto" : "h-14"
                  }`}
                  key={item.id}
                >
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
                    className={"w-full h-14 text-TechStopBlue60"}
                    label={item.title}
                    sx={{
                      ".css-ahj2mt-MuiTypography-root": {
                        fontSize: "16px",
                        fontWeight: "400",
                        paddingLeft: "8px",
                      },
                    }}
                  />
                  <div
                    className={
                      selected === i ? "h-auto mb-4" : "max-h-0 overflow-hidden"
                    }
                  >
                    {item.id === 1 && <HomeDelivery />}
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
