import type { NextApiRequest, NextApiResponse } from "next";

interface IData {
  error: boolean;
  details: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IData>
) {
  const { cookies } = req;

  if (!cookies.userId) {
    console.log("No cookies");
    return res
      .status(200)
      .json({ error: true, details: "No cookies available" });
  }

  return res.status(200).json({ error: false, details: "Got some cookies !" });
}
