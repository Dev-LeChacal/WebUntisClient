import { ApiClient } from "../clients/Api";
import { ValidationError } from "../errors/Validation";
import { AppData, CurrentSchoolYear, Holiday, OneDriveData, Tenant, User } from "../types/app-data/app-data";

/**
 * Service for fetching app data
 */
export class AppDataService {
    private _data: AppData | null = null;

    constructor(
        private readonly _apiClient: ApiClient
    ) {
    }

    /**
     * Get app data
     */
    async getAppData(): Promise<AppData> {
        this._data = await this._apiClient.fetchAppData();
        return this._data;
    }

    /**
     * Clear the cached data
     */
    clearCache(): void {
        this._data = null;
    }

    //#region Getters

    /**
     * Get current school year from cache
     */
    getCurrentSchoolYear(): CurrentSchoolYear {
        this._ensureHasData();
        return this._data!.currentSchoolYear;
    }

    /**
     * Get current school year id from cache
     */
    getCurrentSchoolYearId(): string {
        this._ensureHasData();
        return this._data!.currentSchoolYear.id.toString();
    }

    /**
     * Get departments from cache
     */
    getDepartments(): unknown[] {
        this._ensureHasData();
        return this._data!.departments;
    }

    /**
     * Check if playground mode is enabled
     */
    isPlayground(): boolean {
        this._ensureHasData();
        return this._data!.isPlayground;
    }

    /**
     * Get OneDrive data from cache
     */
    getOneDriveData(): OneDriveData {
        this._ensureHasData();
        return this._data!.oneDriveData;
    }

    /**
     * Get tenant information from cache
     */
    getTenant(): Tenant {
        this._ensureHasData();
        return this._data!.tenant;
    }

    /**
     * Get tenant display name from cache
     */
    getTenantDisplayName(): string {
        this._ensureHasData();
        return this._data!.tenant.displayName;
    }

    /**
     * Check if UI 2020 is enabled
     */
    isUi2020(): boolean {
        this._ensureHasData();
        return this._data!.ui2020;
    }

    /**
     * Get user information from cache
     */
    getUser(): User {
        this._ensureHasData();
        return this._data!.user;
    }

    /**
     * Get student id from cache
     */
    getStudentId(): string {
        this._ensureHasData();
        return this._data!.user.person.id.toString();
    }

    /**
     * Get student id from cache
     */
    getStudentDisplayName(): string {
        this._ensureHasData();
        return this._data!.user.person.displayName;
    }

    /**
     * Get user permissions from cache
     */
    getPermissions(): string[] {
        this._ensureHasData();
        return this._data!.permissions;
    }

    /**
     * Get settings from cache
     */
    getSettings(): string[] {
        this._ensureHasData();
        return this._data!.settings;
    }

    /**
     * Get polling jobs from cache
     */
    getPollingJobs(): unknown[] {
        this._ensureHasData();
        return this._data!.pollingJobs;
    }

    /**
     * Check if support access is open
     */
    isSupportAccessOpen(): boolean {
        this._ensureHasData();
        return this._data!.isSupportAccessOpen;
    }

    /**
     * Get license expiration date from cache
     */
    getLicenceExpiresAt(): string {
        this._ensureHasData();
        return this._data!.licenceExpiresAt;
    }

    /**
     * Get holidays from cache
     */
    getHolidays(): Holiday[] {
        this._ensureHasData();
        return this._data!.holidays;
    }

    //#endregion

    //#region Helpers

    private _ensureHasData(): void {
        if (this._data === null) {
            throw new ValidationError("Data was not found. Please call getAppData() first.");
        }
    }

    //#endregion
}