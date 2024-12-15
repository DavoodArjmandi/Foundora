import { InjectionToken, Provider } from "@angular/core";

export type ApiConfig = {
    rootUrl: string;
};

export const API_CONFIG = new InjectionToken<ApiConfig>('API Config');

export function provideAPI(config: ApiConfig): Provider[]{
    return [
        {
            provide: API_CONFIG,
            useValue: config,
        },
    ];
}