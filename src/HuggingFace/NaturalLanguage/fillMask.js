//https://huggingface.co/docs/api-inference/detailed_parameters#fill-mask-task
const API_TOKEN = process.env.HUGGINGFACE_API_KEY;

/**
 * @param {string} endpointUrl
 * @param {FillMaskInput} input
 * @return {Promise<FillMaskResponse[]>}
 */
export const fillMask = async (endpointUrl, input) => {
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
  const predictions = await fillMask(
		"https://api-inference.huggingface.co/models/bert-base-uncased",
	{
    inputs: "Paris is the [MASK] of France."
  });

  console.log(predictions);
};

/**
 * @typedef FillMaskInput
 * @type {Object}
 * @property {string} inputs
 * @property {Object} [options]
 * @property {boolean} [options.use_cache]
 * @property {boolean} [options.wait_for_model]
 */

/**
 * @typedef FillMaskResponse
 * @type {Object}
 * @property {string} sequence
 * @property {number} score
 * @property {number} token
 * @property {string} token_str
 */
