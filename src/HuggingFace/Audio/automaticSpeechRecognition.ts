//https://huggingface.co/docs/api-inference/detailed_parameters#automatic-speech-recognition-task
import { fetchAudioData } from './util/fetchAudioData'

const API_TOKEN = process.env.HUGGINGFACE_API_KEY; 
const exampleAudioDataUrl = "https://upload.wikimedia.org/wikipedia/commons/d/dd/Armstrong_Small_Step.ogg"

type AutomaticSpeechRecognitionInput = {
  audio_data: ArrayBuffer;
};

type AutomaticSpeechRecognitionResponse = {
  text: string;
};

export const automaticSpeechRecognition = async (endpointUrl: string, input: AutomaticSpeechRecognitionInput): Promise<AutomaticSpeechRecognitionResponse> => {
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

  const input: AutomaticSpeechRecognitionInput = {
    audio_data: audioData
  };

  const asrResult = await automaticSpeechRecognition(
		"https://api-inference.huggingface.co/models/facebook/wav2vec2-base-960h",
		input
	);
  console.log(asrResult);
};
