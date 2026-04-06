interface RawSchool {
  server: string;
  address: string;
  displayName: string;
  loginName: string;
  schoolId: number;
  tenantId: string;
  serverUrl: string;
  useMobileServiceUrlAndroid: boolean;
  useMobileServiceUrlIos: boolean;
  mobileServiceUrl: unknown;
}

interface RawResults {
  size: number;
  schools: RawSchool[];
}

interface RawSchoolsError {
  code: number;
  message: string;
}

export interface RawSchools {
  jsonrpc: string;
  id: string;
  result: RawResults;
  error?: RawSchoolsError;
}