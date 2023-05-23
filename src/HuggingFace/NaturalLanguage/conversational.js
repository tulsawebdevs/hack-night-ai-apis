// https://huggingface.co/docs/api-inference/detailed_parameters#conversational-task
const API_TOKEN = process.env.HUGGINGFACE_API_KEY;

/**
 * @param {string} endpointUrl
 * @param {ConversationalInput} input
 * @return {Promise<ConversationalResponse>}
 */
export const conversational = async (endpointUrl, input) => {
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

  const conversationResult = await conversational(
		"https://api-inference.huggingface.co/models/microsoft/DialoGPT-large",
	{
    inputs: {
      past_user_inputs: ["Which movie is the best ?"],
      generated_responses: ["It is Die Hard for sure."],
      text: "Can you explain why ?"
    }
  });

  console.log(conversationResult);
};

/**
 * @typedef ConversationalInput
 * @type {Object}
 * @property {Object} inputs
 * @property {string} inputs.text
 * @property {string[]} [inputs.generated_responses]
 * @property {string[]} [inputs.past_user_inputs]
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
 * @typedef ConversationalResponse
 * @type {Object}
 * @property {string} generated_text
 * @property {Object} conversation
 * @property {string[]} conversation.past_user_inputs
 * @property {string[]} conversation.generated_responses
 */
