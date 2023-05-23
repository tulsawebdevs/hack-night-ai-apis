//https://huggingface.co/docs/api-inference/detailed_parameters#text-classification-task
const API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

/**
 * @param {string} endpointUrl
 * @param {TextClassificationInput} input
 * @return {Promise<TextClassificationResponse[]>}
 */
export const textClassification = async (endpointUrl, input) => {
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

export const textClassificationExample = async () => {
  const classificationResult = await textClassification(
		"https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english",
	{
    inputs: "I like you. I love you"
  });

  console.log(classificationResult);
};

/**
 * @typedef TextClassificationInput
 * @type {Object}
 * @property {string} inputs
 * @property {Object} [options]
 * @property {boolean} [options.use_cache]
 * @property {boolean} [options.wait_for_model]
 */

/**
 * @typedef TextClassificationResponse
 * @type {Object}
 * @property {string} label
 * @property {number} score
 */
