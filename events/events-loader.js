import { halloweenConfig } from "./halloween2026.js";

const ALL_EVENTS = [
  halloweenConfig
];

// ⭐ Kies hier jouw datums
const HALLOWEEN_START = new Date("2026-09-24T00:00:00");
const HALLOWEEN_END   = new Date("2026-11-07T23:59:59");

const CHRISTMAS_START = new Date("2026-12-01T00:00:00");
const CHRISTMAS_END   = new Date("2027-01-15T23:59:59");

const EASTER_START = new Date("2027-03-20T00:00:00");
const EASTER_END   = new Date("2027-04-15T23:59:59");

export async function loadActiveEvents() {
  const activeEvents = [];
  const now = new Date();

  // ⭐ Automatische activatie op datum
  if (now >= HALLOWEEN_START && now <= HALLOWEEN_END) {
    activeEvents.push(halloweenConfig);
  }

  if (now >= CHRISTMAS_START && now <= CHRISTMAS_END) {
    activeEvents.push(christmasConfig);
  }

  if (now >= EASTER_START && now <= EASTER_END) {
    activeEvents.push(easterConfig);
  }
  
  return activeEvents;
}
