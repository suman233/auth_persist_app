import { BaseApiResponse, LFormInput } from './../../typescript/interface/common.interface';
import { IFormInput } from "@/interface/common.interface";

import { IgetSignUpQuery } from "@/interface/apiresp.interfaces";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";
import { logSchema } from 'pages/auth/login';

export const signUpMutation = async (body: IFormInput) => {
  const res = await axiosInstance.post(
    endpoints.auth.signup,
    body
  );
  return res;
};
export const loginMutation = async (body: logSchema) => {
  const res = await axiosInstance.post(
    endpoints.auth.login,
    body
  );
  return res;
};
export const GetProfileDetails = async () => {
  const res = await axiosInstance.get<IgetSignUpQuery>(
    endpoints.auth.profileDetails
  );
  return res;
};
// export const signUpProfileMutation = async (body: IFormInput) => {
//   const res = await axiosInstance.post<IgetSignUpQuery>(
//     endpoints.auth.signUpProfile,
//     body
//   );
//   return res;
// };
