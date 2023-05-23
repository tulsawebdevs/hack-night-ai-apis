//https://huggingface.co/docs/api-inference/detailed_parameters#question-answering-task
const API_TOKEN = process.env.HUGGINGFACE_API_KEY;

/**
 * @param {string} endpointUrl
 * @param {QAInput} input
 * @return {Promise<QAResponse>}
 */
export const questionAnswering = async (endpointUrl, input) => {
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

export const questionAnsweringExample = async () => {
  const answer = await questionAnswering(
		"https://api-inference.huggingface.co/models/deepset/roberta-base-squad2",
	{
    inputs: {
      question: "Who is the president of the United States?",
      context: "The current president of the United States is Joe Biden."
    }
  });

  console.log(answer);
};

/**
 * @typedef QAInput
 * @type {Object}
 * @property {Object} inputs
 * @property {string} inputs.question
 * @property {string} inputs.context
 */

/**
 * @typedef QAResponse
 * @type {Object}
 * @property {string} answer
 * @property {number} score
 * @property {number} start
 * @property {number} end
 */
