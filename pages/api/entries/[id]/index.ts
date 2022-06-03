import type { NextApiRequest, NextApiResponse } from "next";
// import mongoose from "mongoose";
import { db } from "../../../../database";
import { Entry, IEntry } from "../../../../models";

type Data = { message: string; error?: string } | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // move to middleware
  /*
  const { id } = req.query;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid id" });
  } */

  switch (req.method) {
    case "GET":
      return getEntry(req, res);
    case "PUT":
      return updateEntry(req, res);
    default:
      res.status(400).json({ message: "Method does not exist" });
      break;
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();
  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(404).json({ message: "Entry does not exist" });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );
    res.status(200).json(updatedEntry!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({
      message: "Something went wrong updating the Entry",
      error: error.errors.status.message,
    });
  }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();
  const foundEntry = await Entry.findById(id);
  await db.disconnect();

  if (!foundEntry) {
    return res.status(404).json({ message: "Entry does not exist" });
  }
  res.status(200).json(foundEntry!);
};
