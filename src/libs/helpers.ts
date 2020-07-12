export const toBase64 = (file) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export function getNextElementInLoop(current, list: any[]) {
  const index = list.indexOf(current) + 1;
  if (index <= -1 || index > list.length - 1) {
    return list[0];
  }
  return list[index];
}

export function blobToFile(theBlob: Blob, fileName: string): File {
  const blob: any = new Blob([theBlob]);
  blob.lastModifiedDate = new Date();
  blob.name = fileName;
  return blob as File;
}
