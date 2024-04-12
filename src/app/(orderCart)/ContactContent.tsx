import { TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactValidationsSchema } from "../utils/ValidationsSchema";
import { IContactContent, formDat } from "@/types";
import Button from "@/components/ui/Button";
import { checkIsContact } from "../utils/CheckIsData";

const ContactContent = ({ toggle, setOrderContactData }: formDat) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IContactContent>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      anotherPersonReceive: false,
    },
    resolver: yupResolver(ContactValidationsSchema),
  });

  const submitFields: SubmitHandler<IContactContent> = (contact) => {
    try {
      checkIsContact({ ...contact }, setOrderContactData);
      toggle(1);
    } catch (error: any) {
      console.error("Error post user: ", error);
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit(submitFields)}>
      <div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <TextField
                  label="Номер телефону"
                  variant="outlined"
                  placeholder="+38 - ( ) -   - -"
                  error={!!errors?.phone}
                  helperText={errors.phone?.message}
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  className="w-full md:w-80"
                  sx={{
                    "& label": {
                      color: "#02275099",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#02275099",
                      },
                    },
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  label="Ім'я"
                  placeholder="Степан"
                  error={!!errors?.name}
                  helperText={errors?.name?.message}
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  className="w-full md:w-80"
                  sx={{
                    "& label": {
                      color: "#02275099",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#02275099",
                      },
                    },
                  }}
                />
              )}
            />
          </div>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                variant="outlined"
                label="Email"
                placeholder="example@email.com"
                error={!!errors?.email}
                helperText={errors?.email?.message}
                onChange={(e) => field.onChange(e)}
                value={field.value}
                className="w-full md:w-80"
                sx={{
                  "& label": {
                    color: "#02275099",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#02275099",
                    },
                  },
                }}
              />
            )}
          />
        </div>

        <div className="flex items-center py-4">
          <div className="max-w-6">
            <Controller
              control={control}
              name="anotherPersonReceive"
              render={({ field }) => (
                <Checkbox
                  size="medium"
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  sx={{
                    "& svg": { width: "24px", height: "24px" },
                    color: "#02275099",
                  }}
                />
              )}
            />
          </div>
          <span className="text-Headline6 text-TechStopBlue60 pl-3">
            Отримувати буде інша людина
          </span>
        </div>
      </div>
      <Button
        stylesButton="w-full md:w-[358px] bg-TechStopBlue text-TechStopWhite uppercase"
        title="продовжити"
      />
    </form>
  );
};

export default ContactContent;
