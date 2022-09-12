import type { NextApiRequest, NextApiResponse } from "next";

interface IData {
  error: boolean;
  message: string;
  userId?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IData>
) {
  const { body, cookies } = req;

  console.log(body);
  console.log(cookies);

  if (!cookies.userId) {
    return res
      .status(200)
      .json({ error: true, message: "Please sign-in first" });
  }

  return res.status(200).json({
    error: false,
    message: "Product correctly added to cart",
    userId: cookies.userId,
  });
}
