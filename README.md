<div align="center">

# Web Untis Client

[![npm version](https://badge.fury.io/js/webuntis-client.svg)](https://www.npmjs.com/package/webuntis-client)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Web Untis API Client to interact with [Web Untis](https://webuntis.com).

</div>

> [!CAUTION]
> Work In Progress - Not feature complete yet

## Examples

### Login

```typescript
const credentials = new Credentials(
    "WebUntisClient",
    "school-name",
    "username",
    "password",
);

const client = new WebUntisClient(credentials);

await client.login();

// Get what you need

await client.logout();
```

### Timetable

```typescript
const start = new Date("2026");
const end = new Date("2027");

await client.getOwnTimetable(start, end);
```

### App data

```typescript
await client.getAppData();
```

### Profile data

```typescript
await client.getProfile();
```

## Installation

```bash
yarn add webuntis-client

npm i webuntis-client

pnpm i webuntis-client
```

## License

[MIT](LICENSE)

## Disclaimer

This is an unofficial client and is not affiliated with Untis GmbH.
