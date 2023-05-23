//https://huggingface.co/docs/api-inference/detailed_parameters#image-segmentation-task
import { loadImage } from "./util/loadImage"

const API_TOKEN = process.env.HUGGINGFACE_API_KEY;
const exampleImageUrl = "https://global-uploads.webflow.com/5ef788f07804fb7d78a4127a/64255f02f925493e47854276_76eq2p.jpg";

/**
 * @param {string} endpointUrl
 * @param {ImageSegmentationInput} input
 * @return {Promise<ImageSegmentationResponse[]>}
 */
export const imageSegmentation = async (endpointUrl, input) => {
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

export const imageSegmentationExample = async () => {
  const imageBuffer = await loadImage(exampleImageUrl);

  const segmentations = await imageSegmentation(
		"https://api-inference.huggingface.co/models/facebook/detr-resnet-50-panoptic",
	imageBuffer);
  console.log(segmentations);
};

/**
 * @typedef ImageSegmentationInput
 * @type {ArrayBuffer}
 */

/**
 * @typedef ImageSegmentationResponse
 * @type {Object}
 * @property {string} label
 * @property {number} score
 * @property {string} mask
 */
