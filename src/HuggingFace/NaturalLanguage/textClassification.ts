//https://huggingface.co/docs/api-inference/detailed_parameters#text-classification-task
const API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

type TextClassificationInput = {
  inputs: string;
  options?: {
    use_cache?: boolean;
    wait_for_model?: boolean;
  };
};

type TextClassificationResponse = {
  label: string;
  score: number;
};

export const textClassification = async (endpointUrl: string, input: TextClassificationInput): Promise<TextClassificationResponse[]> => {
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

export const textClassificationExample = async () => {
  const input: TextClassificationInput = {
    inputs: "I like you. I love you"
  };

  const classificationResult = await textClassification(
		"https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english",
		input
	);
  console.log(classificationResult);
};
