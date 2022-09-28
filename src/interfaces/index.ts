export interface IFood {
  id: string;
  img: string;
  name: string;
  dsc: string;
  price: number;
  quantity: number;
  category: string;
}

export interface IProductCard {
  id: string;
  img: string;
  name: string;
  price: number;
  category: string;
}

export interface IFirebaseCart {
  productId: string;
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
