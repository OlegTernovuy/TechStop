"use client";

import Button from "@/components/ui/Button";
import { productFilters } from "@/constants";
import { IBrandFilter, useFilterStore } from "@/store/useFiltersStore";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import NoSsr from "../utils/NoSsr";
import { useState } from "react";

const FitlersForProducts = () => {
  const { addProductBrandFilter, checkBrandFilter, priceFilter, setPriceFilter } =
    useFilterStore();

  const addPriceFilter = (priceFrom = 100, priceTo = 10000) => {
    setPriceFilter(priceFrom, priceTo);
  };

  const addBrandFilter = (filterBrand: IBrandFilter) => {
    addProductBrandFilter(filterBrand);
  };

  const [priceFromValue, setPriceFromValue] = useState<number>()
  const [priceToValue, setPriceToValue] = useState<number>()

  const handleSetpriceFromValue = (priceFromValue: number) => {
    setPriceFromValue(priceFromValue);
  }

  const handleSetpriceToValue = (priceToValue: number) => {
    setPriceToValue(priceToValue);
  }

  return (
    <aside className="hidden md:flex min-h-screen min-w-80 pt-8 pr-6 border-r-[1px] border-r-TechStopBlue40">
      <div className="flex flex-col">
        <div className="mb-10">
          <h4 className="text-Headline5 text-TechStopBlue mb-6">Ціна</h4>
          <div className="flex items-center gap-4 text-TechStopBlue60">
            <span>від</span>
            <TextField
              variant="outlined"
              type="number"
              value={priceFilter.priceFrom !== undefined ? priceFilter.priceFrom : priceFromValue}
              onChange={(e) => handleSetpriceFromValue(Number(e.target.value))}
              placeholder="100"
              className="max-w-24"
            />
            <span>до</span>
            <TextField
              variant="outlined"
              type="number"
              value={priceFilter.priceTo !== undefined ? priceFilter.priceTo : priceToValue}
              onChange={(e) => handleSetpriceToValue(Number(e.target.value))}
              placeholder="12 500"
              className="max-w-24"
            />
          </div>
        </div>
        <div className="mb-14">
          <h4 className="text-Headline5 text-TechStopBlue mb-6">Бренд</h4>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              {productFilters.length > 0
                ? productFilters.map((filter) => {
                    return (
                      <FormControlLabel
                        key={filter.brandId}
                        control={
                          <NoSsr>
                            <Checkbox
                              checked={Boolean(
                                checkBrandFilter(filter.brandId)
                              )}
                              name={filter.brandTitle}
                              sx={{ color: "#02275099" }}
                              onChange={() => addBrandFilter(filter)}
                            />
                          </NoSsr>
                        }
                        label={filter.brandTitle}
                        className="text-body1 text-TechStopBlue"
                        sx={{ marginLeft: "12px" }}
                      />
                    );
                  })
                : null}
            </FormGroup>
          </FormControl>
        </div>
        <Button
          stylesButton="w-full md:w-[296px] bg-TechStopBlue text-TechStopWhite uppercase"
          title="Застосувати"
          onClick={() => addPriceFilter(priceFromValue, priceToValue)}
        />
      </div>
    </aside>
  );
};

export default FitlersForProducts;
