import type { NextPage } from "next";
import GoogleIcon from "@mui/icons-material/Google";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { MouseEvent, useState, useEffect } from "react";
import Link from "next/link";
import PulseLoader from "react-spinners/PulseLoader";

import {
  googleProvider,
  signInWithProvider,
  signInWithEmailAndPasswordForm,
} from "../src/firebase/firebase-config";
import { ILoginFormValues } from "src/interfaces";
import { loginValidationSchema } from "src/yupSchema";
import SnackBar from "@/components/Common/SnackBar";
import { setCookieOnAuth } from "src/utils/setCookie";
import HeadStructure from "@/components/Common/HeadStructure";

const SignIn: NextPage = () => {
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

  const handleSignInWithEmailAndPassword = async (input: ILoginFormValues) => {
    setLoading(true);
    setError("");
    try {
      const { email, password } = input;
      const userId = await signInWithEmailAndPasswordForm(email, password);
      // create a cookie
      setCookieOnAuth(userId, setCookie);
      setLoading(false);
      router.push("/");
    } catch (err: any) {
      setLoading(false);
      if (err.message.indexOf("auth") === -1) {
        setError("Something went wrong during the request");
      } else {
        setError("Wrong email or password");
      }
    }
  };

  const handleSignInWithProvider = async (e: MouseEvent) => {
    setLoading(true);
    setError("");
    e.preventDefault();
    try {
      const userId = await signInWithProvider(googleProvider);
      setCookieOnAuth(userId, setCookie);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <HeadStructure
        title="NextFoodApp - Sign In"
        content="Sign In to discover one of the best Web Food App in the world"
      />

      <main className="w-full h-screen flex flex-col justify-center items-center gap-y-12">
        <h1 className="text-main-red font-bold text-4xl">NextFoodApp</h1>

        <form
          className="border-2 border-gray-500 rounded flex flex-col gap-y-5 p-10"
          onSubmit={handleSubmit(handleSignInWithEmailAndPassword)}
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
            {!loading ? <>Sign-in</> : <PulseLoader color="#fff" size={7} />}
          </button>

          <button
            onClick={handleSignInWithProvider}
            className="border-2 border-main-red w-full text-main-red font-bold p-3 rounded-lg flex flex-row items-center gap-x-2"
          >
            <GoogleIcon sx={{ fontWeight: 25, color: "#e63b60" }} />
            Continue with Google
          </button>
          <p className="text-xs">
            Don&apos;t have an account ?{" "}
            <span className="text-main-red">
              <Link href="/sign-up">Sign-Up</Link>
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
      </main>
    </>
  );
};

export default SignIn;
