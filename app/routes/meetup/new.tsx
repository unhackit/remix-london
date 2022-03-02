import { ActionFunction, Form, json, LoaderFunction, redirect, useActionData, useLoaderData } from "remix";
import { ActionData } from "~/types/types";
import { createQuote } from "~/utils/queries.server";

const badRequest = (data: ActionData) => json(data, { status: 400 });

export let loader: LoaderFunction = () => {
    return {};
};

export let action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    let title = formData.get("title") as string;
    let quote = formData.get("quote") as string;

    let response = await createQuote(title, quote);
    if (!response) {
        throw Error();
    }

    return redirect("/meetup");
};

const New = () => {
    const loader = useLoaderData();
    const actionData = useActionData();

    console.log("child loader", loader);

    return (
        <div className="bg-blackbg h-screen w-screen">
            <div className="h-full w-full flex items-center justify-center">
                <div className="bg-white w-11/12 md:w-2/4 lg:w-1/3 min-h-3/5 p-8 short:h-3/4 rounded-lg shadow-lg border-2 border-solid border-gray-100 flex items-center justify-center">
                    <Form
                        method="post"
                        className="w-full"
                        autoComplete="off"
                        aria-describedby={actionData?.formError ? "There was an error" : undefined}
                    >
                        <legend className="text-2xl font-bold">Create Quote</legend>
                        <div className="my-6">
                            <label className="block text-md md:text-xl" htmlFor="title">
                                Title
                            </label>
                            <input
                                id="title"
                                autoComplete="off"
                                autoCorrect="off"
                                name="title"
                                placeholder="Enter Title"
                                className="p-4 rounded-md w-full border-blackbg border-solid border-2 bg-transparent text-md md:text-lg"
                                defaultValue={actionData?.fields?.title}
                                aria-invalid={Boolean(actionData?.fieldErrors?.title)}
                                aria-describedby={actionData?.fieldErrors?.title ? "title-error" : undefined}
                            />
                            {actionData?.fieldErrors?.title ? (
                                <p className="text-sm text-red-500" role="alert" id="title-error">
                                    {actionData?.fieldErrors.title}
                                </p>
                            ) : null}
                        </div>

                        <div className="my-6">
                            <label className="block text-md md:text-xl" htmlFor="password">
                                Quote
                            </label>
                            <textarea
                                id="quote"
                                name="quote"
                                placeholder="Start Typing"
                                rows={10}
                                className="p-4 rounded-md w-full border-blackbg border-solid border-2 bg-transparent text-md md:text-lg"
                                defaultValue={actionData?.fields?.quote}
                                aria-invalid={Boolean(actionData?.fieldErrors?.quote) || undefined}
                                aria-describedby={actionData?.fieldErrors?.quote ? "quote-error" : undefined}
                            />
                            {actionData?.fieldErrors?.quote ? (
                                <p className="text-sm text-red-500" role="alert" id="quote-error">
                                    {actionData?.fieldErrors.quote}
                                </p>
                            ) : null}
                        </div>
                        <div id="form-error-message">
                            {actionData?.formError ? (
                                <p className="text-sm text-red-500" role="alert">
                                    {actionData?.formError}
                                </p>
                            ) : null}
                        </div>
                        <div className="text-right">
                            <button className="bg-sky-500 px-5 py-3 rounded-md text-white text-center cursor-pointer w-2/4 text-sm md:text-lg">
                                Create Quote
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default New;
