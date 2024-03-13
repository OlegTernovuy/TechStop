import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DeliveryValidationsSchema } from "../utils/ValidationsSchema";
import { IDeliveryContent } from "@/types";
import ButtonCatalog from "@/components/ui/ButtonCatalog";

interface formDat {
  formDeliveryData: FormData;
  toggle: (i: any) => void;
}

const DeliveryMethod = ({ formDeliveryData, toggle }: formDat) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IDeliveryContent>({
    defaultValues: {
      city: "",
      postOffice: "",
    },
    resolver: yupResolver(DeliveryValidationsSchema),
  });
  const checkIsDelivery = (formValues: IDeliveryContent) => {
    Object.entries(formValues).forEach(([key, value]) => {
      if (typeof value === "undefined") return;
      formDeliveryData.set(key, value);
    });
  };

  const submitFields: SubmitHandler<IDeliveryContent> = (contact) => {
    try {
      checkIsDelivery(contact);
      console.log(
        // formDeliveryData.get("postOffice"),
        // formDeliveryData.get("city")
      );
      toggle(2);
    } catch (error: any) {
      console.error("Error post user: ", error);
      throw error;
    }
  };

  return (
    <form
      className="mb-4 flex flex-col gap-4"
      onSubmit={handleSubmit(submitFields)}
    >
      <FormControl fullWidth error={!!errors?.city}>
        <InputLabel id="demo-simple-select-label">Ваше місто</InputLabel>
        <Controller
          control={control}
          name="city"
          render={({ field }) => (
            <Select
              label="City"
              onChange={(e) => field.onChange(e)}
              value={field.value}
            >
              <MenuItem value={"Kyiv"}>Київ</MenuItem>
              <MenuItem value={"Odesa"}>Одеса</MenuItem>
              <MenuItem value={"Lviv"}>Львів</MenuItem>
            </Select>
          )}
        />
      </FormControl>
      <FormControl fullWidth error={!!errors?.postOffice}>
        <InputLabel id="demo-simple-select-label">Нова пошта</InputLabel>
        <Controller
          control={control}
          name="postOffice"
          render={({ field }) => (
            <Select
              label="postOffice"
              onChange={(e) => field.onChange(e)}
              value={field.value}
            >
              <MenuItem value={"1"}>1</MenuItem>
              <MenuItem value={"2"}>2</MenuItem>
              <MenuItem value={"3"}>3</MenuItem>
            </Select>
          )}
        />
      </FormControl>
      <ButtonCatalog
        stylesButton="w-full md:w-[358px] bg-TechStopBlue text-TechStopWhite uppercase"
        title="продовжити"
      />
    </form>
  );
};

export default DeliveryMethod;
