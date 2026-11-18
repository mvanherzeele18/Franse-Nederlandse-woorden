import { halloweenConfig } from "./halloween2026.js";
import { christmasConfig } from "./christmas2026.js";

const HALLOWEEN_START = new Date("2026-09-24T00:00:00");
const HALLOWEEN_END = new Date("2026-11-07T23:59:59");
const CHRISTMAS_START = new Date("2026-12-01T00:00:00");
const CHRISTMAS_END = new Date("2027-01-15T23:59:59");

const CHRISTMAS_TEST_ADMINS = [
  "vanherzeele.matteo@groenhoveschool.be",
  "vanherzeelematteo@gmail.com"
];

export async function loadActiveEvents(user = null) {
  const activeEvents = [];
  const now = new Date();

  if (now >= HALLOWEEN_START && now <= HALLOWEEN_END) {
    activeEvents.push(halloweenConfig);
  }

  const isChristmasTestAdmin = CHRISTMAS_TEST_ADMINS.includes(
    user?.email?.trim().toLowerCase()
  );

  if (
    isChristmasTestAdmin ||
    (now >= CHRISTMAS_START && now <= CHRISTMAS_END)
  ) {
    activeEvents.push(christmasConfig);
  }

  return activeEvents;
}
