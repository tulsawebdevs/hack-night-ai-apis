//https://huggingface.co/docs/api-inference/detailed_parameters#conversational-task
const API_TOKEN = process.env.HUGGINGFACE_API_KEY;

type ConversationalInput = {
  inputs: {
    text: string;
    generated_responses?: string[];
    past_user_inputs?: string[];
  };
  parameters?: {
    min_length?: number;
    max_length?: number;
    top_k?: number;
    top_p?: number;
    temperature?: number;
    repetition_penalty?: number;
    max_time?: number;
  };
  options?: {
    use_cache?: boolean;
    wait_for_model?: boolean;
  };
};

type ConversationalResponse = {
  generated_text: string;
  conversation: {
    past_user_inputs: string[];
    generated_responses: string[];
  };
};

export const conversational = async (endpointUrl: string, input: ConversationalInput): Promise<ConversationalResponse> => {
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

export const conversationalExample = async () => {
  const input: ConversationalInput = {
    inputs: {
      past_user_inputs: ["Which movie is the best ?"],
      generated_responses: ["It is Die Hard for sure."],
      text: "Can you explain why ?"
    }
  };

  const conversationResult = await conversational(
		"https://api-inference.huggingface.co/models/microsoft/DialoGPT-large",
		input
	);
  console.log(conversationResult);
};
