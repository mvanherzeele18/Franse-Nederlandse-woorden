export const halloweenConfig = {
  id: "halloween2026",

  // Hoe heet de currency?
  currencyName: "candy",

  // Hoeveel snoepjes kunnen ze krijgen per correct antwoord?
  // Dit is een "loot table": elke entry is een mogelijke reward.
  rewardChances: [1, 1, 2, 3, 5],

  // Shop-items
  shop: {
    xp100: { cost: 20, type: "xp", amount: 100, label: "100 XP" },
    xp500: { cost: 80, type: "xp", amount: 500, label: "500 XP" },
    spookyTitle: { cost: 150, type: "title", titleName: "Spookmeester", label: "Titel: Spookmeester" }
  },

  // Achievement ID (optioneel)
  achievementId: "halloween2026_completed",

  // UI-dingen (voor banners, kleuren, iconen)
  icon: "🎃",
  color: "#ff6f00",
  name: "Halloween Candy Hunt 2026",
  description: "Verdien snoepjes door oefeningen te maken en koop speciale beloningen!"
};
