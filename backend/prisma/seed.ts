import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const hashedPassword = await bcrypt.hash("password123", 10);

  const manager = await prisma.user.create({
    data: {
      email: "manager@test.com",
      password: hashedPassword,
      role: "MANAGER",
    },
  });

  const storeKeeper = await prisma.user.create({
    data: {
      email: "keeper@test.com",
      password: hashedPassword,
      role: "STORE_KEEPER",
    },
  });

  console.log("✅ Users created:", {
    manager: manager.email,
    storeKeeper: storeKeeper.email,
  });

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: "Rice",
        description: "Premium quality long grain rice",
        price: 25.0,
        quantity: 500,
        category: "Grains",
      },
    }),
    prisma.product.create({
      data: {
        name: "Wheat Flour",
        description: "Fine ground wheat flour for baking",
        price: 18.5,
        quantity: 300,
        category: "Grains",
      },
    }),
    prisma.product.create({
      data: {
        name: "Sugar",
        description: "Refined white sugar",
        price: 12.0,
        quantity: 450,
        category: "Sweeteners",
      },
    }),
    prisma.product.create({
      data: {
        name: "Cooking Oil",
        description: "Vegetable cooking oil",
        price: 35.0,
        quantity: 200,
        category: "Oils",
      },
    }),
    prisma.product.create({
      data: {
        name: "Salt",
        description: "Iodized table salt",
        price: 5.0,
        quantity: 1000,
        category: "Seasonings",
      },
    }),
    prisma.product.create({
      data: {
        name: "Lentils",
        description: "Red lentils for dal",
        price: 22.0,
        quantity: 350,
        category: "Pulses",
      },
    }),
    prisma.product.create({
      data: {
        name: "Chickpeas",
        description: "Dried chickpeas",
        price: 20.0,
        quantity: 280,
        category: "Pulses",
      },
    }),
    prisma.product.create({
      data: {
        name: "Olive Oil",
        description: "Extra virgin olive oil",
        price: 65.0,
        quantity: 30,
        category: "Oils",
      },
    }),
    prisma.product.create({
      data: {
        name: "Honey",
        description: "Pure natural honey",
        price: 45.0,
        quantity: 40,
        category: "Sweeteners",
      },
    }),
    prisma.product.create({
      data: {
        name: "Black Pepper",
        description: "Ground black pepper",
        price: 15.0,
        quantity: 150,
        category: "Seasonings",
      },
    }),
  ]);

  console.log(`✅ Created ${products.length} products`);
  console.log("🎉 Seeding complete!");
  console.log("\n📋 Login credentials:");
  console.log("   Manager: manager@test.com / password123");
  console.log("   Store Keeper: keeper@test.com / password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
