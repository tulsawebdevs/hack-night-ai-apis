/**
 * @param {string} url
 * @return {Promise<ArrayBuffer>}
 */
export const loadImage = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const buffer = await new Response(blob).arrayBuffer();
  return buffer;
};