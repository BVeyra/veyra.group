// The audit engine lives in shared/auditEngine.ts (single source of truth for
// the client results view, the /report page, the Vercel function, and this
// dev server). This shim keeps existing server imports working.
export * from "../shared/auditEngine.js";
