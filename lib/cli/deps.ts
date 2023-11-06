// std
export {
  fromFileUrl,
  join,
  normalize,
  resolve,
  toFileUrl,
} from "https://deno.land/std@0.205.0/path/mod.ts";
export { parse as parseArgs } from "https://deno.land/std@0.205.0/flags/mod.ts";
export { TextLineStream } from "https://deno.land/std@0.205.0/streams/text_line_stream.ts";
export { default as question } from "https://deno.land/x/question@0.0.2/mod.ts";
export { load } from "https://deno.land/std@0.205.0/dotenv/mod.ts";
export { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

// x/semver
export {
  gte as semverGreaterThanOrEquals,
  isSemVer,
  parse,
} from "https://deno.land/std@0.205.0/semver/mod.ts";

// x/wait
export { Spinner, wait } from "https://deno.land/x/wait@0.1.12/mod.ts";

// x/netzo/apis/netzo
export type { NetzoConfig } from "../config/mod.ts";
export { netzo } from "../apis/netzo/mod.ts";

// @netzo/api: cherry-pick exports to avoid tree-shaking issues
export type {
  DenoDeploymentProgress,
  DenoDeploymentProgressAssetNegotiation,
  DenoDeploymentProgressError,
  DenoDeploymentProgressLoad,
  DenoDeploymentProgressStaticFile,
  DenoDeploymentProgressSuccess,
  DenoDeploymentProgressUploadComplete,
  DenoLog,
  DenoLogMessage,
  DenoLogPing,
  DenoLogReady,
  DenoOrganization,
  DenoProject,
  DenoProjectAnalytics,
  DenoProjectDeploymentRequestGitHubActions,
  DenoProjectDeploymentRequestPush,
  DenoProjectDeploymentsResult,
  DenoProjectDeploymentsSummary,
  DenoProjectDomain,
  Deployment,
  DeploymentData,
  Manifest,
  ManifestEntry,
  ManifestEntryDirectory,
  ManifestEntryFile,
  ManifestEntrySymlink,
  Paginated,
  Project,
  ProjectFiles,
  ProjectFilesFile,
} from "https://esm.sh/@netzo/api@1.0.49/lib/client.d.ts";

// socket.io-client:
export { feathers } from "https://esm.sh/@feathersjs/feathers@5.0.6";
export { default as socketio } from "https://esm.sh/@feathersjs/socketio-client@5.0.6";
export { default as io } from "https://esm.sh/socket.io-client@4.7.1";
