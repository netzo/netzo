import { serve } from "https://deno.land/std@0.155.0/http/server.ts";
import { handlerGET } from "./get.handler.tsx";
import { handlerPOST } from "./post.handler.ts";

const createHandler = (main: Function) => {
  // import.meta.url resolves to "file://src/main.ts", however, we MUST at least
  // remove the "file://"" prefix, here we also remove the "/src/" prefix (if any)
  console.log('import.meta.url', import.meta.url)
  const url = import.meta.url
    .replace(/https:\/\/api.netzo.io\/projects\/.*\//, "")
    .replace("file:///src/", "") // if in deno deploy
    .replace("file://", ""); // else
  console.log('url', url)
  return async (request: Request): Promise<Response> => {
    switch (request.method) {
      case "GET":
        return await handlerGET(request, url);
      case "POST":
        return await handlerPOST(request, main);
      default:
        return new Response("Invalid method", { status: 405 });
    }
  };
};

export const serveFunction = (fn: Function) => {
  return serve(createHandler(fn));
};

// test:

// curl --location --request POST 'http://localhost:8000?name=miguel' --header 'Content-Type: application/json' --data-raw '{"age": 12, "male": true}'

if (import.meta.main) {
  serveFunction((
    boolean: boolean,
    string: string,
    number: number,
    object: object,
    array: Array<any>,
    nullValue: null,
    undefinedValue: undefined,
  ): string => {
    return `boolean: ${boolean}
  string: ${string}
  number: ${number}
  object: ${JSON.stringify(object)}
  array: ${JSON.stringify(array)}
  nullValue: ${nullValue}
  undefinedValue: ${undefinedValue}`;
  });
}
