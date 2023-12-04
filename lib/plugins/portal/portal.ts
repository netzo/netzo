import type { PluginRoute } from "$fresh/src/server/types.ts";
import { handleCallback, signIn, signOut } from "deno_kv_oauth/mod.ts";
import {
  createUser,
  getUser,
  updateUser,
  updateUserSession,
  type User,
} from "./utils/db.ts";
import { getUserGithub } from "./utils/providers/github.ts";
import Auth from "./auth.tsx";
import type { PortalOptions } from "./mod.ts";

export const portalRoutes = (options: PortalOptions): PluginRoute[] => {
  return [
    {
      path: "/auth",
      component: Auth,
    },
    {
      path: `/oauth/signin`,
      handler: async (req, _ctx) => {
        const response = await signIn(req, options.oauth2);
        return response;
      },
    },
    {
      path: `/oauth/callback`,
      handler: async (req, _ctx) => {
        const { response, tokens, sessionId } = await handleCallback(
          req,
          options.oauth2,
        );
        const userGithub = await getUserGithub(tokens.accessToken);
        const userCurrent = await getUser(userGithub.login);

        const user = {
          login: userGithub.login,
          sessionId,
          name: userGithub.name,
          email: userGithub.email,
          avatar: userGithub.avatar_url,
          role: "admin",
        } as unknown as User;

        if (userCurrent === null) {
          await createUser(user);
        } else {
          await updateUser({ ...user, ...userCurrent });
          await updateUserSession({ ...user, ...userCurrent }, sessionId);
        }

        return response;
      },
    },
    {
      path: `/oauth/signout`,
      handler: async (req, _ctx) => {
        const response = await signOut(req);
        return response;
      },
    },
  ];
};