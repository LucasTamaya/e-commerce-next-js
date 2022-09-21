import type { NextPage } from "next";

import Button from "@/components/Common/Button";
import { routerPush } from "src/utils/routerPush";
import { useRouter } from "next/router";

interface Props {}

const Success: NextPage<Props> = ({}) => {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-3xl mb-12">
        Thank you for your purchase !
      </h1>
      <Button filled={true} onClick={() => routerPush(router, "/")}>
        Go back to the store
      </Button>
    </div>
  );
};

export default Success;
