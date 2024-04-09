import {AppConfig} from "@/utils/app-config.class";

declare global {
    interface Window {
        APP_CONFIG?: AppConfig;
    }
}