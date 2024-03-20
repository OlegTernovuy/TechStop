import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { paymentsMethods } from "@/constants";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IPayMethodContent, formDat } from "@/types";
import { PayMethodValidationsSchema } from "../utils/ValidationsSchema";
import { checkIsContact } from "../utils/CheckIsData";

const PaymentMethod = ({ setOrderContactData, toggle }: formDat) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IPayMethodContent>({
    defaultValues: {
      payMethod_id: "",
    },
    resolver: yupResolver(PayMethodValidationsSchema),
  });

  const submitFields = handleSubmit((contact) => {
    try {
      checkIsContact({ ...contact }, setOrderContactData);
      toggle(null);
    } catch (error: any) {
      console.error("Error post user: ", error);
      throw error;
    }
  });

  return (
    <form>
      <FormControl sx={{ width: "100%" }}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          className="gap-4"
        >
          {paymentsMethods?.map((methods) => {
            return (
              <Controller
                control={control}
                name="payMethod_id"
                key={methods.id}
                render={({ field }) => (
                  <div className="h-14 w-full px-3 border-TechStopBlue40 border-[2px] rounded flex items-center">
                    <FormControlLabel
                      control={
                        <Radio
                          value={methods.title}
                          onChange={(e) => {
                            field.onChange(e);
                            setTimeout(() => submitFields(), 100); // Затримка перед викликом
                          }}
                          size="medium"
                          sx={{
                            "& svg": { width: "24px", height: "24px" },
                            color: "#02275099",
                            "&.Mui-checked": {
                              color: "#02275099",
                            },
                          }}
                        />
                      }
                      className={"text-TechStopBlue60"}
                      label={methods.title}
                    />
                  </div>
                )}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </form>
  );
};

export default PaymentMethod;
