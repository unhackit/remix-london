import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

declare global {
    var __db: PrismaClient | undefined;
}

// prevents creating a new connection with every change
if (process.env.NODE_ENV === "production") {
    db = new PrismaClient();
    try {
        db.$connect();
    } catch (error) {
        console.log("error", error);
    }
} else {
    if (!global.__db) {
        global.__db = new PrismaClient();
        global.__db.$connect();
    }
    db = global.__db;
}

export { db };
