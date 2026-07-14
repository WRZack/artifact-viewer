/**
 * Load binary artifact data from a URL using the Fetch API.
 *
 * Works in any modern browser environment without external HTTP clients.
 * Supports arraybuffer responses and normalises Blob / Uint8Array / string
 * payloads into an ArrayBuffer for downstream consumers (e.g. pdfjs, mammoth).
 */
export async function loadBinaryArtifact(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch artifact: ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type') || '';

  // If the response is a Blob (e.g. streamed binary), convert to ArrayBuffer
  if (contentType.includes('application/octet-stream') || contentType.startsWith('image/') || contentType.includes('application/pdf') || contentType.includes('wordprocessingml')) {
    const blob = await response.blob();
    return blob.arrayBuffer();
  }

  // Default: read as ArrayBuffer
  return response.arrayBuffer();
}
