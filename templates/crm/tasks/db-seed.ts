import { accounts } from "@/database/accounts.ts";
import { deals } from "@/database/deals.ts";
import { contacts } from "@/database/contacts.ts";
import { invoices } from "@/database/invoices.ts";

const kv = await Deno.openKv(Deno.env.get("DENO_KV_PATH"));

//Seed a local KV from fake data files.
const dbSeed = async () => {
  const createPromises = [
    Promise.all(accounts.map((d) => kv.set(["accounts", d.id], d))),
    Promise.all(deals.map((d) => kv.set(["deals", d.id], d))),
    Promise.all(contacts.map((d) => kv.set(["contacts", d.id], d))),
    Promise.all(invoices.map((d) => kv.set(["invoices", d.id], d))),
  ];

  try {
    await Promise.all(createPromises);
    console.log("Data uploaded to DB.");
  } catch (error) {
    console.error("Error seeding Database:", error);
  } finally {
    Deno.exit(0);
  }
};

if (import.meta.main) dbSeed();
