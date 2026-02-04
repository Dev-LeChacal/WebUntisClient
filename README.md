# Web Untis Client

A Web Untis API Client to interact with [Web Untis](https://webuntis.com).

> Work In Progress \
> Not complete

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