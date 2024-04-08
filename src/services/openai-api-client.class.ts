export class OpenAIApiClient {
    private static instance: OpenAIApiClient;

    static getInstance(apiUrl: string, apiToken: string, model: string) {
        if (!OpenAIApiClient.instance) {
            OpenAIApiClient.instance = new OpenAIApiClient(apiUrl, apiToken, model);
        }
        return OpenAIApiClient.instance;
    }

    private constructor(private readonly apiUrl: string, private readonly apiToken: string, private readonly model: string) {
    }

    async makeApiCall(prompt: string): Promise<any> {
        if (!prompt) {
            throw new Error('The prompt is empty!');
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.apiToken
            },
            body: JSON.stringify({
                "model": this.model,
                "messages": [
                    {
                        "role": "system",
                        "content": "You are an helpful assistant."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            })
        };

        const response = await fetch(this.apiUrl, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
}