/**
 * @param {string} url
 * @return {Promise<ArrayBuffer>}
 */
export const fetchAudioData = async (url) => {
  const response = await fetch(url);
  return await response.arrayBuffer();
};