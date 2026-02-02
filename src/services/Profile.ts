import { TokenProvider } from "../auth/TokenProvider";
import { Fetcher } from "../infrastructure/Fetcher";
import { Profile } from "../types/profile";

export class ProfileService {
    constructor(
        private fetcher: Fetcher,
    ) { }

    async getProfile(): Promise<Profile> {
        return await this.fetcher.profile();
    }
}