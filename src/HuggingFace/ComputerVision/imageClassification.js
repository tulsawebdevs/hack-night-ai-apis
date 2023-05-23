//https://huggingface.co/docs/api-inference/detailed_parameters#image-classification-task
import { loadImage } from "./util/loadImage"

const API_TOKEN = process.env.HUGGINGFACE_API_KEY;
const exampleImageUrl = "https://global-uploads.webflow.com/5ef788f07804fb7d78a4127a/64255f02f925493e47854276_76eq2p.jpg";

/**
 * @param {string} endpointUrl
 * @param {ImageClassificationInput} input
 * @return {Promise<ImageClassificationResponse[]>}
 */
export const imageClassification = async (endpointUrl, input) => {
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

export const imageClassificationExample = async () => {
  const imageBuffer = await loadImage(exampleImageUrl);

  const classifications = await imageClassification(
		"https://api-inference.huggingface.co/models/google/vit-base-patch16-224",
	imageBuffer);
  console.log(classifications);
};

/**
 * @typedef ImageClassificationInput
 * @type {ArrayBuffer}
 */

/**
 * @typedef ImageClassificationResponse
 * @type {Object}
 * @property {string} label
 * @property {number} score
 */
