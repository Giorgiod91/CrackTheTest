// i found this in the prisma docs with nextjs it will basically seed the db with initial data
// but i changed it to to work with the tests and users model instead of posts
import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    tests: {
      create: [
        {
          title: "VW Eignungstest",
          content: "https://www.vw.com/eignungstest",
          published: true,
        },
        {
          title: "continental Eignungstest",
          content: "https://www.continental.com/eignungstest",
        },
      ],
    },
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    tests: {
      create: [
        {
          title: "Google Eignungstest",
          content: "https://www.google.com/eignungstest",
          published: true,
        },
      ],
    },
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
