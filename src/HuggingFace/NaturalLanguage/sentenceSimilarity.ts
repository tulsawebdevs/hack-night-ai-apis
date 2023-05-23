//https://huggingface.co/docs/api-inference/detailed_parameters#sentence-similarity-task
const API_TOKEN = process.env.HUGGINGFACE_API_KEY;

type SentenceSimilarityInput = {
  inputs: {
    source_sentence: string;
    sentences: string[];
  }
  options?: {
    use_cache?: boolean;
    wait_for_model?: boolean;
  }
}

type SentenceSimilarityResponse = number[];

export const sentenceSimilarity = async (endpointUrl: string, input: SentenceSimilarityInput): Promise<SentenceSimilarityResponse> => {
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
  const input: SentenceSimilarityInput = {
    inputs: {
      source_sentence: "I love dogs.",
      sentences: ["I adore puppies.", "I hate cats."]
    }
  };

  const similarities = await sentenceSimilarity(
		"https://api-inference.huggingface.co/models/sentence-transformers/paraphrase-MiniLM-L6-v2",
		input
	);
  console.log(similarities);
};
