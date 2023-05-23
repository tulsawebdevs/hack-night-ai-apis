//https://huggingface.co/docs/api-inference/detailed_parameters#audio-classification-task
import { fetchAudioData } from './util/fetchAudioData'

const API_TOKEN = process.env.HUGGINGFACE_API_KEY;
const exampleAudioDataUrl = "https://upload.wikimedia.org/wikipedia/commons/d/dd/Armstrong_Small_Step.ogg"

type AudioClassificationInput = {
  audio_data: ArrayBuffer;
};

type AudioClassificationResponse = {
  label: string;
  score: number;
};

export const audioClassification = async (endpointUrl: string, input: AudioClassificationInput): Promise<AudioClassificationResponse[]> => {
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

  const input: AudioClassificationInput = {
    audio_data: audioData
  };

  const classificationResult = await audioClassification(
		"https://api-inference.huggingface.co/models/superb/hubert-large-superb-er",
		input
	);
  console.log(classificationResult);
};
