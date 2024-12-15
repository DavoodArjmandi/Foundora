import { ENV_BASE, EnvironmentConfig } from "./env.base";

const env: EnvironmentConfig = ENV_BASE;

env.production = true;
env.api.rootUrl = '#{api.rootUrl}#';

export const environment = env;

import 'zone.js/plugins/zone-error';