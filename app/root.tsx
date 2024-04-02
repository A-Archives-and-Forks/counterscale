import styles from "./globals.css?url";
import {
    json,
    LoaderFunctionArgs,
    type LinksFunction,
} from "@remix-run/cloudflare";
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from "@remix-run/react";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader = ({ context }: LoaderFunctionArgs) => {
    console.dir(context);
    return json({ version: context.env?.VERSION });
};

export default function App() {
    const data = useLoaderData<typeof loader>();

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" type="image/x-icon" href="/favicon.png" />
                <Meta />
                <Links />
            </head>
            <body>
                <div className="container mx-auto mt-4">
                    <header className="border-b-2 mb-12 py-4">
                        <nav className="flex justify-between items-center">
                            <div className="flex items-center">
                                <a
                                    href="/"
                                    className="text-xl sm:text-2xl font-bold"
                                >
                                    Counterscale
                                </a>
                                <img
                                    className="w-6 sm:w-8 ml-1"
                                    src="/favicon.png"
                                    alt="Counterscale Icon"
                                />
                            </div>
                            <div className="flex items-center font-small font-medium text-md sm:text-lg">
                                <a href="/dashboard">Dashboard</a>
                                <a
                                    href="/admin-redirect"
                                    target="_blank"
                                    className="hidden sm:inline-block ml-2 sm:ml-4"
                                >
                                    Admin
                                </a>
                                <a
                                    href="https://github.com/benvinegar/counterscale"
                                    className="w-8 ml-2 sm:ml-4"
                                >
                                    <img
                                        src="/github-mark.svg"
                                        alt="GitHub Logo"
                                        style={{
                                            filter: "invert(21%) sepia(27%) saturate(271%) hue-rotate(113deg) brightness(97%) contrast(97%)",
                                        }}
                                    />
                                </a>
                            </div>
                        </nav>
                    </header>
                    <main role="main" className="w-full">
                        <Outlet />
                    </main>

                    <footer className="py-4 flex justify-end text-s">
                        <div>
                            Version{" "}
                            <a
                                href={`https://github.com/benvinegar/counterscale/commit/${data.version}`}
                            >
                                {data.version?.slice(0, 7)}
                            </a>
                        </div>
                    </footer>
                </div>
                <ScrollRestoration />
                <Scripts />
                <script
                    dangerouslySetInnerHTML={{
                        __html: "window.counterscale = {'q': [['set', 'siteId', 'counterscale-dev'], ['trackPageview']] };",
                    }}
                ></script>
                <script id="counterscale-script" src="/tracker.js"></script>
            </body>
        </html>
    );
}
