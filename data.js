/*
 * One source of truth for every information block in the wireframe.
 *
 * `source: "card-sort"` means the exact species name appeared in the
 * six-page card-sort report. `source: "prototype-extension"` means the name
 * was added to the expanded prototype list after that study. Cross-listing is
 * intentional: participants placed several species in more than one cluster.
 *
 * Relative size is a prototype navigation label, not the rules-defined D&D
 * creature-size statistic.
 */
window.SPECIES = [
  { name: "Aarakocra", types: ["Beasts", "Magical"], size: "Medium", source: "card-sort" },
  { name: "Aasimar", types: ["Humanoids", "Magical"], size: "Medium", source: "card-sort" },
  { name: "Air Genasi", types: ["Humanoids", "Magical"], size: "Medium", source: "prototype-extension" },
  { name: "Astral Elf", types: ["Humanoids", "Magical"], size: "Medium", source: "prototype-extension" },
  { name: "Autognome", types: ["Humanoids", "Magical"], size: "Small", source: "prototype-extension" },
  { name: "Boggart", types: ["Goblinoids", "Magical"], size: "Small", source: "prototype-extension" },
  { name: "Bugbear", types: ["Goblinoids", "Beasts"], size: "Large", source: "card-sort" },
  { name: "Centaur", types: ["Beasts", "Magical"], size: "Large", source: "card-sort" },
  { name: "Changeling", types: ["Humanoids", "Magical"], size: "Medium", source: "card-sort" },
  { name: "Deep Gnome", types: ["Humanoids", "Magical"], size: "Small", source: "prototype-extension" },
  { name: "Dhampir", types: ["Humanoids", "Magical"], size: "Medium", source: "prototype-extension" },
  { name: "Dragonborn", types: ["Humanoids", "Beasts", "Magical"], size: "Medium", source: "card-sort" },
  { name: "Duergar", types: ["Humanoids", "Magical"], size: "Small", source: "prototype-extension" },
  { name: "Duskling", types: ["Humanoids", "Magical"], size: "Small", source: "prototype-extension" },
  { name: "Dwarf", types: ["Humanoids"], size: "Small", source: "card-sort" },
  { name: "Earth Genasi", types: ["Humanoids", "Magical"], size: "Medium", source: "prototype-extension" },
  { name: "Eladrin", types: ["Humanoids", "Magical"], size: "Medium", source: "prototype-extension" },
  { name: "Elf", types: ["Humanoids", "Magical"], size: "Medium", source: "card-sort" },
  { name: "Faerie", types: ["Magical"], size: "Small", source: "prototype-extension" },
  { name: "Fairy", types: ["Magical"], size: "Small", source: "card-sort" },
  { name: "Firbolg", types: ["Humanoids", "Magical"], size: "Large", source: "card-sort" },
  { name: "Fire Genasi", types: ["Humanoids", "Magical"], size: "Medium", source: "prototype-extension" },
  { name: "Flamekin", types: ["Humanoids", "Magical"], size: "Medium", source: "prototype-extension" },
  { name: "Genasi", types: ["Humanoids", "Magical"], size: "Medium", source: "card-sort" },
  { name: "Giff", types: ["Humanoids", "Beasts"], size: "Large", source: "prototype-extension" },
  { name: "Githyanki", types: ["Humanoids", "Magical"], size: "Medium", source: "prototype-extension" },
  { name: "Githzerai", types: ["Humanoids", "Magical"], size: "Medium", source: "prototype-extension" },
  { name: "Gnome", types: ["Humanoids"], size: "Small", source: "card-sort" },
  { name: "Goblin", types: ["Goblinoids"], size: "Small", source: "card-sort" },
  { name: "Goliath", types: ["Humanoids"], size: "Large", source: "card-sort" },
  { name: "Grung", types: ["Beasts", "Magical"], size: "Small", source: "prototype-extension" },
  { name: "Hadozee", types: ["Humanoids", "Beasts"], size: "Medium", source: "prototype-extension" },
  { name: "Half-Elf", types: ["Humanoids", "Magical"], size: "Medium", source: "prototype-extension" },
  { name: "Half-Orc", types: ["Humanoids", "Goblinoids"], size: "Large", source: "prototype-extension" },
  { name: "Halfling", types: ["Humanoids"], size: "Small", source: "card-sort" },
  { name: "Harengon", types: ["Beasts"], size: "Small", source: "card-sort" },
  { name: "Hexblood", types: ["Humanoids", "Magical"], size: "Medium", source: "prototype-extension" },
  { name: "Hobgoblin", types: ["Goblinoids"], size: "Medium", source: "card-sort" },
  { name: "Human", types: ["Humanoids"], size: "Medium", source: "card-sort" },
  { name: "Kalashtar", types: ["Humanoids", "Magical"], size: "Medium", source: "prototype-extension" },
  { name: "Kender", types: ["Humanoids"], size: "Small", source: "prototype-extension" },
  { name: "Kenku", types: ["Beasts"], size: "Small", source: "card-sort" },
  { name: "Khoravar", types: ["Humanoids", "Magical"], size: "Medium", source: "prototype-extension" },
  { name: "Kithkin", types: ["Humanoids"], size: "Small", source: "prototype-extension" },
  { name: "Kobold", types: ["Beasts", "Goblinoids"], size: "Small", source: "card-sort" },
  { name: "Leonin", types: ["Humanoids", "Beasts"], size: "Large", source: "prototype-extension" },
  { name: "Lizardfolk", types: ["Beasts"], size: "Medium", source: "card-sort" },
  { name: "Locathah", types: ["Beasts"], size: "Medium", source: "prototype-extension" },
  { name: "Lorwyn Changeling", types: ["Humanoids", "Magical"], size: "Medium", source: "prototype-extension" },
  { name: "Lorwyn-Shadowmoor Elf", types: ["Humanoids", "Magical"], size: "Medium", source: "prototype-extension" },
  { name: "Loxodon", types: ["Humanoids", "Beasts"], size: "Large", source: "prototype-extension" },
  { name: "Lupin", types: ["Humanoids", "Beasts"], size: "Medium", source: "prototype-extension" },
  { name: "Minotaur", types: ["Beasts", "Magical"], size: "Large", source: "card-sort" },
  { name: "Orc", types: ["Humanoids", "Goblinoids"], size: "Large", source: "card-sort" },
  { name: "Owlin", types: ["Beasts", "Magical"], size: "Small", source: "prototype-extension" },
  { name: "Plasmoid", types: ["Magical"], size: "Medium", source: "card-sort" },
  { name: "Reborn", types: ["Humanoids", "Magical"], size: "Medium", source: "prototype-extension" },
  { name: "Rimekin", types: ["Humanoids", "Magical"], size: "Medium", source: "prototype-extension" },
  { name: "Satyr", types: ["Beasts", "Magical"], size: "Medium", source: "card-sort" },
  { name: "Sea Elf", types: ["Humanoids", "Magical"], size: "Medium", source: "prototype-extension" },
  { name: "Shadar-kai", types: ["Humanoids", "Magical"], size: "Medium", source: "prototype-extension" },
  { name: "Shifter", types: ["Humanoids", "Beasts"], size: "Medium", source: "prototype-extension" },
  { name: "Simic Hybrid", types: ["Humanoids", "Beasts", "Magical"], size: "Medium", source: "prototype-extension" },
  { name: "Tabaxi", types: ["Beasts"], size: "Medium", source: "card-sort" },
  { name: "Thri-kreen", types: ["Beasts"], size: "Medium", source: "prototype-extension" },
  { name: "Tiefling", types: ["Humanoids", "Magical"], size: "Medium", source: "card-sort" },
  { name: "Tortle", types: ["Beasts"], size: "Medium", source: "card-sort" },
  { name: "Triton", types: ["Humanoids", "Magical"], size: "Medium", source: "card-sort" },
  { name: "Vedalken", types: ["Humanoids", "Magical"], size: "Medium", source: "prototype-extension" },
  { name: "Verdan", types: ["Humanoids", "Goblinoids", "Magical"], size: "Small", source: "prototype-extension" },
  { name: "Warforged", types: ["Humanoids", "Magical"], size: "Medium", source: "card-sort" },
  { name: "Water Genasi", types: ["Humanoids", "Magical"], size: "Medium", source: "prototype-extension" },
  { name: "Yuan-ti", types: ["Humanoids", "Beasts", "Magical"], size: "Medium", source: "prototype-extension" }
];

