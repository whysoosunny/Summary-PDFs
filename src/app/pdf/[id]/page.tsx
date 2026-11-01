import SummaryPDFViewer from "@/app/pdf/[id]/summary-pdf-viewer";
import client from "@/lib/prisma";
import { sanitizeSummaryHtml } from "@/lib/summary-model";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import { Metadata, ResolvingMetadata } from "next";

const getSummaryPDF = unstable_cache(
  async (id: string) => {
    const summaryPdf = await client.summaryPDF.findUnique({
      where: { id },
      include: { sections: { orderBy: { position: "asc" } } },
    });
    if (!summaryPdf) return null;

    return {
      ...summaryPdf,
      pdfUrl: summaryPdf.pdfUrl.startsWith("https://") ? summaryPdf.pdfUrl : "",
      sections: summaryPdf.sections.map((section) => ({
        ...section,
        summary: sanitizeSummaryHtml(section.summary),
      })),
    };
  },
  ["summary-pdf-query"],
  { revalidate: false },
);

export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const { id } = await params;
  const parentData = await parent;

  // fetch data
  const summaryPdf = await getSummaryPDF(id);

  if (!summaryPdf) notFound();

  return {
    title: `${summaryPdf.sections[0].title.slice(0, 60)} | ${parentData.title?.absolute}`,
    description: `${summaryPdf.sections[0].summary
      .replace(/<[^>]*>/g, "")
      .slice(0, 160)}...`,
    openGraph: {
      images: [summaryPdf.imageUrl],
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const summaryPdf = await getSummaryPDF(id);

  if (!summaryPdf) notFound();

  return <SummaryPDFViewer summaryPdf={summaryPdf} />;
}
