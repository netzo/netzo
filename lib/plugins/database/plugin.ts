// deno-lint-ignore-file no-explicit-any
import type { Plugin, PluginRoute } from "fresh/server.ts";
import { createClient } from "npm:@libsql/client@0.6.0";
import { SQL, eq, getTableColumns, sql } from "npm:drizzle-orm@0.30.10";
import { SQLiteTable } from "npm:drizzle-orm@0.30.10/sqlite-core";
import { DrizzleConfig } from "npm:drizzle-orm@0.30.10/utils";
import { database as createDatabase } from "../../database/mod.ts";
import { apiKeyAuthentication, cors } from "../middleware.ts";
import { parseRequestBody } from "../utils.ts";

const {
  NETZO_API_KEY,
  NETZO_DATABASE_URL,
  NETZO_DATABASE_AUTH_TOKEN,
} = Deno.env.toObject();

export type DatabaseConfig = DrizzleConfig & {
  /** Wether to require authentication using the provided API key in the
   * "x-api-key" header or "apiKey" query parameter. To disable authentication
   * set to `undefined`, otherwise it is recommended to set using Deno.env.get().
   * Defaults to Deno.env.get("NETZO_API_KEY"). */
  apiKey?: string;
};

// deno-lint-ignore ban-types
export type DatabaseState = {};

/**
 * A fresh plugin that registers middleware and handlers to
 * to mount RESTful API routes on the `/database` route path.
 *
 * - `GET /database/:tableName` find all records matching query
 * - `GET /database/:tableName/:id` get an entry by key
 * - `POST /database/:tableName` create a new entry (auto-generates id)
 * - `PUT /database/:tableName/:id` update an entry by key
 * - `PATCH /database/:tableName/:id` patch an entry by key
 * - `DELETE /database/:tableName/:id` remove an entry by key
 */
export const database = (config?: DatabaseConfig): Plugin => {
  if (!config) return { name: "netzo.database" };
  if (!("apiKey" in config)) config.apiKey = NETZO_API_KEY;

  const db = createDatabase(config);

  const client = createClient({
    url: NETZO_DATABASE_URL!,
    authToken: NETZO_DATABASE_AUTH_TOKEN,
  });

  return {
    name: "netzo.database",
    middlewares: [
      {
        path: "/database",
        middleware: {
          handler: cors(),
        },
      },
      {
        path: "/database",
        middleware: {
          handler: apiKeyAuthentication({ apiKey: config.apiKey! }),
        },
      },
    ],
    routes: [
      {
        path: "/database",
        handler: {
          POST: async (req, _ctx) => {
            const {
              sql,
              params: args = [],
              method,
            } = await parseRequestBody(req);
            const result = await client.execute({ sql, args });
            // NOTE: Drizzle always waits for {rows: string[][]} or {rows: string[]}
            // for the return value. When the method is get, you should return a value
            // as { rows: string[] }. Otherwise, you should return { rows: string[][] }
            // see https://orm.drizzle.team/docs/get-started-sqlite#http-proxy
            const rows = method === "all"
              ? result.rows.map((row: any) => Array.from(row)) // somehow requires Array.from
              : result.rows[0];
            return Response.json(rows);
          },
        },
      } satisfies PluginRoute,
      {
        path: "/database/[tableName]",
        handler: {
          GET: async (_req, ctx) => {
            const { tableName } = ctx.params;
            const table = config.schema![tableName] as any;
            const rows = await db.select().from(table);
            return Response.json(rows);
          },
          POST: async (req, ctx) => {
            const { tableName } = ctx.params;
            const table = config.schema![tableName] as any;
            const pk = Object.entries(table).find((e) => !!e[1]?.primary)?.[0]!;
            const data = await parseRequestBody(req);
            const { [pk]: id, ...rest } = data;
            const result = await db
              .insert(table)
              .values({ id, ...rest })
              // there is no option to exclude column in sql, that's why we have to specify the
              // columns we want to update by using a custom function buildConflictUpdateColumns()
              // see https://discord.com/channels/1043890932593987624/1243571991945019402/1243571991945019402
              // and also https://orm.drizzle.team/learn/guides/upsert
              .onConflictDoUpdate({
                target: table[pk],
                set: buildConflictUpdateColumns(table[pk], Object.keys(rest)),
              })
              .returning();
            return Response.json(
              Array.isArray(result) ? result[0] : result.rows,
            );
          },
        },
      } satisfies PluginRoute,
      {
        path: "/database/[tableName]/[id]",
        handler: {
          GET: async (_req, ctx) => {
            const { tableName, id } = ctx.params;
            const table = config.schema![tableName] as any;
            const [row] = await db.select().from(table).where(eq(table.id, id));
            return Response.json(row);
          },
          PUT: async (req, ctx) => {
            const { tableName, id } = ctx.params;
            const table = config.schema![tableName] as any;
            const data = await parseRequestBody(req);
            const result = await db.update(table).set(data).where(
              eq(table.id, id),
            ).returning();
            return Response.json(
              Array.isArray(result) ? result[0] : result.rows,
            );
          },
          PATCH: async (req, ctx) => {
            const { tableName, id } = ctx.params;
            const table = config.schema![tableName] as any;
            const data = await parseRequestBody(req);
            const result = await db.update(table).set(data).where(
              eq(table.id, id),
            ).returning();
            return Response.json(
              Array.isArray(result) ? result[0] : result.rows,
            );
          },
          DELETE: async (_req, ctx) => {
            const { tableName, id } = ctx.params;
            const table = config.schema![tableName] as any;
            const result = await db.delete(table).where(eq(table.id, id))
              .returning();
            return Response.json(
              Array.isArray(result) ? result[0] : result.rows,
            );
          },
        },
      } satisfies PluginRoute,
    ],
  };
};

function buildConflictUpdateColumns<
  T extends SQLiteTable,
  Q extends keyof T["_"]["columns"],
>(
  table: T,
  columns: Q[],
) {
  const cls = getTableColumns(table);
  return columns.reduce((acc, column) => {
    const colName = cls[column].name;
    acc[column] = sql.raw(`excluded.${colName}`);
    return acc;
  }, {} as Record<Q, SQL>);
}
