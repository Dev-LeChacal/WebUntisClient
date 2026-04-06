export class School {
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