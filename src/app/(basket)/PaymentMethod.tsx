import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { paymentsMethods } from "@/constants";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IPayMethodContent } from "@/types";
import { PayMethodValidationsSchema } from "../utils/ValidationsSchema";

interface formDat {
  formPayData: FormData;
}

const PaymentMethod = ({ formPayData }: formDat) => {
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm<IPayMethodContent>({
    defaultValues: {
      payMethod_id: undefined,
    },
    resolver: yupResolver(PayMethodValidationsSchema),
  });
  const checkIsPayMethod = (formValues: IPayMethodContent) => {
    Object.entries(formValues).forEach(([key, value]) => {
      if (typeof value === "undefined") return;
      formPayData.set(key, value);
    });
  };

  const submitFields = handleSubmit((contact) => {
    try {
      // console.log(contact);

      checkIsPayMethod(contact);
      // console.log(formPayData.get("payMethod_id"));
    } catch (error: any) {
      console.error("Error post user: ", error);
      throw error;
    }
  })

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
                  <div className="h-14 w-full px-3 text-TechStopBlue60 border-TechStopBlue40 border-[2px] rounded flex items-center">
                    <FormControlLabel
                      value={methods.id}
                      control={
                        <Radio
                          onChange={(e) =>{
                            field.onChange(e)
                            setTimeout(() => submitFields(), 100); // Затримка перед викликом
                          }}
                          sx={{
                            color: '#022750',
                            '&.Mui-checked': {
                              color: '#022750',
                            },
                          }}
                        />
                      }
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
