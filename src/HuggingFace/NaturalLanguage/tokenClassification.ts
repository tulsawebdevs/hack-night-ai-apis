//https://huggingface.co/docs/api-inference/detailed_parameters#token-classification-task
const API_TOKEN = process.env.HUGGINGFACE_API_KEY;

type TokenClassificationInput = {
  inputs: string;
  parameters?: {
    aggregation_strategy?: string;
  };
  options?: {
    use_cache?: boolean;
    wait_for_model?: boolean;
  };
};

type TokenClassificationResponse = {
  entity_group: string;
  score: number;
  word: string;
  start: number;
  end: number;
};

export const tokenClassification = async (endpointUrl: string, input: TokenClassificationInput): Promise<TokenClassificationResponse[]> => {
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

export const tokenClassificationExample = async () => {
  const input: TokenClassificationInput = {
    inputs: "My name is Sarah Jessica Parker but you can call me Jessica"
  };

  const entities = await tokenClassification(
		"https://api-inference.huggingface.co/models/dbmdz/bert-large-cased-finetuned-conll03-english",
		input
	);
  console.log(entities);
};

