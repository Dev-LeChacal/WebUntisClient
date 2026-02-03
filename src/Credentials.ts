export class Credentials {
    private readonly _url: string;
    private readonly _schoolBase64: string;

    constructor(
        private readonly _identity: string,
        private readonly _school: string,
        private readonly _username: string,
        private readonly _password: string,
    ) {
        this._url = `https://${_school}.webuntis.com`;
        this._schoolBase64 = "_" + Buffer.from(_school).toString("base64");
    }

    get identity(): string {
        return this._identity;
    }

    get school(): string {
        return this._school;
    }

    get username(): string {
        return this._username;
    }

    get password(): string {
        return this._password;
    }

    get url(): string {
        return this._url;
    }

    get schoolBase64(): string {
        return this._schoolBase64;
    }
}