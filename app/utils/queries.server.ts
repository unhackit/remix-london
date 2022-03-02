import { db } from "./db.server";

export async function createQuote(title: string, quote: string) {
    let newQuote = await db.quote.create({
        data: {
            title,
            quote,
        },
    });

    return newQuote;
}

export async function deleteQuote(quoteId: string) {
    let deletedQuote = await db.quote.delete({
        where: { id: quoteId },
    });

    return deletedQuote;
}

export async function getQuote() {
    let quotes = await db.quote.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return {
        quotes,
    };
}
