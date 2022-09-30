export const setCookieOnAuth = (userId: string, setCookie: any) => {
  setCookie("userId", userId, {
    path: "/",
    maxAge: 24 * 60 * 60,
    sameSite: true, // change to false if bug on production
  });
};
