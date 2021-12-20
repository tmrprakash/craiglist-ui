require('dotenv').config();

export function getEnvironmentURL() {
    return process.env.url;
}
