//https://huggingface.co/docs/api-inference/detailed_parameters#object-detection-task
import { loadImage } from "./util/loadImage"

const API_TOKEN = process.env.HUGGINGFACE_API_KEY; 
const exampleImageUrl = "https://global-uploads.webflow.com/5ef788f07804fb7d78a4127a/64255f02f925493e47854276_76eq2p.jpg";

type ObjectDetectionInput = ArrayBuffer;
type ObjectDetectionResponse = {
  label: string;
  score: number;
  box: {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
  };
};

export const objectDetection = async (input: ObjectDetectionInput): Promise<ObjectDetectionResponse[]> => {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/detr-resnet-50",
    {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      method: "POST",
      body: input,
    }
  );

  const result = await response.json();
  return result;
};

export const objectDetectionExample = async () => {
  const imageBuffer = await loadImage(exampleImageUrl);

  const detections = await objectDetection(imageBuffer);
  console.log(detections);
};
