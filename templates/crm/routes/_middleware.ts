import { FreshContext } from "$fresh/server.ts";

export async function handler(req: Request, ctx: FreshContext) {
  if (["notFound"].includes(ctx.destination)) {
    const url = new URL(req.url);
    url.pathname = "/clients";
    return Response.redirect(url.toString(), 307);
  }
  const resp = await ctx.next();
  return resp;
}