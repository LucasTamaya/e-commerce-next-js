import { number } from "yup";

export interface IProduct {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: IRating;
  title: string;
}

export interface IRating {
  rate: number;
  count: number;
}

export interface IProductCard {
  id: number;
  image: string;
  price: number;
  title: string;
}

export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface IRegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export interface IEnvVariables {
  apiKey: string | undefined;
  authDomain: string | undefined;
  projectId: string | undefined;
  storageBucket: string | undefined;
  messagingSenderId: string | undefined;
  appId: string | undefined;
}

export interface ILineItems {
  id: number;
  price: string;
  quantity: number;
}
