declare global {
    interface Window {
        APP_CONFIG?: AppConfig;
    }
    interface AppConfigInterface {
        CONFIG_OPENAI_URL: string,
        CONFIG_OPENAI_TOKEN: string,
        CONFIG_OPENAI_MODEL: string
    }
}

export class AppConfig {
    static getConfig(): AppConfigInterface {
        return {
            CONFIG_OPENAI_URL: 'https://api.openai.com/v1/chat/completions',
            CONFIG_OPENAI_TOKEN: '',
            CONFIG_OPENAI_MODEL: 'gpt-4',
            ...window.APP_CONFIG || {},
        };
    }

    static validateConfig(): boolean {
        return AppConfig.getOpenAiToken() !== '';
    }

    static getOpenAiUrl(): string {
        const url: string = AppConfig.getConfig().CONFIG_OPENAI_URL;
        if (url === '') {
            throw new Error('Please, provide the OpenAI API URL');
        }
        return url;
    }

    static getOpenAiToken(): string {
        const token: string = AppConfig.getConfig().CONFIG_OPENAI_TOKEN;
        if (token === '') {
            throw new Error('Please, provide the OpenAI token');
        }
        return token;
    }

    static getOpenAiModel(): string {
        const model: string = AppConfig.getConfig().CONFIG_OPENAI_MODEL;
        if (model === '') {
            throw new Error('Please, provide the OpenAI model');
        }
        return model;
    }
}