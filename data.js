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

/*
 * Draft tasks. Replace the prompt and target together after the final ten
 * task statements are written. Every participant receives all ten once; the
 * application randomizes their order when a test starts.
 */
window.TASKS = [
  { id: "T01", prompt: "[DRAFT] Find the information block for Tortle.", target: "Tortle" },
  { id: "T02", prompt: "[DRAFT] Find the information block for Goliath.", target: "Goliath" },
  { id: "T03", prompt: "[DRAFT] Find the information block for Goblin.", target: "Goblin" },
  { id: "T04", prompt: "[DRAFT] Find the information block for Aasimar.", target: "Aasimar" },
  { id: "T05", prompt: "[DRAFT] Find the information block for Warforged.", target: "Warforged" },
  { id: "T06", prompt: "[DRAFT] Find the information block for Aarakocra.", target: "Aarakocra" },
  { id: "T07", prompt: "[DRAFT] Find the information block for Plasmoid.", target: "Plasmoid" },
  { id: "T08", prompt: "[DRAFT] Find the information block for Halfling.", target: "Halfling" },
  { id: "T09", prompt: "[DRAFT] Find the information block for Centaur.", target: "Centaur" },
  { id: "T10", prompt: "[DRAFT] Find the information block for Water Genasi.", target: "Water Genasi" }
];

window.TYPE_OPTIONS = ["Humanoids", "Beasts", "Goblinoids", "Magical"];
window.SIZE_OPTIONS = ["Small", "Medium", "Large"];
