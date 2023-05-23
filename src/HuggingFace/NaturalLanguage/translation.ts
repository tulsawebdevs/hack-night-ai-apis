//https://huggingface.co/docs/api-inference/detailed_parameters#translation-task
const API_TOKEN = process.env.HUGGINGFACE_API_KEY;

type TranslationInput = {
  inputs: string;
  options?: {
    use_cache?: boolean;
    wait_for_model?: boolean;
  };
};

type TranslationResponse = {
  translation_text: string;
};

export const translation = async (endpointUrl: string, input: TranslationInput): Promise<TranslationResponse[]> => {
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

export const translationExample = async () => {
  const input: TranslationInput = {
    inputs: "Меня зовут Вольфганг и я живу в Берлине"
  };

  const translations = await translation(
		"https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-ru-en",
		input
	);
  console.log(translations);
};

