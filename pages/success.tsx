import type { NextPage } from "next";
import { useRouter } from "next/router";

import Button from "@/components/Common/Button";
import { routerPush } from "src/utils/routerPush";
import { useDeleteAllProductsFromCart } from "../src/hooks/useDeleteAllProductsFromCart";
import { useEffect } from "react";
import HeadStructure from "@/components/Common/HeadStructure";

const Success: NextPage = () => {
  const router = useRouter();

  const { mutate, isError } = useDeleteAllProductsFromCart();

  useEffect(() => {
    mutate();
  }, [mutate]);

  if (isError) {
    return (
      <>
        <HeadStructure
          title="NextFoodApp - Checkout Success"
          content="Thank you for your purchase! We hope to see you soon."
        />
        <main className="w-full h-screen flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl mb-12">Something went wrong</h1>
          <div className="w-[400px]">
            <Button filled={true} onClick={() => routerPush(router, "/")}>
              Go back to the store
            </Button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <HeadStructure
        title="NextFoodApp - Checkout Success"
        content="Thank you for your purchase! We hope to see you soon."
      />
      <main className="w-full h-screen flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl mb-12">
          Thank you for your purchase !
        </h1>
        <div className="w-[400px]">
          <Button filled={true} onClick={() => routerPush(router, "/")}>
            Go back to the store
          </Button>
        </div>
      </main>
    </>
  );
};

export default Success;
