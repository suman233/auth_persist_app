import validationText from "@/json/messages/validationText";
import { emailRegex } from "@/lib/functions/_helpers.lib";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Link from "next/link";
import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { LFormInput } from "@/interface/common.interface";
import { useForm } from "react-hook-form";
import { loginMutation } from "@/api/functions/user.api";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { setAccessToken, setUserData } from "@/reduxtoolkit/slices/userSlice";
import { setCookie } from "cookies-next";

const loginschema = yup
  .object({
    email: yup
      .string()
      .trim()
      .required(validationText.error.enter_email)
      .matches(emailRegex, validationText.error.email_format),
    password: yup.string().required(validationText.error.enter_password)
    // deviceToken: yup.string().nullable()
  })
  .required();

export type logSchema = yup.InferType<typeof loginschema>;

const login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<LFormInput>({
    resolver: yupResolver(loginschema)
  });

  const { isLoggedIn } = useAppSelector((s) => s.userSlice);

  const { mutate, data, error } = useMutation({
    mutationFn: loginMutation
  });

  const onSubmit = (data: logSchema) => {
    console.log("logged", data);

    mutate(
      { ...data },
      {
        onSuccess: (resp) => {
          // reset();
          if (resp.data.status === 200) {
            // console.log("signed", data);
            if (resp?.data) {
              const { access, ...userData } = resp.data;
              toast.success(resp?.data?.message);
              setCookie("token", userData.token);
              setCookie("userdata", JSON.stringify(userData));
              console.log("Token:-", userData.token);
              dispatch(setAccessToken(userData.token));
              dispatch(setUserData(userData));
              router.push("/auth/profile");
            }
          }
        }
      }
    );
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  if (data?.status === 400) {
    // @ts-ignore
    toast.error(data.data.message);
  }
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center" }}>
        Login Form
      </Typography>

      <Box
        component={"form"}
        width={"50%"}
        sx={{ margin: "auto" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputFieldCommon
          type="text"
          label="Email"
          sx={{ my: 2 }}
          {...register("email")}
        />
        <InputFieldCommon
          type="password"
          label="Password"
          sx={{ mb: 2 }}
          {...register("password")}
        />

        <CustomButtonPrimary
          type="submit"
          variant="contained"
          color="primary"
          sx={{ m: "auto" }}
        >
          Login
        </CustomButtonPrimary>
      </Box>

      <Typography sx={{ textAlign: "center", my: 2 }}>
        Don't have an account!!&nbsp;
        <Link href="/auth/register">Create account here</Link>
      </Typography>
    </Container>
  );
};

export default login;