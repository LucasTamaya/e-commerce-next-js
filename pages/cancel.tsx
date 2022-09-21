import type { NextPage } from "next";

import Button from "@/components/Common/Button";
import { useRouter } from "next/router";
import { routerPush } from "src/utils/routerPush";

interface Props {}

const Cancel: NextPage<Props> = ({}) => {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-3xl mb-12">
        Something went wrong during the checkout
      </h1>
      <div className="w-[400px] mb-5">
        <Button filled={false} onClick={() => routerPush(router, "/cart")}>
          Try again
        </Button>
      </div>
      <div className="w-[400px]">
        <Button filled={true} onClick={() => routerPush(router, "/")}>
          Go back to the store
        </Button>
      </div>
    </div>
  );
};

export default Cancel;
