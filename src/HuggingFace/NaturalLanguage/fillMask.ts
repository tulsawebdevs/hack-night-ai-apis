//https://huggingface.co/docs/api-inference/detailed_parameters#fill-mask-task
const API_TOKEN = process.env.HUGGINGFACE_API_KEY;

type FillMaskInput = {
  inputs: string;
  options?: {
    use_cache?: boolean;
    wait_for_model?: boolean;
  }
}

type FillMaskResponse = {
  sequence: string;
  score: number;
  token: number;
  token_str: string;
}

export const fillMask = async (endpointUrl: string, input: FillMaskInput): Promise<FillMaskResponse[]> => {
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

export const fillMaskExample = async () => {
  const input: FillMaskInput = {
    inputs: "Paris is the [MASK] of France."
  };

  const predictions = await fillMask(
		"https://api-inference.huggingface.co/models/bert-base-uncased",
		input
	);
  console.log(predictions);
};
