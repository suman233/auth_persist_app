export const baseUrl = process.env.NEXT_APP_BASE_URL;
export const baseUrlApi = `${process.env.NEXT_APP_BASE_URL}/api/`;
export const baseUrlMedia = process.env.NEXT_APP_BASE_URL;

// api doc => https://militarymoves-admin.dedicateddevelopers.us/apidoc

export const mediaUrl = (url: string) => {
  return `${baseUrlMedia}/uploads/${url}`;
};

export const endpoints = {
  auth: {
    signup: "user/signup",
    socialSignup: "user/socialSignUp",
    login: "user/signin",
    profileDetails: "user/profile",
    profileUpdate: "user/profile/update"
  },
  cms: {
    about: "aboutpolicy/details",
    faq: "faq/all"
  }
};

export const sucessNotificationEndPoints = [
  endpoints.auth.signup,
  // endpoints.auth.signUpProfile,
  endpoints.auth.login,
  endpoints.auth.profileUpdate
];
