import { AppDataManager } from "../managers/AppData";
import { AppData } from "../types/app-data";

/**
 * Provides access to app data
 */
export class DataModule {
  constructor(
    private readonly appData: AppDataManager
  ) { }

  /**
   * Returns the app data
   */
  public get(): AppData {
    return this.appData.getFromCache();
  }

  // --- Tenant ---

  public async getTenantDisplayName(): Promise<string> {
    const data = this.get();
    return data.tenant.displayName;
  }

  public async getTenantName(): Promise<string> {
    const data = this.get();
    return data.tenant.name;
  }

  public async getTenantId(): Promise<string> {
    const data = this.get();
    return data.tenant.id;
  }

  // --- User ---

  public async getUserEmail(): Promise<string> {
    const data = this.get();
    return data.user.email;
  }

  public async getUserName(): Promise<string> {
    const data = this.get();
    return data.user.name;
  }

  public async getUserId(): Promise<string> {
    const data = this.get();
    return data.user.id.toString();
  }

  public async getUserLocale(): Promise<string> {
    const data = this.get();
    return data.user.locale;
  }

  // --- Person ---

  public async getPersonImageURL(): Promise<string> {
    const data = this.get();
    return data.user.person.imageUrl;
  }

  public async getPersonDisplayName(): Promise<string> {
    const data = this.get();
    return data.user.person.displayName;
  }

  public async getPersonId(): Promise<string> {
    const data = this.get();
    return data.user.person.id.toString();
  }
}