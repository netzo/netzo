// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_layout from "./routes/_layout.tsx";
import * as $accounts_id_ from "./routes/accounts/[id].tsx";
import * as $accounts_index from "./routes/accounts/index.tsx";
import * as $contacts_id_ from "./routes/contacts/[id].tsx";
import * as $contacts_index from "./routes/contacts/index.tsx";
import * as $deals_index from "./routes/deals/index.tsx";
import * as $index from "./routes/index.tsx";
import * as $invoices_id_ from "./routes/invoices/[id].tsx";
import * as $invoices_index from "./routes/invoices/index.tsx";
import * as $Overview from "./islands/Overview.tsx";
import * as $accounts_Form from "./islands/accounts/Form.tsx";
import * as $accounts_Table from "./islands/accounts/Table.tsx";
import * as $contacts_Form from "./islands/contacts/Form.tsx";
import * as $contacts_Table from "./islands/contacts/Table.tsx";
import * as $deals_Kanban from "./islands/deals/Kanban.tsx";
import * as $invoices_Form from "./islands/invoices/Form.tsx";
import * as $invoices_Table from "./islands/invoices/Table.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_layout.tsx": $_layout,
    "./routes/accounts/[id].tsx": $accounts_id_,
    "./routes/accounts/index.tsx": $accounts_index,
    "./routes/contacts/[id].tsx": $contacts_id_,
    "./routes/contacts/index.tsx": $contacts_index,
    "./routes/deals/index.tsx": $deals_index,
    "./routes/index.tsx": $index,
    "./routes/invoices/[id].tsx": $invoices_id_,
    "./routes/invoices/index.tsx": $invoices_index,
  },
  islands: {
    "./islands/Overview.tsx": $Overview,
    "./islands/accounts/Form.tsx": $accounts_Form,
    "./islands/accounts/Table.tsx": $accounts_Table,
    "./islands/contacts/Form.tsx": $contacts_Form,
    "./islands/contacts/Table.tsx": $contacts_Table,
    "./islands/deals/Kanban.tsx": $deals_Kanban,
    "./islands/invoices/Form.tsx": $invoices_Form,
    "./islands/invoices/Table.tsx": $invoices_Table,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
