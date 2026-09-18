import { halloweenConfig } from "./halloween2026.js";

const ALL_EVENTS = [
  halloweenConfig
];

// ⭐ Kies hier jouw datums
const HALLOWEEN_START = new Date("2026-10-01T00:00:00");
const HALLOWEEN_END   = new Date("2026-11-07T23:59:59");

export async function loadActiveEvents() {
  const activeEvents = [];
  const now = new Date();

  // ⭐ Automatische activatie op datum
  if (now >= HALLOWEEN_START && now <= HALLOWEEN_END) {
    activeEvents.push(halloweenConfig);
  }

  return activeEvents;
}
