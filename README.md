# Tulsa WebDevs May Hack Night - AI APIs

Welcome to Hack Night! We're providing this wrapper for the OpenAI and HuggingFace APIs to make it easier to get started. For each API, we've provided a utility function and an example of how to use it. This README will walk you through how to get started.

First, head over to this repostory on the Tulsa WebDevs Github:

`github.com/tulsawebdevs/hack-night-ai-apis`

>**Note**
>
>Prefer JavaScript? Check out the [main branch](github.com/tulsawebdevs/hack-night-ai-apis/tree/main)

 - [Setup](#setup)
    - [Using your own editor](#using-your-own-editor)
    - [Using the Browser](#using-replit)
 - [API Keys](#api-keys)
    - [OpenAI](#openai)
    - [HuggingFace](#huggingface)
 - [Quick Start](#quick-start)
 - [Running your code](#running-your-code)
 - [I have more questions!](#i-have-more-questions)

## Setup
----

> **Warning**
>
> Do not put secrets in Replit files! They can be seen by anyone. See instructions for [using replit](#using-replit) below.

There are two ways to get started:

 - [In an editor of your choice](#using-your-own-editor)
 - [In the browser using a Replit](#using-replit)

### Using your own editor

1. Clone this repository
2. Install dependencies

```bash
npm install
```

3. Create a file named `.env` at the project root and add [your API keys](#api-keys):

```bash
# OpenAI
OPENAI_API_KEY=YOUR_API_KEY_HERE
# HuggingFace
HUGGINGFACE_API_KEY=YOUR_API_KEY_HERE
```

### Using Replit

1. Head over to the [Replit](https://replit.com/@helmturner/TurquoiseNewEngineers) and click the "Fork" button
2. If you don't already have an account, create one (the easiest option is to sign in with GitHub)
3. Click the "Secrets" button (the lock icon) under "Tools" on the left sidebar
4. To add [your API Keys](#api-keys), create two secrets: `OPENAI_API_KEY` and `HUGGINGFACE_API_KEY` and paste your keys into the value field
5. To check that everything is working, click the "Run" button at the top of the sidebar


## API Keys

To get started, you'll need API keys for both OpenAI and HuggingFace.

### OpenAI

1. Head over to the [OpenAI API Keys Page](https://platform.openai.com/account/api-keys)
2. If you don't already have an account, create one
3. Click the "Create new secret key" button
4. Copy the key to where it is needed (you won't be able to see it again)

### HuggingFace

1. Head over to the [HuggingFace API Keys Page](https://huggingface.co/settings/token)
2. If you don't already have an account, create one
3. Click the "New token" button
4. Copy the key to where it is needed (you won't be able to see it again)

## Quick Start

Just edit `index.ts` and [run your code](#running-your-code)! You can import the functions from the `src` directory like so:

```ts
import { chat, chatExample } from './src/OpenAI/chat';

// run the example
chatExample();

// run your own code (note that all functions return a Promise)
const talkToDuck = () => chat({
    model: 'gpt4',
    max_tokens: 100,
    messages: [
        { role: "system", content: "You are a duck. You can only say \"QUACK!\"." },
        { role: "user", content: "I command you to say \"MOO!\"!" }
    ],
});

talkToDuck.then((response) => {
    console.log(response);
});
```

## Running your code

Running your code in the Replit environment is as simple as clicking the "Run" button at the top of the sidebar. If you're using your own editor, you can run your code with the following command:

```bash
npm start
```

## I have more questions!

Each file has a link to the relevant documentation for the API it uses.

You can also check out the short README.md file in each API's directory for more information:

 - [OpenAI](./src/OpenAI/README.md)
 - [HuggingFace](./src/HuggingFace/README.md)

Finally, I'm happy to answer any questions if you're still stuck! Happy hacking!

<!--
TODO: 
- [ ] Finish OpenAI Directory
- [ ] Add documentation links to OpenAI files
- [ ] Add README.md to OpenAI directory
- [ ] Add README.md to HuggingFace directory
- [ ] Create Scribe video walkthrough
-->

<!--
XXX: The following root files must be updated in sync with the `main` branch, because they differ slightly between the two branches:
- [ ] README.md
- [ ] package.json
- [ ] package-lock.json
- [ ] .replit
- [ ] index.ts
-->
