import { ActionFunction, Form, json, Link, useActionData } from "remix";
import { ActionData } from "~/types/types";
import { validatePassword, validateUsername } from "~/utils/validation";
import { createUserSession, register } from "../utils/session.server";

const badRequest = (data: ActionData) => json(data, { status: 400 });

export let action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const username = form.get("username");
    const password = form.get("password");

    if (typeof username !== "string" || typeof password !== "string") {
        return badRequest({
            formError: `Form not submitted correctly.`,
        });
    }

    const fields = { username, password };
    const fieldErrors = {
        username: validateUsername(username),
        password: validatePassword(password),
    };

    if (Object.values(fieldErrors).some(Boolean)) return badRequest({ fieldErrors, fields });

    const user = await register({ username, password });
    console.log({ user });
    if (!user) {
        return {
            fields,
            formError: `The username exists already`,
        };
    }
    return createUserSession(user.id, "/meetup");
};

const Register = () => {
    const actionData = useActionData<ActionData>();

    return (
        <>
            <div className="bg-blackbg h-screen w-screen">
                <div className="h-full w-full flex items-center justify-center">
                    <div className="bg-white w-11/12 md:w-2/4 lg:w-1/3 min-h-3/5 p-8 short:h-3/4 rounded-lg shadow-lg border-2 border-solid border-gray-100 flex items-center justify-center">
                        <Form
                            reloadDocument
                            method="post"
                            className="w-full"
                            autoComplete="off"
                            aria-describedby={actionData?.formError ? "There was an error" : undefined}
                        >
                            <legend className="text-2xl font-bold">Register</legend>
                            <div className="my-6">
                                <label className="block text-md md:text-xl" htmlFor="username">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    name="username"
                                    placeholder="Enter Username"
                                    className="p-4 rounded-md w-full border-blackbg border-solid border-2 bg-transparent text-md md:text-lg"
                                    defaultValue={actionData?.fields?.username}
                                    aria-invalid={Boolean(actionData?.fieldErrors?.username)}
                                    aria-describedby={actionData?.fieldErrors?.username ? "username-error" : undefined}
                                />
                                {actionData?.fieldErrors?.username ? (
                                    <p className="text-sm text-red-500" role="alert" id="username-error">
                                        {actionData?.fieldErrors.username}
                                    </p>
                                ) : null}
                            </div>

                            <div className="my-6">
                                <label className="block text-md md:text-xl" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    type="password"
                                    className="p-4 rounded-md w-full border-blackbg border-solid border-2 bg-transparent text-md md:text-lg"
                                    defaultValue={actionData?.fields?.password}
                                    aria-invalid={Boolean(actionData?.fieldErrors?.password) || undefined}
                                    aria-describedby={actionData?.fieldErrors?.password ? "password-error" : undefined}
                                />
                                {actionData?.fieldErrors?.password ? (
                                    <p className="text-sm text-red-500" role="alert" id="password-error">
                                        {actionData?.fieldErrors.password}
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
                                    Register
                                </button>
                            </div>
                            <p className="text-center py-6">
                                Already have an account ?{" "}
                                <Link to="/login" className="text-sky-500 underline cursor-pointer">
                                    Login
                                </Link>
                            </p>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
