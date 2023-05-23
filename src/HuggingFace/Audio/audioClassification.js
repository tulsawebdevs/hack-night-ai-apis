//https://huggingface.co/docs/api-inference/detailed_parameters#audio-classification-task
import { fetchAudioData } from './util/fetchAudioData'

const API_TOKEN = process.env.HUGGINGFACE_API_KEY;
const exampleAudioDataUrl = "https://upload.wikimedia.org/wikipedia/commons/d/dd/Armstrong_Small_Step.ogg"

/**
 * @param {string} endpointUrl
 * @param {AudioClassificationInput} input
 * @return {Promise<AudioClassificationResponse[]>}
 */
export const audioClassification = async (endpointUrl, input) => {
  const response = await fetch(
    endpointUrl,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/octet-stream"
      },
      method: "POST",
      body: input.audio_data,
    }
  );

  const result = await response.json();
  return result;
};

export const audioClassificationExample = async () => {
  const audioData = await fetchAudioData(exampleAudioDataUrl)

  const classificationResult = await audioClassification(
		"https://api-inference.huggingface.co/models/superb/hubert-large-superb-er",
	{
    audio_data: audioData
  });

  console.log(classificationResult);
};

/**
 * @typedef AudioClassificationInput
 * @type {Object}
 * @property {ArrayBuffer} audio_data
 */

/**
 * @typedef AudioClassificationResponse
 * @type {Object}
 * @property {string} label
 * @property {number} score
 */
