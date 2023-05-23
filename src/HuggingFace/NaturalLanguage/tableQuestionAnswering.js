//https://huggingface.co/docs/api-inference/detailed_parameters#table-question-answering-task
const API_TOKEN = process.env.HUGGINGFACE_API_KEY;

/**
 * @param {string} endpointUrl
 * @param {TableQAInput} input
 * @return {Promise<TableQAResponse>}
 */
export const tableQuestionAnswering = async (endpointUrl, input) => {
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

export const tableQuestionAnsweringExample = async () => {
  const answer = await tableQuestionAnswering(
		"https://api-inference.huggingface.co/models/google/tapas-base-finetuned-wtq",
	{
    inputs: {
      query: "Who scored the most goals?",
      table: {
        "Player": ["Player A", "Player B", "Player C"],
        "Goals": ["2", "3", "1"]
      }
    }
  });

  console.log(answer);
};

/**
 * @typedef TableQAInput
 * @type {Object}
 * @property {Object} inputs
 * @property {string} inputs.query
 * @property {Record<string, string[]>} inputs.table
 * @property {Object} [options]
 * @property {boolean} [options.use_cache]
 * @property {boolean} [options.wait_for_model]
 */

/**
 * @typedef TableQAResponse
 * @type {Object}
 * @property {string} answer
 * @property {number[][]} coordinates
 * @property {string[]} cells
 * @property {string} aggregator
 */