const COMMONALITY_BY_NAME = {
  Popular: ["Dragonborn", "Dwarf", "Elf", "Gnome", "Half-Elf", "Halfling", "Human", "Tiefling"],
  Common: ["Aarakocra", "Aasimar", "Bugbear", "Centaur", "Genasi", "Goblin", "Goliath", "Half-Orc", "Harengon", "Hobgoblin", "Kenku", "Kobold", "Lizardfolk", "Orc", "Tabaxi", "Tortle", "Triton", "Warforged"],
  Uncommon: ["Air Genasi", "Astral Elf", "Autognome", "Changeling", "Deep Gnome", "Dhampir", "Duergar", "Earth Genasi", "Eladrin", "Fairy", "Firbolg", "Fire Genasi", "Giff", "Githyanki", "Githzerai", "Grung", "Hadozee", "Hexblood", "Kalashtar", "Kender", "Leonin", "Locathah", "Loxodon", "Minotaur", "Owlin", "Plasmoid", "Reborn", "Satyr", "Sea Elf", "Shadar-kai", "Shifter", "Simic Hybrid", "Thri-kreen", "Vedalken", "Verdan", "Water Genasi", "Yuan-ti"]
};

window.COMMONALITY_OPTIONS = ["Rare", "Uncommon", "Common", "Popular"];

