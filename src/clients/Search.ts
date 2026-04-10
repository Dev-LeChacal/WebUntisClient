import { RequestManager } from "../managers/Request";
import { SchoolsModule } from "../modules/Schools";
import { School } from "../structures";

/**
 * Client for searching schools.
 */
export class SearchClient {
  private readonly schools: SchoolsModule;

  constructor() {
    const request = new RequestManager();
    this.schools = new SchoolsModule(request);
  }

  /**
   * Searches for schools matching the given query
   * @param query - The search term
   * @returns A list of matching schools
   */
  public async getSchools(query: string): Promise<School[]> {
    return await this.schools.search(query);
  }
}