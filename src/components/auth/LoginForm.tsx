"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IAuthData } from "@/types";
import { AuthValidationsSchema } from "./AuthValidationsSchema";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Button from "../ui/Button";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { signIn } from "next-auth/react";
import { useLoginModalStore } from "@/store/modalStore";

interface IAuthModal {
  showLoginForm: boolean;
}

const LoginForm = ({ showLoginForm }: IAuthModal) => {
  const setShowLoginModal = useLoginModalStore(
    (state) => state.setShowLoginModal
  );
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IAuthData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(AuthValidationsSchema),
  });

  const BASE_URL = "https://team-project-server-41ev.onrender.com/api";

  const submitFields: SubmitHandler<IAuthData> = async (authData) => {
    let email = authData.email;
    let password = authData.password;
    if (showLoginForm) {
      let login = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (login?.error === null) {
        setShowLoginModal();
        serServerError({
          userError: "",
          passwordError: "",
        });
        reset();
      } else {
        if (login?.error === "Password are not valid")
          serServerError({
            userError: "",
            passwordError: "Password are not valid",
          });
        else if (login?.error === "User not found")
          serServerError({
            userError: "User not found",
            passwordError: "",
          });
        else if (login?.error === "Bad Request Exception")
          serServerError({
            userError: "Bad Request Exception",
            passwordError: "Bad Request Exception",
          });
      }
    } else {
      const res = await fetch(BASE_URL + "/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setShowLoginModal();
        serServerError({
          userError: "",
          passwordError: "",
        });
        reset();
      } else if (!res.ok) {
        const errorResponse = await res.json();
        if (errorResponse?.message === "Bad Request Exception")
          serServerError({
            userError: "Bad Request Exception",
            passwordError: "Bad Request Exception",
          });
        else if (errorResponse?.message === "E-mail already in use")
          serServerError({
            userError: "E-mail already in use",
            passwordError: "",
          });
        return;
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, serServerError] = useState({
    userError: "",
    passwordError: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(submitFields)}>
      <div className="flex flex-col w-full gap-4">
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              label="Електронна пошта"
              variant="outlined"
              placeholder="example@gmail.com"
              error={!!errors?.email || !!serverError.userError}
              helperText={errors.email?.message || serverError.userError}
              onChange={(e) => field.onChange(e)}
              value={field.value}
              className="w-full"
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
          name="password"
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Пароль"
              placeholder="password"
              type={showPassword ? "text" : "password"}
              error={!!errors?.password || !!serverError.passwordError}
              helperText={
                errors?.password?.message || serverError.passwordError
              }
              onChange={(e) => field.onChange(e)}
              value={field.value}
              className="w-full"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
        <Button
          title={showLoginForm ? "увійти" : "зареєструватися"}
          stylesButton="bg-TechStopBlue text-white mt-2"
        />
      </div>
    </form>
  );
};

export default LoginForm;
