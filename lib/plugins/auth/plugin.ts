import type { Plugin, PluginRoute } from "$fresh/server.ts";
import type { OAuth2ClientConfig } from "../../deps/oauth2_client/src/oauth2_client.ts";
import type { NetzoState } from "../../mod.ts";
import {
  assertUserIsWorkspaceUserOfWorkspaceOfApiKeyIfProviderIsNetzo,
  ensureSignedIn,
  setRequestState,
  setSessionState,
} from "./middlewares/mod.ts";
import createAuth from "./routes/auth.tsx";
import { getRoutesByProvider } from "./routes/mod.ts";
import type { AuthUser } from "./utils/db.ts";
import type { EmailClientConfig } from "./utils/providers/email.ts";
import type { AuthProvider } from "./utils/providers/mod.ts";
import type { NetzoClientConfig } from "./utils/providers/netzo.ts";

export * from "../../deps/deno_kv_oauth/mod.ts";

export type AuthConfig = {
  /** A short title for the app to appear above the login form at /auth. */
  title?: string;
  /** A short description for the app to appear above the login form at /auth. */
  description?: string;
  /** HTML content rendered below auth form e.g. to display a link to the terms of service via an a tag. */
  caption?: string;
  providers: {
    netzo?: NetzoClientConfig;
    email?: EmailClientConfig;
    google?: OAuth2ClientConfig;
    github?: OAuth2ClientConfig;
    gitlab?: OAuth2ClientConfig;
    slack?: OAuth2ClientConfig;
    auth0?: OAuth2ClientConfig;
    okta?: OAuth2ClientConfig;
  };
};

export type AuthState = {
  /* Session ID used internally by the auth plugin. */
  sessionId?: string;
  /* The user object associated with the session ID. */
  sessionUser?: AuthUser;
  /* Whether the user is authenticated (if sessionId not expired and sessionUser defined). */
  isAuthenticated?: boolean;
  /* The origin of the request (e.g. https://my-project-906698.netzo.io). */
  origin?: string;
  /* The referer of the request (e.g. https://app.netzo.io/some-path). */
  referer?: string;
  /* Wether the request is coming from the Netzo app (e.g. app.netzo.io). */
  isApp?: boolean;
};

/**
 * A fresh plugin that registers middleware and handlers to
 * handle Authentication with multiple OAuth2 providers and
 * a configurable sign-in page.
 *
 * - `GET /auth` for the authentication page
 * - `GET /auth/{provider}/signin` for the sign-in page
 * - `GET /auth/{provider}/callback` for the callback page
 * - `GET /auth/signout` for the sign-out page
 *
 * @param {AuthConfig} - configuration options for the plugin
 * @returns {Plugin} - a Plugin for Deno Fresh
 */
export const auth = (config: AuthConfig): Plugin<NetzoState> => {
  const authEnabled = [
    "netzo",
    "email",
    "google",
    "github",
    "gitlab",
    "auth0",
    "okta",
  ].some((key) => !!config?.providers?.[key as AuthProvider]);
  if (!authEnabled) return { name: "netzo.auth" }; // skip if auth but no providers are set

  config.title ??= "Sign In";
  config.description ??= "Sign in to access the app";
  config.caption ??= ""; // e.g. 'By signing in you agree to the <a href="/" target="_blank">Terms of Service</a>';
  config.providers ??= {};

  const authRoutes: PluginRoute[] = [
    { path: "/auth", component: createAuth(config) },
    ...Object.keys(config.providers)
      .filter((provider) => !!config?.providers?.[provider as AuthProvider])
      .flatMap((provider) =>
        getRoutesByProvider(provider as AuthProvider, config)
      ),
  ];

  return {
    name: "netzo.auth",
    middlewares: [
      {
        path: "/",
        middleware: { handler: setSessionState },
      },
      {
        path: "/",
        middleware: {
          handler:
            assertUserIsWorkspaceUserOfWorkspaceOfApiKeyIfProviderIsNetzo,
        },
      },
      {
        path: "/",
        middleware: { handler: setRequestState },
      },
      {
        path: "/",
        middleware: { handler: ensureSignedIn },
      },
    ],
    routes: authRoutes,
  };
};
