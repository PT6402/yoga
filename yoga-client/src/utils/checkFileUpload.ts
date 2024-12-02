function getExtension(filename: string) {
  const parts = filename.split(".");
  return parts[parts.length - 1];
}
export function isImage(filename: string) {
  const ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case "jpg":
    case "png":
      return true;
  }
  return false;
}
export function extractFileNamePart(fileName: string): string {
  const underscoreIndex = fileName.indexOf("_");
  return underscoreIndex !== -1
    ? fileName.substring(underscoreIndex + 1)
    : fileName;
}
