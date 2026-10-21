export const ATTACHMENT_ACCEPT = ".png,.jpg,.jpeg";
export const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
export const MAX_ATTACHMENTS = 3;

export type FormAttachment = { name: string; content: string };

export async function prepareAttachments(files: File[]): Promise<FormAttachment[]> {
  if (files.length > MAX_ATTACHMENTS) throw new Error("Envie no máximo 3 imagens por solicitação.");
  return Promise.all(files.map(async (file) => {
    if (!/^[^\\/\x00-\x1f]+\.(png|jpe?g)$/i.test(file.name) || /\.(exe|js|html|svg|zip|docm|xlsm|bat|cmd|scr|ps1)\./i.test(file.name)) {
      throw new Error("Formato não permitido. Envie apenas imagens PNG ou JPEG.");
    }
    if (!file.size || file.size > MAX_ATTACHMENT_BYTES) throw new Error("Cada imagem deve ter até 5 MB e não pode estar vazia.");
    const bytes = new Uint8Array(await file.arrayBuffer());
    const png = bytes.slice(0, 8).every((byte, i) => byte === [137, 80, 78, 71, 13, 10, 26, 10][i]) && bytes.length >= 24;
    const jpeg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
    if ((/\.png$/i.test(file.name) && !png) || (/\.jpe?g$/i.test(file.name) && !jpeg)) throw new Error("O conteúdo do arquivo não corresponde a uma imagem válida.");
    let binary = "";
    for (let offset = 0; offset < bytes.length; offset += 8192) binary += String.fromCharCode(...bytes.subarray(offset, offset + 8192));
    return { name: file.name, content: btoa(binary) };
  }));
}