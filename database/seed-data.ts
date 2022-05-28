interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  createdAt: number;
  status: string;
}

export const seedData: SeedData = {
  entries: [
    {
      description: "Ex nostrud occaecat dolor magna ad.",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description:
        "In-Progress Sint labore laboris sit veniam consequat labore in.",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      description:
        "Finished - Est aliquip deserunt ea sunt Lorem amet ad labore.",
      status: "finished",
      createdAt: Date.now() - 1000000,
    },
  ],
};
