export interface Credentials {
    /** Application name or identifier (e.g., 'MyApp', 'WebUntisClient') */
    identity: string;

    /** School name (e.g., 'myschool' for myschool.webuntis.com) */
    school: string;

    /** WebUntis username */
    username: string;

    /** WebUntis password */
    password: string;

    /** 
     * Custom base URL for the WebUntis instance
     * @default https://{school}.webuntis.com
     * @example 'https://custom.webuntis.com'
     */
    url?: string;
}