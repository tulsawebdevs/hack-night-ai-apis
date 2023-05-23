//https://huggingface.co/docs/api-inference/detailed_parameters#translation-task
const API_TOKEN = process.env.HUGGINGFACE_API_KEY;

/**
 * @param {string} endpointUrl
 * @param {TranslationInput} input
 * @return {Promise<TranslationResponse[]>}
 */
export const translation = async (endpointUrl, input) => {
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
  const translations = await translation(
		"https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-ru-en",
	{
    inputs: "Меня зовут Вольфганг и я живу в Берлине"
  });

  console.log(translations);
};

/**
 * @typedef TranslationInput
 * @type {Object}
 * @property {string} inputs
 * @property {Object} [options]
 * @property {boolean} [options.use_cache]
 * @property {boolean} [options.wait_for_model]
 */

/**
 * @typedef TranslationResponse
 * @type {Object}
 * @property {string} translation_text
 */
