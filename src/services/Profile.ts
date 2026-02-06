import { ApiClient } from "../clients/Api";
import { Profile } from "../types/profile/profile";

/**
 * Service for managing user profile data
 */
export class ProfileService {
    constructor(private readonly _apiClient: ApiClient) {
    }

    /**
     * Get current user's profile
     */
    async getProfile(): Promise<Profile> {
        const response = await this._apiClient.fetchProfile();
        return response.data.profile;
    }
}