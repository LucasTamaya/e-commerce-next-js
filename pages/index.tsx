import type { NextPage } from "next";

import Header from "@/components/Common/Header";

const Home: NextPage = () => {
  return (
    <main>
      <>
        <Header />
        <div className="w-full h-[80vh] flex flex-row justify-center items-center">
          <h1 className="font-bold text-4xl">
            Welcome to the Next JS Ecommerce shop !
          </h1>
        </div>
      </>
    </main>
  );
};

export default Home;
