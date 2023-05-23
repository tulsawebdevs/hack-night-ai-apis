//https://huggingface.co/docs/api-inference/detailed_parameters#zeroshot-classification-task
const API_TOKEN = process.env.HUGGINGFACE_API_KEY;

type ZeroShotClassificationInput = {
  inputs: string;
  parameters: {
    candidate_labels: string[];
    multi_label?: boolean;
  };
  options?: {
    use_cache?: boolean;
    wait_for_model?: boolean;
  };
};

type ZeroShotClassificationResponse = {
  sequence: string;
  labels: string[];
  scores: number[];
};

export const zeroShotClassification = async (endpointUrl: string, input: ZeroShotClassificationInput): Promise<ZeroShotClassificationResponse> => {
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
  const input: ZeroShotClassificationInput = {
    inputs: "Hi, I recently bought a device from your company but it is not working as advertised and I would like to get reimbursed!",
    parameters: {
      candidate_labels: ["refund", "legal", "faq"]
    }
  };

  const classificationResult = await zeroShotClassification(
		"https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
		input
	);
  console.log(classificationResult);
};
