export const loadImage = async (url: string): Promise<ArrayBuffer> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const buffer = await new Response(blob).arrayBuffer();
  return buffer;
};