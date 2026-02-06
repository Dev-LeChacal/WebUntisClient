export class Credentials {
    private readonly url: string;
    private readonly schoolBase64: string;

    constructor(
        private readonly identity: string,
        private readonly school: string,
        private readonly username: string,
        private readonly password: string
    ) {
        this.url = `https://${school}.webuntis.com`;
        this.schoolBase64 = "_" + Buffer.from(school).toString("base64");
    }

    get Identity(): string {
        return this.identity;
    }

    get School(): string {
        return this.school;
    }

    get Username(): string {
        return this.username;
    }

    get Password(): string {
        return this.password;
    }

    get URL(): string {
        return this.url;
    }

    get SchoolBase64(): string {
        return this.schoolBase64;
    }
}