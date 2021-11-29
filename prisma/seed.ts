import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();

async function seed() {
  await prisma.user.create({
    data: {
      username: "kody",
      // this is a hashed version of "twixrox"
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u"
    }
  });
}

(async () => {
  await seed();
})();
