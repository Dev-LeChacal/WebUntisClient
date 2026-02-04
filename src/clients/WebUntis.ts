import { Credentials } from "../Credentials";
import { ValidationError } from "../errors/Validation";
import { AuthenticationManager } from "../managers/Authentication";
import { TokenManager } from "../managers/Token";
import { AppDataService } from "../services/AppData";
import { ProfileService } from "../services/Profile";
import { TimetableService } from "../services/Timetable";
import { AppData, CurrentSchoolYear, Holiday, OneDriveData, Tenant, User } from '../types/app-data';
import { Profile } from "../types/profile";
import { SessionInfo } from "../types/session";
import { TimetableResponse } from "../types/timetable";
import { ApiClient } from "./Api";
import { HttpClient } from "./Http";
import { JsonRpcClient } from "./JsonRpc";

export class WebUntisClient {
    // Clients
    private readonly _httpClient: HttpClient;
    private readonly _apiClient: ApiClient;
    private readonly _rpcClient: JsonRpcClient;

    // Managers
    private readonly _authManager: AuthenticationManager;
    private readonly _tokenManager: TokenManager;

    // Services
    private readonly _appDataService: AppDataService;
    private readonly _profileService: ProfileService;
    private readonly _timetableService: TimetableService;

    constructor(credentials: Credentials) {
        const { identity, url } = credentials;

        // Clients
        this._httpClient = new HttpClient(url);
        this._rpcClient = new JsonRpcClient(identity, url);

        // Managers
        this._authManager = new AuthenticationManager(credentials, this._rpcClient);
        this._tokenManager = new TokenManager(this._httpClient, () => this._authManager.getCookies());

        // Clients
        this._apiClient = new ApiClient(
            this._httpClient,
            () => this._authManager.getCookies(),
            () => this._tokenManager.getToken(),
            () => this._tokenManager.getTenantId(),
            () => this.getCurrentSchoolYearId(),
        );

        // Services
        this._appDataService = new AppDataService(this._apiClient);
        this._profileService = new ProfileService(this._apiClient);

        this._timetableService = new TimetableService(
            this._apiClient,
            this._authManager,
        );
    }

    //#region Authentication

    /**
     * Login to WebUntis
     */
    async login(): Promise<SessionInfo> {
        const session = await this._authManager.login();

        await this._tokenManager.getToken();
        await this._appDataService.getAppData();

        return session;
    }

    /**
     * Logout and end session
     */
    async logout(): Promise<void> {
        await this._authManager.logout();
        this._tokenManager.clearToken();
    }

    /**
     * Check if currently authenticated
     */
    isAuthenticated(): boolean {
        return this._authManager.isAuthenticated();
    }

    /**
     * Get current session info
     */
    getSession(): SessionInfo | null {
        return this._authManager.getSession();
    }

    //#endregion

    //#region App Data

    /**
     * Get app data
     */
    async getAppData(): Promise<AppData> {
        this._ensureAuthenticated();
        return await this._appDataService.getAppData();
    }

    /**
     * Get current school year from cache
     */
    getCurrentSchoolYear(): CurrentSchoolYear {
        return this._appDataService.getCurrentSchoolYear();
    }

    /**
     * Get current school year id from cache
     */
    getCurrentSchoolYearId(): string {
        return this._appDataService.getCurrentSchoolYearId();
    }

    /**
     * Get departments from cache
     */
    getDepartments(): unknown[] {
        return this._appDataService.getDepartments();
    }

    /**
     * Check if playground mode is enabled
     */
    isPlayground(): boolean {
        return this._appDataService.isPlayground();
    }

    /**
     * Get OneDrive data from cache
     */
    getOneDriveData(): OneDriveData {
        return this._appDataService.getOneDriveData();
    }

    /**
     * Get tenant information from cache
     */
    getTenant(): Tenant {
        return this._appDataService.getTenant();
    }

    /**
     * Check if UI 2020 is enabled
     */
    isUi2020(): boolean {
        return this._appDataService.isUi2020();
    }

    /**
     * Get user information from cache
     */
    getUser(): User {
        return this._appDataService.getUser();
    }

    /**
     * Get user permissions from cache
     */
    getPermissions(): string[] {
        return this._appDataService.getPermissions();
    }

    /**
     * Get settings from cache
     */
    getSettings(): string[] {
        return this._appDataService.getSettings();
    }

    /**
     * Get polling jobs from cache
     */
    getPollingJobs(): unknown[] {
        return this._appDataService.getPollingJobs();
    }

    /**
     * Check if support access is open
     */
    isSupportAccessOpen(): boolean {
        return this._appDataService.isSupportAccessOpen();
    }

    /**
     * Get license expiration date from cache
     */
    getLicenceExpiresAt(): string {
        return this._appDataService.getLicenceExpiresAt();
    }

    /**
     * Get holidays from cache
     */
    getHolidays(): Holiday[] {
        return this._appDataService.getHolidays();
    }

//#endregion

    //#region User's Profile

    /**
     * Get current user's profile
     */
    async getProfile(): Promise<Profile> {
        this._ensureAuthenticated();
        return await this._profileService.getProfile();
    }

    //#endregion

    //#region Timetable

    /**
     * Get timetable for date range
     * 
     * @param start - Start date
     * @param end - End date
     */
    async getTimetable(start: Date, end: Date): Promise<TimetableResponse> {
        this._ensureAuthenticated();
        return await this._timetableService.getTimetable(start, end);
    }

    //#endregion

    //#region Helpers

    /**
     * Ensure user is authenticated
     */
    private _ensureAuthenticated(): void {
        const isNotAuthenticated = !this._authManager.isAuthenticated();

        if (isNotAuthenticated) {
            throw new ValidationError('Not authenticated. Please call login() first.');
        }
    }

    //#endregion
}