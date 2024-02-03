import { defineRoute } from "$fresh/server.ts";
import type { TableProps } from "netzo/ui/blocks/table/use-table.ts";
import { ALIASES, type Contact } from "@/services/contacts.ts";
import { Table } from "@/islands/contacts/Table.tsx";
import { netzo } from "@/netzo.ts";

export const getTableOptions = (
  data: Contact[],
): TableProps<Contact, unknown>["options"] => {
  return {
    servicePath: "contacts",
    search: {
      column: "name",
      placeholder: "Search by name...",
    },
    filters: [],
    layouts: ["grid"],
  };
};

export default defineRoute(async (req, ctx) => {
  const data = await netzo.service("contacts").find<Contact>();

  const options = getTableOptions(data);

  return (
    <div className="h-full p-4">
      {/* NOTE: cannot pass functions (columns) as props from server to client */}
      <Table data={data} options={options} />
    </div>
  );
});
