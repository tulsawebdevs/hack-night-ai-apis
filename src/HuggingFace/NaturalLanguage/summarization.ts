//https://huggingface.co/docs/api-inference/detailed_parameters#summarization-task
const API_TOKEN = process.env.HUGGINGFACE_API_KEY;

type SummarizationInput = {
  inputs: string;
  parameters?: {
    min_length?: number;
    max_length?: number;
    top_k?: number;
    top_p?: number;
    temperature?: number;
    repetition_penalty?: number;
    max_time?: number;
  }
  options?: {
    use_cache?: boolean;
    wait_for_model?: boolean;
  }
}

type SummarizationResponse = {
  summary_text: string;
}

export const summarization = async (endpointUrl: string, input: SummarizationInput): Promise<SummarizationResponse[]> => {
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

export const summarizationExample = async () => {
  const input: SummarizationInput = {
    inputs: "A long text to be summarized..."
  };

  const summary = await summarization(
		"https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
		input
	);
  console.log(summary);
};
