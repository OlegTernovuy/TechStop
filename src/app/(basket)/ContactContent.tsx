import { TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactValidationsSchema } from "../utils/ValidationsSchema";
import { IContactContent } from "@/types";
import ButtonCatalog from "@/components/ui/ButtonCatalog";
import { useState } from "react";
import { IAdd } from "./ContactInfoOrder";

interface formDat {
  formContactData: FormData;
  toggle: (i: any) => void;
  setAdd: React.Dispatch<React.SetStateAction<IAdd>>;
}

const ContactContent = ({ formContactData, toggle, setAdd }: formDat) => {
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

  // interface IAdd {
  //   [key: string]: string; // або вкажіть більше типів, якщо є потреба
  // }

  // const [add, setAdd] = useState<IAdd>({})

  // const checkIsContact = (formValues: IContactContent) => {
  //   Object.entries(formValues).forEach(([key, value]) => {
  //     if (typeof value === "undefined") return;
  //     formContactData.set(key, value);
  //   });
  // };
  const checkIsContact = (formValues: IContactContent) => {
    setAdd((prevAdd) => {
      const updatedAdd = { ...prevAdd };
      Object.entries(formValues).forEach(([key, value]) => {
        if (typeof value !== "undefined") {
          updatedAdd[key] = value;
        }
      });
      return updatedAdd;
    });
  };

  const submitFields: SubmitHandler<IContactContent> = (contact) => {
    try {
      // console.log(contact);
      
      checkIsContact(contact);
      // console.log(add);
      
      // console.log(formContactData.entries());
      toggle(1);
    } catch (error: any) {
      console.error("Error post user: ", error);
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit(submitFields)}>
      <div>
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
              className="w-full md:w-80 mr-4 mb-4"
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
              className="w-full md:w-80 mr-4 mb-4"
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

        <br />
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
              className="w-full md:w-80 mr-4 mb-4"
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

        <div className="pb-6 pl-3">
          <Controller
            control={control}
            name="anotherPersonReceive"
            render={({ field }) => (
              <Checkbox
                onChange={(e) => field.onChange(e)}
                value={field.value}
              />
            )}
          />
          <span className="text-Headline6 text-TechStopBlue60 pl-3">
            Отримувати буде інша людина
          </span>
        </div>
      </div>
      <ButtonCatalog
        stylesButton="w-full md:w-[358px] bg-TechStopBlue text-TechStopWhite uppercase"
        title="продовжити"
      />
    </form>
  );
};

export default ContactContent;
