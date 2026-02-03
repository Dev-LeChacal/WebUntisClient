import { ApiClient } from "../clients/Api";
import { AppData } from "../types/app-data";

/**
 * Service for fetching app data
 */
export class AppDataService {
    private _data: AppData | null = null;

    constructor(
        private readonly _apiClient: ApiClient,
    ) { }

    /**
     * Get app data
     */
    async getAppData(): Promise<AppData> {
        this._data = await this._apiClient.fetchAppData();
        return this._data;
    }
}