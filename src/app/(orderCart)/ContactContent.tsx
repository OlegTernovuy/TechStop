import { TextField } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactValidationsSchema } from "../utils/ValidationsSchema";
import { IContactContent, formDat } from "@/types";
import Button from "@/components/ui/Button";
import { checkIsContact } from "../utils/CheckIsData";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const ContactContent = ({ toggle, setOrderContactData }: formDat) => {
  const { data: session } = useSession();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IContactContent>({
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
    },
    resolver: yupResolver(ContactValidationsSchema),
  });

  useEffect(() => {
    if (session !== null) {
      reset({
        name: session?.user?.first_name,
        surname: session?.user?.last_name,
        email: session?.user?.email,
        phone: session?.user?.phone_number,
      });
    }
  }, [reset, session]);

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
        <div className="flex flex-col gap-4 mb-4 md:mb-10">
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
          <Controller
            control={control}
            name="surname"
            render={({ field }) => (
              <TextField
                variant="outlined"
                label="Прізвище"
                placeholder="Бандера"
                error={!!errors?.surname}
                helperText={errors?.surname?.message}
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
      </div>
      <Button
        stylesButton="w-full md:w-[358px] bg-TechStopBlue text-TechStopWhite uppercase"
        title="продовжити"
      />
    </form>
  );
};

export default ContactContent;
