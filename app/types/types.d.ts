export type Response = {
    letter: string;
    className: string;
};

export type keyStyle = {
    [key: string]: string;
};

export type ActionData = {
    formError?: string;
    fieldErrors?: {
        username: string | undefined;
        password: string | undefined;
        country?: string | undefined;
    };
    fields?: {
        username: string;
        password: string;
        country?: string;
    };
};

export type User = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    username: string;
    passwordHash: string;
};

export type Quote = {
    id: string;
    title: string;
    quote: string;
    likes: number;
};
