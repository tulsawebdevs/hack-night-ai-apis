//https://platform.openai.com/docs/api-reference/chat/create
const API_KEY = process.env.OPENAI_API_KEY
const exampleMessage = "Please tell me a short story about a man named Rick Astley."

type OpenAIChatCompletionResponse = {
  id: string
  object: string
  created: number
  choices: {
    index: number
    message?: ChatGPTMessage
    finish_reason?: string
    delta?: {
      content: string
    }
  }[]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

type ChatGPTMessage = {
  role: "user" | "system" | "assistant"
  content: string
}

type OpenAIChatInput = {
  model: string
  messages: ChatGPTMessage[]
  temperature: number
  top_p: number
  frequency_penalty: number
  presence_penalty: number
  max_tokens: number
  stream: boolean
  n: number
}

export const chat = async (input: OpenAIChatInput): Promise<OpenAIChatCompletionResponse> => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify(input),
  });

  const result = await response.json();
  return result
}

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
    n: 1
  });

  console.log(chatResult);
};
