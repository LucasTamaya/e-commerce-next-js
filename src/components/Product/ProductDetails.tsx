import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PulseLoader from "react-spinners/PulseLoader";

import { IFood } from "../../interfaces/index";
import Button from "../Common/Button";
import Header from "../Common/Header";
import SnackBar from "../Common/SnackBar";
import LayoutBeforeChekout from "../LayoutBeforeChekout";
import { useAddProductToCart } from "../../hooks/useAddProductToCart";
import { useCheckout } from "../../hooks/useCheckout";

interface Props {
  productData: IFood;
}

const ProductDetails: React.FC<Props> = ({ productData }) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [product, setProduct] = useState(productData);
  const [productQuantity, setProductQuantity] = useState(1);

  const router = useRouter();

  const { id, name, price, dsc, img, category }: IFood = product;

  // query hook to add product to cart
  const {
    mutate,
    isLoading,
    isError,
    isSuccess: addToCartSuccess,
    data,
  } = useAddProductToCart(id, name, img, price, category, productQuantity);

  // query hook to open the Stripe checkout
  const {
    mutate: openCheckout,
    data: openCheckoutData,
    isLoading: openCheckoutLoading,
    isError: openCheckoutError,
    isSuccess: openCheckoutSuccess,
  } = useCheckout([product]);

  // handle request's success and error
  useEffect(() => {
    if (addToCartSuccess || isError || openCheckoutError) {
      setOpenSnackBar(true);
    }
  }, [addToCartSuccess, isError, openCheckoutError]);

  // handle the checkout
  useEffect(() => {
    if (openCheckoutSuccess) {
      router.replace(openCheckoutData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCheckoutSuccess]);

  // handle when we change the quantity of product
  useEffect(() => {
    setProduct((prev) => {
      return {
        ...prev,
        quantity: productQuantity,
      };
    });
  }, [productQuantity]);

  // layout before the user is redirected to the stripe checkout page
  if (openCheckoutSuccess) {
    return (
      <LayoutBeforeChekout
        openCheckoutSuccess={openCheckoutSuccess}
        openSnackBar={openSnackBar}
        setOpenSnackBar={setOpenSnackBar}
      />
    );
  }

  return (
    <main className="relative w-full h-screen sm:h-[80vh] flex flex-row justify-center items-center">
      <div className="max-w-[1000px] flex flex-col sm:flex-row items-center gap-y-5 gap-x-10 mx-auto px-5">
        <Image src={img} alt="product image" width={450} height={400} />
        <div className="flex-auto flex flex-col w-full sm:max-w-[700px] gap-y-3">
          <h1 className="font-bold text-xl">{name}</h1>
          <p className="font-bold text-main-red">${price}</p>
          <p>{dsc}</p>
          <label htmlFor="quantity" className="font-bold">
            Select a quantity:
          </label>
          <input
            type="number"
            id="quantity"
            defaultValue={1}
            className="border border-black w-12 pl-4 py-1"
            onChange={(e) => setProductQuantity(e.target.valueAsNumber)}
          />
          <Button filled={true} onClick={openCheckout}>
            {!openCheckoutLoading ? (
              <>Order now</>
            ) : (
              <PulseLoader color="#e63b60" size={7} />
            )}
          </Button>
          <Button filled={false} onClick={mutate}>
            {!isLoading ? (
              <>Add to cart</>
            ) : (
              <PulseLoader color="#e63b60" size={7} />
            )}
          </Button>
        </div>
      </div>

      {isError && (
        <SnackBar
          openSnackBar={openSnackBar}
          setOpenSnackBar={setOpenSnackBar}
          severity="error"
          message="Something went wrong"
        />
      )}

      {addToCartSuccess && (
        <SnackBar
          openSnackBar={openSnackBar}
          setOpenSnackBar={setOpenSnackBar}
          severity={data.error ? "warning" : "success"}
          message={data.message}
        />
      )}

      {openCheckoutError && (
        <SnackBar
          openSnackBar={openSnackBar}
          setOpenSnackBar={setOpenSnackBar}
          severity="error"
          message="Something went wrong"
        />
      )}
    </main>
  );
};

export default ProductDetails;
