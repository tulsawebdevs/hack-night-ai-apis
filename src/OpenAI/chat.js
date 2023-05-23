const API_KEY = process.env.OPENAI_API_KEY;
const exampleMessage =
  "Please tell me a short story about a man named Rick Astley.";

/**
 * @param {OpenAIChatInput} input
 * @return {Promise<OpenAIChatCompletionResponse>}
 */
export const chat = async (input) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify(input),
  });

  const result = await response.json();
  return result;
};

export const chatExample = async () => {
  const chatResult = await chat({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: exampleMessage }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: false,
    n: 1,
  });

  console.log(chatResult);
};

/**
 * @typedef {Object} OpenAIChatCompletionResponse
 * @property {string} id
 * @property {string} object
 * @property {number} created
 * @property {Object[]} choices
 * @property {number} choices.index
 * @property {ChatGPTMessage} [choices.message]
 * @property {string} [choices.finish_reason]
 * @property {Object} [choices.delta]
 * @property {string} [choices.delta.content]
 * @property {Object} usage
 * @property {number} usage.prompt_tokens
 * @property {number} usage.completion_tokens
 * @property {number} usage.total_tokens
 */

/**
 * @typedef {Object} ChatGPTMessage
 * @property {"user" | "system" | "assistant"} role
 * @property {string} content
 */

/**
 * @typedef {Object} OpenAIChatInput
 * @property {string} model
 * @property {Object[]} messages
 * @property {number} temperature
 * @property {number} top_p
 * @property {number} frequency_penalty
 * @property {number} presence_penalty
 * @property {number} max_tokens
 * @property {boolean} stream
 * @property {number} n
 */
