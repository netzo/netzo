import { defineApp } from "$fresh/src/server/mod.ts";
import { buttonVariants } from "netzo/components/ui/button.tsx";
import type { NetzoState } from "../../config/mod.ts";
import { cn } from "../../components/utils.ts";

export default defineApp<NetzoState>((_req, ctx) => {
  const { sessionId, isAuthenticated, options } = ctx.state;
  const { title, description, favicon, image } = options;

  return (
    <html className="h-full">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href={favicon} />
      </head>
      {/* see https://unocss.dev/integrations/runtime#preventing-fouc */}
      <body className="flex flex-col n-bg-base" un-cloak>
        <header className="flex items-center justify-between px-4 py-4">
          <div className="flex">
            {/* NOTE: use dark:filter-invert (in image.class) to invert color on dark */}
            {image?.src && (
              <img
                {...image}
                className={cn("w-auto h-12 my-auto mr-3", image.class)}
              />
            )}
            <div className="grid">
              <h1 className="my-auto text-2xl font-semibold dark:text-white">
                {title}
              </h1>
              <p className="text-sm dark:text-gray-300">{description}</p>
            </div>
          </div>
          <a
            href={isAuthenticated ? "/oauth/signout" : "/oauth/signin"}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute right-4 top-4 md:right-8 md:top-8",
            )}
          >
            {isAuthenticated ? "Logout" : "Login"}
          </a>
        </header>

        <main className="flex-1 overflow-x-hidden">
          <ctx.Component />
        </main>
      </body>
    </html>
  );
});