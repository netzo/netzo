// NOTE: avoid importing from @netzo/api package which bloats bundle

export type User = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  // deletedAt: "" | string;
  auth0Id?: string;
  profile?: {
    sub: string;
    nickname: string;
    name: string;
    picture: string;
    updated_at: string;
    email: string;
    email_verified: boolean;
  };
  email: string; // normalized profile.email for UI
  name: string;
  avatar: string;
  roles?: Record<string, "owner" | "admin" | "developer" | "user">; // populated in external resolver
};

export type Project = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  // deletedAt: "" | string;
  workspaceId: string;
  uid: string;
  name: string;
  description: string;
  labels: string[];
  avatar: string;
  denoProductionDeploymentId: string;
  denoLatestDeploymentId: string;
  apiKeyId: string;
  env: {
    development: Record<string, string | { _id: string }>;
    // preview: Record<string, string | { _id: string }>; // TODO: once preview envs land in DD (see
    production: Record<string, string | { _id: string }>;
  };
  envVars?: {
    development: Record<string, string>;
    // preview: Record<string, string>;
    production: Record<string, string>;
  };
  denoId: string;
  deno?: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    usages: {
      fields: {
        name: string;
        type: "time" | "number" | "string" | "boolean" | "other";
      };
      values: (string | number | boolean | unknown)[];
    };
  };
  [k: string]: unknown;
};

export type Object = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  // deletedAt: "" | string;
  workspaceId: string;
  key: string;
  contentType: string;
  size: number;
  isPublic: boolean;
  url?: string;
};

export type ObjectData = {
  createdAt?: string;
  updatedAt?: string;
  workspaceId?: string;
  key?: string;
  contentType?: string;
  size?: number;
  isPublic?: boolean;
};
