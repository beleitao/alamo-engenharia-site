import { decode as decodeJpeg, encode as encodeJpeg } from "jpeg-js";
import { decode as decodePng, encode as encodePng } from "fast-png";
import { MAX_ATTACHMENT_BYTES, MAX_ATTACHMENTS, type FormAttachment } from "./attachment-policy";

// Never forward the original bytes: rebuilding pixels strips metadata, scripts and appended payloads.
export function sanitizeAttachments(attachments: FormAttachment[]) {
  if (attachments.length > MAX_ATTACHMENTS) throw new Error("Limite de anexos excedido.");
  return attachments.map((attachment, index) => {
    if (!/^[^\\/\x00-\x1f]{1,180}\.(png|jpe?g)$/i.test(attachment.name) || !/^[A-Za-z0-9+/]+={0,2}$/.test(attachment.content)) throw new Error("Anexo não permitido.");
    const bytes = Uint8Array.from(atob(attachment.content), (c) => c.charCodeAt(0));
    if (!bytes.length || bytes.length > MAX_ATTACHMENT_BYTES) throw new Error("Anexo muito grande ou vazio.");
    let clean: Uint8Array;
    let extension: string;
    try {
      if (/\.png$/i.test(attachment.name)) {
        const view = new DataView(bytes.buffer);
        if (bytes.length < 24 || ![137, 80, 78, 71, 13, 10, 26, 10].every((b, i) => bytes[i] === b)) throw new Error("PNG inválido");
        const width = view.getUint32(16), height = view.getUint32(20);
        if (!width || !height || width > 6000 || height > 6000 || width * height > 8_000_000) throw new Error("Imagem muito grande");
        const image = decodePng(bytes, { checkCrc: true });
        clean = encodePng({ width: image.width, height: image.height, data: image.data, depth: image.depth, channels: image.channels, ...(image.palette ? { palette: image.palette } : {}) });
        extension = "png";
      } else {
        if (bytes[0] !== 255 || bytes[1] !== 216 || bytes[2] !== 255) throw new Error("JPEG inválido");
        const image = decodeJpeg(bytes, { useTArray: true, tolerantDecoding: false, maxResolutionInMP: 8, maxMemoryUsageInMB: 64 });
        clean = new Uint8Array(encodeJpeg({ width: image.width, height: image.height, data: image.data }, 85).data);
        extension = "jpg";
      }
    } catch {
      throw new Error("Imagem inválida ou acima do limite de 8 megapixels. Escolha outra imagem.");
    }
    if (clean.length > MAX_ATTACHMENT_BYTES) throw new Error("Imagem tratada excede 5 MB.");
    let binary = "";
    for (let offset = 0; offset < clean.length; offset += 8192) binary += String.fromCharCode(...clean.subarray(offset, offset + 8192));
    return { filename: `anexo-${index + 1}.${extension}`, content: btoa(binary) };
  });
}