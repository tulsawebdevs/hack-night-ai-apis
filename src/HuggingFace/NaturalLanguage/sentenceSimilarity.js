//https://huggingface.co/docs/api-inference/detailed_parameters#sentence-similarity-task
const API_TOKEN = process.env.HUGGINGFACE_API_KEY;

/**
 * @param {string} endpointUrl
 * @param {SentenceSimilarityInput} input
 * @return {Promise<SentenceSimilarityResponse>}
 */
export const sentenceSimilarity = async (endpointUrl, input) => {
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

export const sentenceSimilarityExample = async () => {
  const similarities = await sentenceSimilarity(
		"https://api-inference.huggingface.co/models/sentence-transformers/paraphrase-MiniLM-L6-v2",
	{
    inputs: {
      source_sentence: "I love dogs.",
      sentences: ["I adore puppies.", "I hate cats."]
    }
  });

  console.log(similarities);
};

/**
 * @typedef SentenceSimilarityInput
 * @type {Object}
 * @property {Object} inputs
 * @property {string} inputs.source_sentence
 * @property {string[]} inputs.sentences
 * @property {Object} [options]
 * @property {boolean} [options.use_cache]
 * @property {boolean} [options.wait_for_model]
 */

/**
 * @typedef SentenceSimilarityResponse
 * @type {number[]}
 */
