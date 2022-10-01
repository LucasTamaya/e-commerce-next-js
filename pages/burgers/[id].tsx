import axios from "axios";
import type { NextPage, NextPageContext } from "next";

import { FOOD_API_BASE_URL } from "src/utils/urls";
import ProductDetails from "src/components/Product/ProductDetails";
import { IFood } from "src/interfaces/index";
import HeadStructure from "@/components/Common/HeadStructure";

interface Props {
  productData: IFood;
}

const BestFoodsProduct: NextPage<Props> = ({ productData }) => {
  return (
    <>
      <HeadStructure
        title="NextFoodApp - Burgers"
        content="Check out the most delicious burgers from NextFoodApp and enjoy free delivery!"
      />
      <ProductDetails productData={productData} />;
    </>
  );
};

export default BestFoodsProduct;

export const getServerSideProps = async (context: NextPageContext) => {
  const apiDetails = context.req?.url;

  // get the category of the product
  const category = apiDetails?.match(/\/(.*?)\//i);

  if (category) {
    const { data } = await axios.get(`${FOOD_API_BASE_URL}${apiDetails}`);

    const productData: IFood = {
      ...data,
      category: category[0].replaceAll("/", ""),
    };

    return {
      props: {
        productData,
      },
    };
  }
};
