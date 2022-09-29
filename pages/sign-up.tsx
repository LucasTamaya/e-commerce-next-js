import type { NextPage } from "next";
import GoogleIcon from "@mui/icons-material/Google";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import SnackBar from "@/components/Common/SnackBar";

import {
  googleProvider,
  signInWithProvider,
  createUserWithEmailAndPasswordForm,
} from "src/firebase/firebase-config";
import { ILoginFormValues } from "src/interfaces";
import { loginValidationSchema } from "src/yupSchema";

const SignUp: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);

  const { control, handleSubmit } = useForm<ILoginFormValues>({
    resolver: yupResolver(loginValidationSchema),
  });

  const [_, setCookie] = useCookies(["userId"]);

  const router = useRouter();

  useEffect(() => {
    setOpenSnackBar(true);
  }, [error]);

  const handleSignUpWithEmailAndPassword = async (input: ILoginFormValues) => {
    setLoading(true);
    setError("");
    try {
      const { email, password } = input;

      const userId = await createUserWithEmailAndPasswordForm(email, password);

      localStorage.setItem("userId", userId);

      setCookie("userId", userId, {
        path: "/",
        maxAge: 24 * 60 * 60,
        sameSite: true, // change to false if bug on production
      });

      setLoading(false);
      router.push("/");
    } catch (err: any) {
      setLoading(false);
      if (err.message.indexOf("auth") === -1) {
        setError("Something went wrong during the request");
      } else {
        setError("User already exists");
      }
    }
  };
  const handleSignInWithProvider = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      const userId = await signInWithProvider(googleProvider);

      setCookie("userId", userId, {
        path: "/",
        maxAge: 24 * 60 * 60,
        sameSite: true, // change to false if bug on production
      });

      router.push("/");
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-y-12">
      <h1 className="text-main-red font-bold text-4xl">NextFoodApp</h1>

      <form
        className="border-2 border-gray-500 flex flex-col gap-y-5 p-10"
        onSubmit={handleSubmit(handleSignUpWithEmailAndPassword)}
      >
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <input
                value={value || ""}
                type="email"
                className="border-2 border-gray-500 px-4 py-2 rounded"
                placeholder="Email"
                onChange={onChange}
              />
              {!!error && (
                <p className="text-red-500 text-xs">{error.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <input
                value={value || ""}
                type="password"
                className="border-2 border-gray-500 px-4 py-2 rounded"
                placeholder="Password"
                onChange={onChange}
              />
              {!!error && (
                <p className="text-red-500 text-xs">{error.message}</p>
              )}
            </div>
          )}
        />

        <button className="bg-main-red w-full h-12 text-white flex flex-row items-center justify-center rounded-lg">
          {!loading ? <>Sign-up</> : <PulseLoader color="#fff" size={7} />}
        </button>

        <button
          onClick={handleSignInWithProvider}
          className="border-2 border-main-red w-full text-main-red font-bold p-3 rounded-lg flex flex-row items-center gap-x-2"
        >
          <GoogleIcon sx={{ fontWeight: 25, color: "#e63b60" }} />
          Continue with Google
        </button>
        <p className="text-xs">
          Already have an account ?{" "}
          <span className="text-main-red">
            <Link href="/sign-in">Sign-In</Link>
          </span>
        </p>
      </form>

      {error && (
        <SnackBar
          openSnackBar={openSnackBar}
          setOpenSnackBar={setOpenSnackBar}
          severity="error"
          message={error}
        />
      )}
    </div>
  );
};

export default SignUp;
