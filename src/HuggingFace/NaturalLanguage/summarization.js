//https://huggingface.co/docs/api-inference/detailed_parameters#summarization-task
const API_TOKEN = process.env.HUGGINGFACE_API_KEY;

/**
 * @param {string} endpointUrl
 * @param {SummarizationInput} input
 * @return {Promise<SummarizationResponse[]>}
 */
export const summarization = async (endpointUrl, input) => {
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
  const summary = await summarization(
		"https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
	{
    inputs: "A long text to be summarized..."
  });

  console.log(summary);
};

/**
 * @typedef SummarizationInput
 * @type {Object}
 * @property {string} inputs
 * @property {Object} [parameters]
 * @property {number} [parameters.min_length]
 * @property {number} [parameters.max_length]
 * @property {number} [parameters.top_k]
 * @property {number} [parameters.top_p]
 * @property {number} [parameters.temperature]
 * @property {number} [parameters.repetition_penalty]
 * @property {number} [parameters.max_time]
 * @property {Object} [options]
 * @property {boolean} [options.use_cache]
 * @property {boolean} [options.wait_for_model]
 */

/**
 * @typedef SummarizationResponse
 * @type {Object}
 * @property {string} summary_text
 */
