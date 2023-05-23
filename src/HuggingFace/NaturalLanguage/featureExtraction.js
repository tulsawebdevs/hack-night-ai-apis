//https://huggingface.co/docs/api-inference/detailed_parameters#feature-extraction-task
const API_TOKEN = process.env.HUGGINGFACE_API_KEY;

/**
 * @param {string} endpointUrl
 * @param {FeatureExtractionInput} input
 * @return {Promise<FeatureExtractionResponse>}
 */
export const featureExtraction = async (endpointUrl, input) => {
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

export const featureExtractionExample = async () => {
  const features = await featureExtraction(
		"https://api-inference.huggingface.co/models/sentence-transformers",
	{
    inputs: "This is a sample text for feature extraction."
  });

  console.log(features);
};

/**
 * @typedef FeatureExtractionInput
 * @type {Object}
 * @property {string|string[]} inputs
 * @property {Object} [options]
 * @property {boolean} [options.use_cache]
 * @property {boolean} [options.wait_for_model]
 */

/**
 * @typedef FeatureExtractionResponse
 * @type {number[]|number[][]}
 */
