# Summary PDF

An AI-powered PDF summarization application maintained by Sunny Kumar. Upload a searchable PDF, generate section-by-section summaries, and share a structured reading view.

## Features

- PDF text extraction in the browser
- AI-generated section summaries and a quick overview
- Language selection and navigable table of contents
- Generated summary illustrations
- Cloud PDF uploads and persistent shareable pages
- Responsive layouts and server-side rate limiting

## Technology

Next.js, React, TypeScript, Tailwind CSS, Together AI, PostgreSQL, Prisma, and Amazon S3. Optional inference observability uses Braintrust.

## Local setup

Requirements: Node.js 22, the pnpm version specified in package.json, a PostgreSQL database, a Together AI account, and an S3 bucket.

1. Extract this project and open a terminal in its folder.
2. Copy `.example.env` to `.env` (Windows: `copy .example.env .env`).
3. Enter your own service credentials in `.env`.
4. Run `pnpm install`.
5. Run `pnpm prisma generate`.
6. Run `pnpm prisma db push` against your development database.
7. Run `pnpm dev` and open http://localhost:3000.

## Environment variables

| Variable | Purpose |
| --- | --- |
| TOGETHER_API_KEY | AI inference and image generation |
| DATABASE_URL | PostgreSQL connection string |
| S3_UPLOAD_KEY | AWS access key for the upload bucket |
| S3_UPLOAD_SECRET | AWS secret access key |
| S3_UPLOAD_BUCKET | Bucket name |
| S3_UPLOAD_REGION | Bucket region |
| BRAINTRUST_API_KEY | Optional inference observability |
| BRAINTRUST_PROJECT | Optional observability project name |

Configure the bucket CORS policy to permit browser POST uploads from your app origin. Uploaded PDFs and generated images must be readable through the URLs used by the application. Shareable pages provide access to uploaded document URLs; use non-sensitive demo documents for a public portfolio.

## Commands

- `pnpm dev`: local development
- `pnpm lint`: lint checks
- `pnpm test`: unit tests
- `pnpm build`: production build
- `pnpm start`: production server

## Deployment

Use a Node.js 22-compatible host, configure the environment variables, install dependencies, generate the Prisma client, provision the database schema, and run the production build and start commands. Set S3 CORS to the deployed origin. External AI and storage services may incur charges.

## Maintenance and license

Maintainer: Sunny Kumar. This distribution customizes an MIT-licensed codebase. The original copyright and permission notice are retained in `LICENSE`.

## Database setup after renaming

This package uses the `SummaryPDF` Prisma model. Regenerate the Prisma client and initialize a new development database using the setup commands above. If upgrading an existing database, prepare a reviewed rename migration before applying schema changes to preserve existing records.
