import JSZip from "jszip";
import mammoth from "mammoth/mammoth.browser";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";

let pdfWorkerReady = false;

function ensurePdfWorker() {
  if (pdfWorkerReady) return;
  GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();
  pdfWorkerReady = true;
}

export async function extractPdfText(file: File): Promise<string> {
  ensurePdfWorker();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;
  const pages: string[] = [];

  for (let i = 1; i <= pdf.numPages; i += 1) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ");
    pages.push(pageText.trim());
  }

  return pages.filter(Boolean).join("\n");
}

export async function extractDocxText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value.trim();
}

export async function extractPptxText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);
  const slideFiles = Object.keys(zip.files)
    .filter((name) => name.startsWith("ppt/slides/slide") && name.endsWith(".xml"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const slidesText: string[] = [];
  const parser = new DOMParser();

  for (const name of slideFiles) {
    const xml = await zip.files[name].async("string");
    const doc = parser.parseFromString(xml, "application/xml");
    const nodes = Array.from(doc.getElementsByTagName("a:t"));
    const text = nodes.map((node) => node.textContent ?? "").join(" ").trim();
    if (text) slidesText.push(text);
  }

  return slidesText.join("\n");
}

export async function extractTextFromFile(file: File): Promise<string> {
  const extension = file.name.split(".").pop()?.toLowerCase();
  const mimeType = file.type;

  if (extension === "pdf" || mimeType === "application/pdf") {
    return extractPdfText(file);
  }

  if (
    extension === "docx" ||
    mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return extractDocxText(file);
  }

  if (
    extension === "pptx" ||
    mimeType === "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  ) {
    return extractPptxText(file);
  }

  if (extension === "doc") {
    throw new Error("DOC files are not supported in the browser. Convert to DOCX.");
  }

  throw new Error("Unsupported file type. Use PDF, DOCX, or PPTX.");
}

