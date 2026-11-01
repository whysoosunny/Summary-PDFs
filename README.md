# Summary PDF

### Turn long documents into clear, structured summaries.

Summary PDF is a web application for reading PDFs more efficiently. Upload a searchable document, choose an output language, and explore a concise overview alongside section summaries in a responsive reading interface.

**Maintained by Sunny Kumar** · Next.js · TypeScript · PostgreSQL · Together AI

## Features

- **Document upload:** drag and drop a PDF or select one from your device.
- **Structured summaries:** navigate individual sections using a table of contents.
- **Quick overview:** review the document's key points before reading the detail.
- **Eight output languages:** English, Hindi, German, French, Italian, Portuguese, Spanish, and Thai.
- **Summary illustrations:** generate a contextual image through the AI pipeline.
- **Shareable pages:** save document metadata and summaries with a dedicated reading URL.
- **Responsive reading:** use the interface on desktop and mobile screens.

## How it works

1. PDF.js extracts searchable text in the browser.
2. The application divides the text into chunks and requests AI summaries.
3. A final request produces an overview from the section summaries.
4. The PDF and generated image are stored in Amazon S3.
5. Prisma saves the document and its ordered sections in PostgreSQL.
6. The application opens the saved reading page at `/pdf/[id]`.

## Technology

| Area | Implementation |
| --- | --- |
| Application | Next.js App Router, React, TypeScript |
| Interface | Tailwind CSS, Radix UI, Lucide icons |
| PDF extraction | PDF.js |
| AI inference | Together AI |
| Data storage | PostgreSQL with Prisma |
| File storage | Amazon S3 with presigned PDF uploads |
| Input and output handling | Zod validation and HTML sanitization |
| Tests | Vitest |
| Optional observability | Braintrust |

Model identifiers are defined in `src/lib/summary-model.ts` and `src/app/api/image/route.ts`. Check provider access before running the application; the static model check does not verify live endpoint availability.

## Getting started

### Requirements

- Node.js 22 and pnpm 11.18.0, as specified in `package.json`
- A PostgreSQL database
- A Together AI API key with access to the configured models
- An Amazon S3 bucket and credentials with the required object permissions

### Installation

Open a terminal in the extracted project directory, then install dependencies:

```sh
pnpm install --frozen-lockfile
```

Copy `.example.env` to `.env`:

```sh
# Windows Command Prompt
copy .example.env .env

# macOS / Linux
cp .example.env .env
```

Fill in your own credentials, then initialize a **new development database**:

```sh
pnpm prisma generate
pnpm prisma db push
pnpm dev
```

Open **http://localhost:3000**. Existing databases require a reviewed migration; do not apply schema changes blindly to stored data.

### Configuration

| Variable | Required | Purpose |
| --- | --- | --- |
| `TOGETHER_API_KEY` | Yes | Text and image inference |
| `DATABASE_URL` | Yes | PostgreSQL connection URL |
| `S3_UPLOAD_KEY` | Yes | AWS access key |
| `S3_UPLOAD_SECRET` | Yes | AWS secret access key |
| `S3_UPLOAD_BUCKET` | Yes | Upload bucket name |
| `S3_UPLOAD_REGION` | Yes | Bucket region |
| `BRAINTRUST_API_KEY` | No | Enable inference observability |
| `BRAINTRUST_PROJECT` | No | Observability project; defaults to `summary-pdf` |

Keep credentials in environment variables. The repository includes an empty configuration template, not usable credentials.

See [Deployment and operations](docs/DEPLOYMENT.md) for S3, image-host, database, and hosting requirements.

## Development commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Run the production server |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run Vitest tests |
| `pnpm verify:models` | Check configured identifiers against removed endpoints |
| `pnpm benchmark:summaries` | Run the summary benchmark; requires provider credentials |

## Project structure

| Path | Responsibility |
| --- | --- |
| `src/app/page.tsx` | Upload and summary workflow |
| `src/app/api/` | Summarization, image generation, and upload endpoints |
| `src/app/pdf/[id]/` | Saved document reading pages |
| `src/app/actions.ts` | Persist and open shared summaries |
| `src/components/` | Upload controls, navigation, and reading interface |
| `src/lib/` | AI, storage, validation, rate limiting, and tests |
| `prisma/schema.prisma` | Document, section, and rate-limit models |
| `scripts/` | Model verification and benchmark utilities |
| `docs/research/` | Historical research notes; not current deployment guarantees |

## Current limitations

- Accepts PDFs up to 15 MiB and 500 pages. Documents must provide at least 500 extracted text characters.
- Scanned image-only PDFs need OCR before upload; OCR is not implemented here.
- AI output can omit details or contain errors. Compare important points with the source document.
- Shared pages have no account-based access control. Anyone with a working page or file URL can access its content.
- Extracted text is sent to the AI provider; files are uploaded to S3. This is not an offline-only tool.
- AI inference, storage, and hosting depend on external services and may incur charges.

## Maintenance and license

Maintainer: **Sunny Kumar**. This repository contains the Summary PDF customization of an MIT-licensed application. The original copyright and permission notice are preserved in [LICENSE](LICENSE).
