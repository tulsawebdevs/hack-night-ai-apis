export const fetchAudioData = async (url: string): Promise<ArrayBuffer> => {
  const response = await fetch(url);
  return await response.arrayBuffer();
};