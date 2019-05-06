const axios = require("axios");

const red = "\x1b[31m",
    yellow = "\x1b[33m",
    green = "\x1b[32m",
    grey = "\u001B[90m",
    reset = "\x1b[0m";

const createQueryString = (options) => {
    return `?${Object.keys(options).map(opt => `${opt}=${options[opt]}`).join("&")}`;
};

module.exports = class HamonJS {
    constructor(token) {
        if (!token) throw "You have to provide a token in order to access the API scrapper!";

        Object.defineProperty(this, "URL", {value: "https://hamon-api.xyz/api", writable: false});

        this.token = token;
        this.endpoints = [];
    }

    async get(endpoint, options = {}, check = true) {
        return new Promise(async (resolve, reject) => {
            endpoint = endpoint.toLowerCase() || null;

            if (check && this.endpoints.length === 0) return reject("You have to call update at least once before actually using the API.");
            if (!endpoint) return reject("You have to provide an endpoint name to fetch.");
            if (check && !this.endpoints.includes(endpoint)) return reject("This endpoint doesn't exist!");

            axios(`${this.URL}/endpoint/${endpoint}${createQueryString(options)}`, {
                headers: {"x-auth-token": this.token}
            }).then(async res => {
                if (!res.data) return reject(`${red}[HAMON - GET - ERROR] No data returned! Try again later!${reset}`);

                if (res.data["dataURL"]) {
                    return resolve(res.data.dataURL);
                } else {
                    return resolve(Buffer.from(res.data.buffer.data));
                }
            }).catch(err => {
                return reject(`${red}[HAMON - UPDATE - ERROR] ${err}${reset}`);
            });
        });
    }

    async update() {
        return new Promise(async (resolve, reject) => {
            axios(`${this.URL}/endpoints?render=array`, {
                headers: {"x-auth-token": this.token}
            }).then(async res => {
                if (!res.data) return reject(`${red}[HAMON - UPDATE - ERROR] No data returned! Try again later!${reset}`);

                res.data.forEach(ep => this.endpoints.push(ep));

                return resolve(res.data);
            }).catch(err => {
                return reject(err);
            });
        });
    }

    async fetchEndpoints(array = true) {
        return new Promise(async (resolve, reject) => {
            axios(`${this.URL}/endpoints${array ? "?render=array" : ""}`, {
                headers: {"x-auth-token": this.token}
            }).then(async res => {
                if (!res.data) return reject(`${red}[HAMON - UPDATE - ERROR] No data returned! Try again later!${reset}`);

                if (Array.isArray(res.data)) res.data.forEach(ep => this.endpoints.push(ep));

                return resolve(res.data);
            }).catch(err => {
                return reject(err);
            });
        });
    }
};
