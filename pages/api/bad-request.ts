import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string | string[];
  ok: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { message = "Bad request" } = req.query;
  res.status(400).json({ ok: false, message });
}
