import { ActionFunction, json, Link, LoaderFunction, useLoaderData } from "remix";
import { Quote } from "~/types/types";
import { getQuote } from "~/utils/queries.server";
import { requireUserId } from "~/utils/session.server";
import RemixLogo from "../../assets/images/remix.jpg";

export let loader: LoaderFunction = async ({ request }) => {
    await requireUserId(request);
    const { quotes } = await getQuote();
    console.log(quotes);
    return json({ quotes });
};

export let action: ActionFunction = async ({ request }) => {};

const Meetup = () => {
    const { quotes } = useLoaderData();

    return (
        <div className="bg-blackbg min-h-screen w-screen">
            <div className="p-12">
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-center text-white text-3xl md:text-5xl lg:text-6xl py-6 font-bold">Meetup Attendees</h1>
                    <Link to="/meetup/new" className="bg-blue-500 text-white rounded-md px-6 py-3 text-2xl">
                        Show Yourself!
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {quotes.map((quote: Quote) => (
                        <div className="bg-white rounded-md shadow-md w-full p-4" key={quote.id}>
                            <div>
                                <img src={RemixLogo} alt="remix" />
                            </div>
                            <p className="my-4 text-xl">{quote.title}</p>
                            <p className="my-4 text-xl">{quote.quote}</p>
                            <div className="text-right">
                                <span className="text-4xl cursor-pointer">0 &#8679;</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Meetup;
