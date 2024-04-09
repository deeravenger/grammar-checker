import type {Checker} from "@/types/checker.type";
import {OpenAIApiClient} from './openai-api-client.class';
import {AppConfig} from '@/utils/app-config.class';

export async function correctGrammarApi(text: string): Promise<Checker> {
    const prompt = `Correct the original text for English grammar and respond with a JSON object with 2 keys: "result" and "explanation". The "result" key must contain the corrected text. The "result" key must briefly explain what was corrected.
The original text:
${text}`;
    return await makeApiCall(prompt);
}

export async function translateApi(text: string): Promise<Checker> {
    const prompt = `Translate the original text from the ${AppConfig.getTranslateFrom()} language to the English, correct English grammar and respond with a JSON object with 2 keys: "result" and "explanation". The "result" key must contain the translated text. The "result" key must briefly explain what was corrected.
The original text:
${text}`;
    return await makeApiCall(prompt);
}

async function makeApiCall(prompt: string): Promise<Checker> {
    const client = OpenAIApiClient.getInstance(AppConfig.getOpenAiUrl(), AppConfig.getOpenAiToken(), AppConfig.getOpenAiModel());
    const response = await client.makeApiCall(prompt);
    if (!response.choices || !response.choices[0] || !response.choices[0].message || !response.choices[0].message.content) {
        throw new Error('Unexpected API response');
    }
    return JSON.parse(response.choices[0].message.content);
}