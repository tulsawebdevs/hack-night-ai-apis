//https://huggingface.co/docs/api-inference/detailed_parameters#text-generation-task
const API_TOKEN = process.env.HUGGINGFACE_API_KEY;

/**
 * @param {string} endpointUrl
 * @param {TextGenerationInput} input
 * @return {Promise<TextGenerationResponse[]>}
 */
export const textGeneration = async (endpointUrl, input) => {
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

export const textGenerationExample = async () => {
  const generatedText = await textGeneration(
		"https://api-inference.huggingface.co/models/gpt2",
	{
    inputs: "The answer to the universe is"
  });

  console.log(generatedText);
};

/**
 * @typedef TextGenerationInput
 * @type {Object}
 * @property {string} inputs
 * @property {Object} [parameters]
 * @property {number} [parameters.top_k]
 * @property {number} [parameters.top_p]
 * @property {number} [parameters.temperature]
 * @property {number} [parameters.repetition_penalty]
 * @property {number} [parameters.max_new_tokens]
 * @property {number} [parameters.max_time]
 * @property {boolean} [parameters.return_full_text]
 * @property {number} [parameters.num_return_sequences]
 * @property {boolean} [parameters.do_sample]
 * @property {Object} [options]
 * @property {boolean} [options.use_cache]
 * @property {boolean} [options.wait_for_model]
 */

/**
 * @typedef TextGenerationResponse
 * @type {Object}
 * @property {string} generated_text
 */
