//https://huggingface.co/docs/api-inference/detailed_parameters#automatic-speech-recognition-task
import { fetchAudioData } from './util/fetchAudioData'

const API_TOKEN = process.env.HUGGINGFACE_API_KEY;
const exampleAudioDataUrl = "https://upload.wikimedia.org/wikipedia/commons/d/dd/Armstrong_Small_Step.ogg"

/**
 * @param {string} endpointUrl
 * @param {AutomaticSpeechRecognitionInput} input
 * @return {Promise<AutomaticSpeechRecognitionResponse>}
 */
export const automaticSpeechRecognition = async (endpointUrl, input) => {
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

export const automaticSpeechRecognitionExample = async () => {
  const audioData = await fetchAudioData(exampleAudioDataUrl)

  const asrResult = await automaticSpeechRecognition(
		"https://api-inference.huggingface.co/models/facebook/wav2vec2-base-960h",
	{
    audio_data: audioData
  });

  console.log(asrResult);
};

/**
 * @typedef AutomaticSpeechRecognitionInput
 * @type {Object}
 * @property {ArrayBuffer} audio_data
 */

/**
 * @typedef AutomaticSpeechRecognitionResponse
 * @type {Object}
 * @property {string} text
 */
