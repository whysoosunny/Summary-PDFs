# Deployment and operations

## Application runtime

Use a host that supports a Node.js 22 Next.js server. Install the package-manager version in `package.json`, set the required environment variables, run `pnpm install --frozen-lockfile`, then `pnpm build` and `pnpm start`. This application requires a server, database, and object storage; static-only hosting is insufficient.

## Database

For a new development database, run `pnpm prisma generate` and `pnpm prisma db push`. For production, establish reviewed Prisma migrations and apply them as a separate release step. This repository does not include a production migration history.

The application uses `SummaryPDF`, `Section`, and `RateLimit` models. If migrating from an older schema, preserve data with an explicit rename migration. The database is also required for rate limiting; affected endpoints reject requests when the limiter cannot reach it.

## Amazon S3

- Set the four `S3_UPLOAD_*` variables for your bucket and region.
- Allow browser POST uploads in the bucket CORS configuration for the exact local or deployed application origin.
- Give the server credentials permission to write the required object paths.
- Configure object delivery so PDF and image URLs produced by the application are readable. Do not place confidential documents in a public demonstration bucket.
- Configure lifecycle rules if uploaded files should expire. The app does not provide a file-deletion dashboard.

## Image host configuration

`next.config.ts` currently includes an inherited S3 hostname. Before deployment, replace that hostname with your bucket's actual image-delivery hostname, such as `<bucket>.s3.<region>.amazonaws.com`. The `next/image` component rejects image hosts outside its allowlist. Use the actual URL format produced by your storage setup.

## AI models and observability

Confirm that your Together AI account can access the text and image model identifiers in the source files. `pnpm verify:models` is a static configuration check, not a live API test. Braintrust is optional; leave its API key empty to disable it.

## Rate limiting

Limits are defined in `src/lib/rate-limit-config.ts`. Client identification reads proxy headers in `src/lib/server-rate-limit.ts`. Verify that your hosting proxy overwrites trusted client-IP headers before exposing the server publicly.

## Release checks

1. Run lint, tests, and the production build.
2. Upload a small searchable PDF and complete the entire workflow.
3. Confirm the overview, section navigation, and generated image render.
4. Open the saved page in a separate browser session and test the original-PDF link.
5. Test oversized files, image-only documents, unavailable services, and rate-limit responses.

A successful source upload is not evidence that deployment or live service integration has passed these checks.
