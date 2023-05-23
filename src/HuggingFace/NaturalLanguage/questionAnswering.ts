//https://huggingface.co/docs/api-inference/detailed_parameters#question-answering-task
const API_TOKEN = process.env.HUGGINGFACE_API_KEY;

type QAInput = {
  inputs: {
    question: string;
    context: string;
  }
}

type QAResponse = {
  answer: string;
  score: number;
  start: number;
  end: number;
}

export const questionAnswering = async (endpointUrl: string, input: QAInput): Promise<QAResponse> => {
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
  const input: QAInput = {
    inputs: {
      question: "Who is the president of the United States?",
      context: "The current president of the United States is Joe Biden."
    }
  };

  const answer = await questionAnswering(
		"https://api-inference.huggingface.co/models/deepset/roberta-base-squad2",
		input
	);
  console.log(answer);
};
