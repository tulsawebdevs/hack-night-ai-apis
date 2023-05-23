//https://huggingface.co/docs/api-inference/detailed_parameters#image-classification-task
import { loadImage } from "./util/loadImage"

const API_TOKEN = process.env.HUGGINGFACE_API_KEY;
const exampleImageUrl = "https://global-uploads.webflow.com/5ef788f07804fb7d78a4127a/64255f02f925493e47854276_76eq2p.jpg";

type ImageClassificationInput = ArrayBuffer;
type ImageClassificationResponse = {
  label: string;
  score: number;
};

export const imageClassification = async (input: ImageClassificationInput): Promise<ImageClassificationResponse[]> => {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/google/vit-base-patch16-224",
    {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      method: "POST",
      body: input,
    }
  );

  const result = await response.json();
  return result;
};

export const imageClassificationExample = async () => {
  const imageBuffer = await loadImage(exampleImageUrl);

  const classifications = await imageClassification(imageBuffer);
  console.log(classifications);
};
