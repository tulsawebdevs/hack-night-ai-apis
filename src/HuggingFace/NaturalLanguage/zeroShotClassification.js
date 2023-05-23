//https://huggingface.co/docs/api-inference/detailed_parameters#zeroshot-classification-task
const API_TOKEN = process.env.HUGGINGFACE_API_KEY;

/**
 * @param {string} endpointUrl
 * @param {ZeroShotClassificationInput} input
 * @return {Promise<ZeroShotClassificationResponse>}
 */
export const zeroShotClassification = async (endpointUrl, input) => {
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

export const zeroShotClassificationExample = async () => {
  const classificationResult = await zeroShotClassification(
		"https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
	{
    inputs: "Hi, I recently bought a device from your company but it is not working as advertised and I would like to get reimbursed!",
    parameters: {
      candidate_labels: ["refund", "legal", "faq"]
    }
  });

  console.log(classificationResult);
};

/**
 * @typedef ZeroShotClassificationInput
 * @type {Object}
 * @property {string} inputs
 * @property {Object} parameters
 * @property {string[]} parameters.candidate_labels
 * @property {boolean} [parameters.multi_label]
 * @property {Object} [options]
 * @property {boolean} [options.use_cache]
 * @property {boolean} [options.wait_for_model]
 */

/**
 * @typedef ZeroShotClassificationResponse
 * @type {Object}
 * @property {string} sequence
 * @property {string[]} labels
 * @property {number[]} scores
 */
