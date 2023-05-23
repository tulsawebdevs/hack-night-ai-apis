//https://huggingface.co/docs/api-inference/detailed_parameters#table-question-answering-task
const API_TOKEN = process.env.HUGGINGFACE_API_KEY;

type TableQAInput = {
  inputs: {
    query: string;
    table: Record<string, string[]>;
  }
  options?: {
    use_cache?: boolean;
    wait_for_model?: boolean;
  }
}

type TableQAResponse = {
  answer: string;
  coordinates: number[][];
  cells: string[];
  aggregator: string;
}

export const tableQuestionAnswering = async (endpointUrl: string, input: TableQAInput): Promise<TableQAResponse> => {
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
  const input: TableQAInput = {
    inputs: {
      query: "Who scored the most goals?",
      table: {
        "Player": ["Player A", "Player B", "Player C"],
        "Goals": ["2", "3", "1"]
      }
    }
  };

  const answer = await tableQuestionAnswering(
		"https://api-inference.huggingface.co/models/google/tapas-base-finetuned-wtq",
		input
	);
  console.log(answer);
};
