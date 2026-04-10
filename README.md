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
  "school-name",
  "username",
  "password",
);

const client = new WebUntisClient(credentials);

await client.auth.login();

// Get what you need

await client.auth.logout();
```

### Own Timetable

```typescript
const range = {
  start: new Date("2026"),
  end: new Date("2027"),
}

await client.timetable.getOwn(range);
```

### Class Timetable

```typescript
const range = {
  start: new Date("2026"),
  end: new Date("2027"),
}

await client.timetable.getClass(range);
```

### Homeworks

```typescript
const range = {
  start: new Date("2026"),
  end: new Date("2027"),
}

await client.homeworks.get(range);
```

### Absences

```typescript
const range = {
  start: new Date("2026"),
  end: new Date("2027"),
}

await client.absences.get(range);
```

### Data

```typescript
client.data.get();
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

This is an unofficial client and is not affiliated with Untis GmbH. \
Inspired by [WebUntis](https://github.com/SchoolUtils/WebUntis).
