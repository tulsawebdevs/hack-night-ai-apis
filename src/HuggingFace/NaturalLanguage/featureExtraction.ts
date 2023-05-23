//https://huggingface.co/docs/api-inference/detailed_parameters#feature-extraction-task
const API_TOKEN = process.env.HUGGINGFACE_API_KEY;

type FeatureExtractionInput = {
  inputs: string | string[];
  options?: {
    use_cache?: boolean;
    wait_for_model?: boolean;
  };
};

type FeatureExtractionResponse = number[] | number[][];

export const featureExtraction = async (endpointUrl: string, input: FeatureExtractionInput): Promise<FeatureExtractionResponse> => {
  const response = await fetch(
    endpointUrl,
    {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      method: "POST",
      body: JSON.stringify(input),
    }
  );

  const result = await response.json();
  return result;
};

export const featureExtractionExample = async () => {
  const input: FeatureExtractionInput = {
    inputs: "This is a sample text for feature extraction."
  };

  const features = await featureExtraction(
		"https://api-inference.huggingface.co/models/sentence-transformers",
		input
	);
  console.log(features);
};
