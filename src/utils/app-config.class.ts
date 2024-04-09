export class AppConfig {
    static getConfig(): AppConfigInterface {
        return {
            CONFIG_OPENAI_URL: '',
            CONFIG_OPENAI_TOKEN: '',
            CONFIG_OPENAI_MODEL: '',
            CONFIG_TRANSLATE_FROM: '',
            ...window.APP_CONFIG || {},
        };
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

    static getTranslateFrom(): string {
        return AppConfig.getConfig().CONFIG_TRANSLATE_FROM;
    }
}