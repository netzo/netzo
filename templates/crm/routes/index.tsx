import { defineRoute } from "$fresh/server.ts";
import type { Account } from "../data/accounts.ts";
import type { Contact } from "../data/contacts.ts";
import type { Deal } from "../data/deals.ts";
import type { Invoice } from "../data/invoices.ts";
import type { Transaction } from "../data/transactions.ts";
import type { User } from "../data/users.ts";
import { Dashboard } from "../islands/Dashboard.tsx";
import { $client } from "../netzo.config.ts";

export default defineRoute(async (req, ctx) => {
  const data = await Promise.all([
    $client.accounts.find() as Account[],
    $client.contacts.find() as Contact[],
    $client.deals.find() as Deal[],
    $client.invoices.find() as Invoice[],
    $client.transactions.find() as Transaction[],
    $client.users.find() as User[],
  ]);

  // if (!data) return ctx.renderNotFound();

  return <Dashboard data={data} />;
});
