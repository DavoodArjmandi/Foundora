import { ApiConfig } from "@foundora-ui/data-access/shared";

export type EnvironmentConfig = {
    production: boolean;
    api: ApiConfig;
}

export const ENV_BASE: EnvironmentConfig = {
    production: false,
    api:{
        rootUrl:'https://localhost:5001/api'
    }
}