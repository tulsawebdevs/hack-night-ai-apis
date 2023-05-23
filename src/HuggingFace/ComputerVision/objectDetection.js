//https://huggingface.co/docs/api-inference/detailed_parameters#object-detection-task
import { loadImage } from "./util/loadImage"

const API_TOKEN = process.env.HUGGINGFACE_API_KEY;
const exampleImageUrl = "https://global-uploads.webflow.com/5ef788f07804fb7d78a4127a/64255f02f925493e47854276_76eq2p.jpg";

/**
 * @param {string} endpointUrl
 * @param {ObjectDetectionInput} input
 * @return {Promise<ObjectDetectionResponse[]>}
 */
export const objectDetection = async (endpointUrl, input) => {
  const response = await fetch(
    endpointUrl,
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

  const detections = await objectDetection(
		"https://api-inference.huggingface.co/models/facebook/detr-resnet-50",
	imageBuffer);
  console.log(detections);
};

/**
 * @typedef ObjectDetectionInput
 * @type {ArrayBuffer}
 */

/**
 * @typedef ObjectDetectionResponse
 * @type {Object}
 * @property {string} label
 * @property {number} score
 * @property {Object} box
 * @property {number} box.xmin
 * @property {number} box.ymin
 * @property {number} box.xmax
 * @property {number} box.ymax
 */
