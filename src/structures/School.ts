/**
 * Represents a school record found during search.
 */
export class School {
  /**
   * @param server - The hostname of the WebUntis server.
   * @param address - The physical address or URL path.
   * @param displayName - The name of the school as displayed to users.
   * @param loginName - The short name or login identifier of the school.
   * @param schoolId - The unique numerical or string ID of the school.
   * @param tenantId - The tenant identifier.
   */
  constructor(
    public readonly server: string,
    public readonly address: string,
    public readonly displayName: string,
    public readonly loginName: string,
    public readonly schoolId: string,
    public readonly tenantId: string
  ) {
  }
}