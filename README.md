# Summary PDF

A focused PDF reading companion maintained by Sunny Kumar. Turn searchable PDFs into short summaries, detailed notes, or key points in eight languages.

## Features

- Drag-and-drop PDF selection and page-by-page extraction progress
- Short, detailed, and key-points summaries through Google Gemini
- English, Hindi, German, French, Italian, Portuguese, Spanish, and Thai
- Copy, plain-text download, and browser print / Save as PDF
- Opt-in browser history for the ten most recent summaries
- Responsive layout, accessible controls, validation, and clear error messages

## Setup

Use Node.js 22. Run `npm install`, copy `.example.env` to `.env.local`, and set `GEMINI_API_KEY`. Run `npm run dev`. For production use `npm run build` then `npm start`.

The build copies PDF.js's worker into `public` using the prebuild/predev scripts. The API key is used only on the server. `GEMINI_MODEL` is configurable; model access and free-tier quotas depend on your Google account. Free usage is not unlimited or guaranteed.

## Data and limits

PDF bytes stay in the browser. Extracted text is sent through the server to Google Gemini. Avoid confidential documents. There is no database or S3 requirement, and no permanent sharing URL. Browser history is opt-in, device-specific, and can be cleared.

Limits: 15 MiB, 100 pages, and 100,000 extracted characters. Scanned PDFs need OCR first. A process-local budget permits 30 requests per hour with two concurrent requests. It resets on restart and is not a distributed quota. Configure provider quotas as an additional cost control.

AI output can be inaccurate. Review important facts against the original. Export to PDF uses the browser print dialog; select Save as PDF there.

## Stack

Next.js, React, TypeScript, PDF.js, and the Gemini REST API.

## License

MIT. Original copyright and permission notice retained in LICENSE. Maintained and customized by Sunny Kumar.
