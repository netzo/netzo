// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_layout from "./routes/_layout.tsx";
import * as $index from "./routes/index.tsx";
import * as $Overview from "./islands/Overview.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_layout.tsx": $_layout,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/Overview.tsx": $Overview,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
