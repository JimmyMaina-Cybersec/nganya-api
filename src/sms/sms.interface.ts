export interface AfricasTalkingOptions {
    apiKey: string;
    username: string;
}

export interface SmsResponse {
    SMSMessageData: {
        Recipients: Array<{
            status: string;
            phone: string;
        }>;
    };
}