export interface IProduct {
  description: string;
  id: number;
  images: string[];
  price: number;
  title: string;
  quantity: number;
}

export interface IProductCard {
  id: number;
  image: string;
  price: number;
  title: string;
}

export interface IFirebaseCart {
  productId: number;
  quantity: number;
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
  price_data: {
    currency: string;
    product_data: {
      name: string;
    };
    unit_amount: number;
  };
  quantity: number;
}

// price_data: {
//   currency: "usd",
//   product_data: {
//     name: product.title,
//   },
//   unit_amount: product.price * 100, // convert dollars to cents ,
// },
// quantity: 1,
