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

  public getTenantDisplayName(): string {
    const data = this.get();
    return data.tenant.displayName;
  }

  public getTenantName(): string {
    const data = this.get();
    return data.tenant.name;
  }

  public getTenantId(): string {
    const data = this.get();
    return data.tenant.id;
  }

  // --- User ---

  public getUserEmail(): string {
    const data = this.get();
    return data.user.email;
  }

  public getUserName(): string {
    const data = this.get();
    return data.user.name;
  }

  public getUserId(): string {
    const data = this.get();
    return data.user.id.toString();
  }

  public getUserLocale(): string {
    const data = this.get();
    return data.user.locale;
  }

  // --- Person ---

  public getPersonImageURL(): string {
    const data = this.get();
    return data.user.person.imageUrl;
  }

  public getPersonDisplayName(): string {
    const data = this.get();
    return data.user.person.displayName;
  }

  public getPersonId(): string {
    const data = this.get();
    return data.user.person.id.toString();
  }
}