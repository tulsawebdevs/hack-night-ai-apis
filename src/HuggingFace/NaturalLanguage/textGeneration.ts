//https://huggingface.co/docs/api-inference/detailed_parameters#text-generation-task
const API_TOKEN = process.env.HUGGINGFACE_API_KEY;

type TextGenerationInput = {
  inputs: string;
  parameters?: {
    top_k?: number;
    top_p?: number;
    temperature?: number;
    repetition_penalty?: number;
    max_new_tokens?: number;
    max_time?: number;
    return_full_text?: boolean;
    num_return_sequences?: number;
    do_sample?: boolean;
  };
  options?: {
    use_cache?: boolean;
    wait_for_model?: boolean;
  };
};

type TextGenerationResponse = {
  generated_text: string;
};

export const textGeneration = async (endpointUrl: string, input: TextGenerationInput): Promise<TextGenerationResponse[]> => {
  const response = await fetch(endpointUrl,
    {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      method: "POST",
      body: JSON.stringify(input),
    }
  );

  const result = await response.json();
  return result;
};

export const textGenerationExample = async () => {
  const input: TextGenerationInput = {
    inputs: "The answer to the universe is"
  };

  const generatedText = await textGeneration("https://api-inference.huggingface.co/models/gpt2", input);
  console.log(generatedText);
};
