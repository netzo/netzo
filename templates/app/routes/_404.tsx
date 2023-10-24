import { HEADING_STYLES, LINK_STYLES } from "netzo/authentication/utils/constants.ts";

export default function NotFoundPage() {
  return (
    <main class="flex-1 p-4 flex flex-col justify-center text-center">
      <h1 class={HEADING_STYLES}>Page not found</h1>
      <p>
        <a href="/" class={LINK_STYLES}>Return home &#8250;</a>
      </p>
    </main>
  );
}