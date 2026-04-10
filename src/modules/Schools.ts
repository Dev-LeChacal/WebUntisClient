import { SearchError } from "../errors/Search";
import { RequestManager } from "../managers/Request";
import { School } from "../structures";
import { RawSchools } from "../types/responses/schools";

export class SchoolsModule {
  private readonly endpoint: string = "https://schoolsearch.webuntis.com/schoolquery2";

  constructor(
    private readonly request: RequestManager
  ) {
  }

  public async search(query: string): Promise<School[]> {
    const headers = {
      "accept": "application/json, text/plain, */*",
      "content-type": "application/json;charset=UTF-8"
    };

    const body = {
      id: `wu_schulsuche-${Date.now()}`,
      jsonrpc: "2.0",
      method: "searchSchool",
      params: [{ search: query }]
    };

    const response = await this.request.post<RawSchools>(
      this.endpoint,
      body,
      headers
    );

    if ( response.error ) {
      throw new SearchError(`${response.error.message} (${response.error.code}) | Query: ${query}`);
    }

    const rawSchools = response.result.schools;

    return rawSchools.map((raw) => new School(
      raw.server,
      raw.address,
      raw.displayName,
      raw.loginName,
      raw.schoolId.toString(),
      raw.tenantId
    ));
  }
}