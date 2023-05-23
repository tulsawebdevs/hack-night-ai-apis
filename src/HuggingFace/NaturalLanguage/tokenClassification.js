//https://huggingface.co/docs/api-inference/detailed_parameters#token-classification-task
const API_TOKEN = process.env.HUGGINGFACE_API_KEY;

/**
 * @param {string} endpointUrl
 * @param {TokenClassificationInput} input
 * @return {Promise<TokenClassificationResponse[]>}
 */
export const tokenClassification = async (endpointUrl, input) => {
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

export const tokenClassificationExample = async () => {
  const entities = await tokenClassification(
		"https://api-inference.huggingface.co/models/dbmdz/bert-large-cased-finetuned-conll03-english",
	{
    inputs: "My name is Sarah Jessica Parker but you can call me Jessica"
  });

  console.log(entities);
};

/**
 * @typedef TokenClassificationInput
 * @type {Object}
 * @property {string} inputs
 * @property {Object} [parameters]
 * @property {string} [parameters.aggregation_strategy]
 * @property {Object} [options]
 * @property {boolean} [options.use_cache]
 * @property {boolean} [options.wait_for_model]
 */

/**
 * @typedef TokenClassificationResponse
 * @type {Object}
 * @property {string} entity_group
 * @property {number} score
 * @property {string} word
 * @property {number} start
 * @property {number} end
 */
