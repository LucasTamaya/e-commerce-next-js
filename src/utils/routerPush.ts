import { NextRouter } from "next/router";

export const routerPush = (router: NextRouter, route: string) => {
  router.push(route);
};
