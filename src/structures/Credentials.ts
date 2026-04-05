export class Credentials {
    private readonly url: string;
    private readonly schoolBase64: string;

    constructor(
        private readonly school: string,
        private readonly username: string,
        private readonly password: string
    ) {
        this.url = `https://${school}.webuntis.com`;
        this.schoolBase64 = "_" + Buffer.from(school).toString("base64");
    }

    get School(): string {
        return this.school;
    }

    get SchoolBase64(): string {
        return this.schoolBase64;
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
}