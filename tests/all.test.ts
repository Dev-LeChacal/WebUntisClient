import { afterAll, beforeAll, test } from "bun:test";

import { Credentials, WebUntisClient } from "../src";

let client: WebUntisClient;
let credentials: Credentials;

beforeAll(async () => {
  credentials = new Credentials(
    process.env.UNTIS_SCHOOL!,
    process.env.UNTIS_USERNAME!,
    process.env.UNTIS_PASSWORD!
  );
  client = new WebUntisClient(credentials);
});

test("login", async () => {
  await client.auth.login(credentials.username, credentials.password);
});

test("get own timetable", async () => {
  const range = { start: new Date("2026-02-05"), end: new Date("2026-02-06") };
  await client.timetable.getOwn(range);
});

test("get class timetable", async () => {
  const range = { start: new Date("2026-02-05"), end: new Date("2026-02-06") };
  await client.timetable.getClass(range);
});

test("get homeworks", async () => {
  const range = { start: new Date("2026"), end: new Date("2027") };
  await client.homeworks.get(range);
});

test("get absences", async () => {
  const range = { start: new Date("2026"), end: new Date("2027") };
  await client.absences.get(range);
});

test("search schools", async () => {
  await client.schools.search("Hermann-Leeser-Schule");
});

test("get person display name", async () => {
  await client.data.getPersonDisplayName();
});

afterAll(async () => {
  await client.auth.logout();
});