window.SPECIES.forEach((species) => {
  species.commonality = window.COMMONALITY_OPTIONS.find((level) =>
    COMMONALITY_BY_NAME[level] && COMMONALITY_BY_NAME[level].includes(species.name)
  ) || "Rare";
});

/* Every participant receives all ten tasks once in a randomized order. */
window.TASKS = [
  {
    id: "T01",
    prompt: "A friend is playing a robot character in your campaign. Find which species they are using.",
    answer: "Warforged",
    acceptedNames: ["Warforged"]
  },
  {
    id: "T02",
    prompt: "You want to play a tiny chaotic character and want a species to match.",
    answer: "Any Small species",
    criteria: { size: "Small" }
  },
  {
    id: "T03",
    prompt: "You are playing a dragon-themed campaign and want to find a dragon-like character to play as.",
    answer: "Dragonborn or Kobold",
    acceptedNames: ["Dragonborn", "Kobold"]
  },
  {
    id: "T04",
    prompt: "Your friend is playing D&D for the first time and they want a common species to start out. Help them pick one.",
    answer: "Any Common species",
    criteria: { commonality: "Common" }
  },
  {
    id: "T05",
    prompt: "You want to make a character that looks like your close friend and resembles them exactly, what will you choose? (serious, no jokes)",
    answer: "Changeling",
    acceptedNames: ["Changeling"]
  },
  {
    id: "T06",
    prompt: "You love orcs playing orc characters and you want to look up its species stats.",
    answer: "Orc",
    acceptedNames: ["Orc"]
  },
  {
    id: "T07",
    prompt: "Your party is attacking a Plasmoid and you want to find its species traits.",
    answer: "Plasmoid",
    acceptedNames: ["Plasmoid"]
  },
  {
    id: "T08",
    prompt: "You want to create a character who lives under the water.",
    answer: "Triton, Sea Elf, Locathah, or Water Genasi",
    acceptedNames: ["Triton", "Sea Elf", "Locathah", "Water Genasi"]
  },
  {
    id: "T09",
    prompt: "You have never heard of the Harengon species and you want to know what it looks like.",
    answer: "Harengon",
    acceptedNames: ["Harengon"]
  },
  {
    id: "T10",
    prompt: "You are playing a sorcerer and you want to find a small character species that has magical traits.",
    answer: "Any species that is both Small and Magical",
    criteria: { size: "Small", type: "Magical" }
  }
];

window.TYPE_OPTIONS = ["Humanoids", "Beasts", "Goblinoids", "Magical"];
window.SIZE_OPTIONS = ["Small", "Medium", "Large"];
