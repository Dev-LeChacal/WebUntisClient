import { RequestManager } from "../managers/Request";
import { SchoolsModule } from "../modules/Schools";
import { School } from "../structures";

export class SchoolsClient {
  private readonly schools: SchoolsModule;

  constructor() {
    const request = new RequestManager();
    this.schools = new SchoolsModule(request);
  }

  public async search(query: string): Promise<School[]> {
    return await this.schools.search(query);
  }
}