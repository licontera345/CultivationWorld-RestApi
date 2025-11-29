const realms = [
  "Refinación del Cuerpo",
  "Refinación del Qi",
  "Establecimiento de la Fundación",
  "Formación del Núcleo Dorado",
  "Alma Naciente",
  "Transformación Divina",
  "Transformación del Vacío",
  "Mahayana",
  "Inmortal Humano",
  "Inmortal de la Tierra",
  "Inmortal del Cielo",
  "Inmortal Rey",
  "Inmortal Emperador",
  "Inmortal Divino",
  "Inmortal Eterno",
  "Ser Único/Eterno"
];

const defaultSkills = [
  {
    id: "golpe",
    name: "Golpe Marcial",
    type: "ataque",
    damage: 12,
    cost: 4,
    description: "Un golpe básico que fortalece el cuerpo.",
    requiredRealm: 0
  },
  {
    id: "lanza-qi",
    name: "Lanza de Qi",
    type: "ataque",
    damage: 18,
    cost: 6,
    description: "Condensa el Qi en una lanza perforante.",
    requiredRealm: 1
  },
  {
    id: "escudo",
    name: "Escudo Espiritual",
    type: "defensa",
    damage: 0,
    cost: 5,
    description: "Reduce el daño recibido en el siguiente ataque.",
    requiredRealm: 2
  },
  {
    id: "oleada",
    name: "Oleada Carmesí",
    type: "ataque",
    damage: 28,
    cost: 9,
    description: "Una oleada de energía que golpea con furia.",
    requiredRealm: 4
  },
  {
    id: "sanacion",
    name: "Loto Sanador",
    type: "curación",
    damage: -18,
    cost: 8,
    description: "Recupera parte del HP mediante esencia pura.",
    requiredRealm: 5
  }
];

const defaultMissions = [
  {
    id: "herbolario",
    title: "Recolectar Hierbas Espirituales",
    description: "Busca ingredientes raros en los valles nublados.",
    type: "recoleccion",
    xpReward: 40,
    meritReward: 8,
    energyCost: 8,
    completed: false
  },
  {
    id: "lobo",
    title: "Cazar Lobo Escarlata",
    description: "Un lobo espiritual amenaza a los aldeanos cercanos.",
    type: "combate",
    xpReward: 60,
    meritReward: 12,
    energyCost: 12,
    enemy: { name: "Lobo Escarlata", hp: 70, attack: 15, defense: 5 },
    completed: false
  },
  {
    id: "tribulacion",
    title: "Enfrentar Tribulación Menor",
    description: "Atrapa un relámpago para templar tu núcleo.",
    type: "combate",
    xpReward: 90,
    meritReward: 18,
    energyCost: 16,
    enemy: { name: "Rayo Purificador", hp: 90, attack: 20, defense: 8 },
    completed: false
  },
  {
    id: "cultivar",
    title: "Custodiar el Jardín Espiritual",
    description: "Protege los campos de espíritu mientras absorbes su energía.",
    type: "recoleccion",
    xpReward: 55,
    meritReward: 10,
    energyCost: 10,
    completed: false
  },
  {
    id: "bandidos",
    title: "Expulsar Bandidos del Valle",
    description: "Una banda de mortales codicia las reliquias cercanas.",
    type: "combate",
    xpReward: 75,
    meritReward: 14,
    energyCost: 14,
    enemy: { name: "Bandido Alquimista", hp: 80, attack: 17, defense: 7 },
    completed: false
  },
  {
    id: "bestia-antigua",
    title: "Sello de la Bestia Antigua",
    description: "Un sello debilitado amenaza con liberar una bestia del pasado.",
    type: "combate",
    xpReward: 120,
    meritReward: 24,
    energyCost: 20,
    enemy: { name: "Serpiente de Obsidiana", hp: 120, attack: 26, defense: 12 },
    completed: false
  }
];

const relicPool = [
  {
    id: "anillo",
    name: "Anillo de la Grulla Blanca",
    description: "Reduce el daño recibido gracias a un campo etéreo.",
    meritCost: 18,
    realmRequired: 1,
    bonus: { defense: 4 }
  },
  {
    id: "guqin",
    name: "Guqin del Alba",
    description: "Su música incrementa la percepción y el renombre.",
    meritCost: 26,
    realmRequired: 3,
    bonus: { fame: 8, xpToNextMultiplier: 0.9 }
  },
  {
    id: "loto-escarcha",
    name: "Loto de Escarcha Ancestral",
    description: "Recupera energía más rápido tras cada acción.",
    meritCost: 32,
    realmRequired: 4,
    bonus: { energyRegen: 4 }
  }
];

const basePlayer = {
  realmIndex: 1,
  level: 1,
  xp: 0,
  xpToNext: 100,
  totalXp: 0,
  hp: 100,
  maxHp: 100,
  energy: 50,
  maxEnergy: 50,
  attack: 10,
  defense: 5,
  merit: 0,
  fame: 0,
  relics: [],
  skills: [...defaultSkills]
};

let player = { ...basePlayer };

let missions = [...defaultMissions];
let currentEnemy = null;
let activeMissionId = null;
let enemyDefenseShield = false;
let meditateInterval = null;

const meditateBtn = document.getElementById("meditate-btn");
const saveBtn = document.getElementById("save-btn");
const resetBtn = document.getElementById("reset-btn");
const missionsContainer = document.getElementById("missions");
const skillsContainer = document.getElementById("skills");
const skillActionsContainer = document.getElementById("skill-actions");
const combatLog = document.getElementById("combat-log");
const enemyName = document.getElementById("enemy-name");
const enemyHp = document.getElementById("enemy-hp");
const relicsContainer = document.getElementById("relics");
const exploreBtn = document.getElementById("explore-btn");
const ritualBtn = document.getElementById("ritual-btn");

meditateBtn.addEventListener("click", meditateAction);
meditateBtn.addEventListener("mousedown", startMeditationLoop);
meditateBtn.addEventListener("mouseup", stopMeditationLoop);
meditateBtn.addEventListener("mouseleave", stopMeditationLoop);
meditateBtn.addEventListener("touchstart", startMeditationLoop);
meditateBtn.addEventListener("touchend", stopMeditationLoop);
meditateBtn.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "Enter") {
    startMeditationLoop();
  }
});
meditateBtn.addEventListener("keyup", (event) => {
  if (event.code === "Space" || event.code === "Enter") {
    stopMeditationLoop();
  }
});

saveBtn.addEventListener("click", () => {
  saveGame();
  addLog("Progreso guardado en tu anillo espacial.");
});

resetBtn.addEventListener("click", () => {
  const confirmar = confirm("Esto reiniciará tu progreso y limpiará el almacenamiento local. ¿Continuar?");
  if (confirmar) {
    hardReset();
  }
});

exploreBtn.addEventListener("click", exploreFrontier);
ritualBtn.addEventListener("click", performRitual);

function loadGame() {
  const stored = localStorage.getItem("gameState");
  if (stored) {
    const parsed = JSON.parse(stored);
    player = { ...basePlayer, ...parsed.player };
    if (!player.relics) player.relics = [];
    if (!player.skills) {
      player.skills = [...defaultSkills];
    }
    missions = mergeMissions(parsed.missions?.length ? parsed.missions : [...defaultMissions]);
  }
}

function mergeMissions(existing) {
  const missionMap = new Map(existing.map((mission) => [mission.id, mission]));

  defaultMissions.forEach((mission) => {
    if (!missionMap.has(mission.id)) {
      existing.push({ ...mission });
    }
  });

  return existing;
}

function saveGame() {
  localStorage.setItem(
    "gameState",
    JSON.stringify({ player, missions })
  );
}

function resetState() {
  player = { ...basePlayer, skills: [...defaultSkills], relics: [] };
  missions = [...defaultMissions];
  activeMissionId = null;
  currentEnemy = null;
}

function hardReset() {
  resetState();
  localStorage.removeItem("gameState");
  updateUI();
  addLog("Todo vuelve a su estado inicial. Tu viaje re comienza.");
}

function meditateAction() {
  gainExperience(12, "Meditación tranquila: +12 XP");
  recoverEnergy(6);
  updateUI();
}

function startMeditationLoop() {
  if (meditateInterval) return;
  meditateAction();
  meditateInterval = setInterval(meditateAction, 500);
}

function stopMeditationLoop() {
  if (meditateInterval) {
    clearInterval(meditateInterval);
    meditateInterval = null;
  }
}

function updateUI() {
  document.getElementById("realm-name").innerText = realms[player.realmIndex];
  document.getElementById("realm-level").innerText = player.level;
  document.getElementById("hp-value").innerText = `${player.hp} / ${player.maxHp}`;
  document.getElementById("energy-value").innerText = `${player.energy} / ${player.maxEnergy}`;
  document.getElementById("attack-value").innerText = player.attack;
  document.getElementById("defense-value").innerText = player.defense;
  document.getElementById("total-xp").innerText = player.totalXp;
  document.getElementById("merit-value").innerText = player.merit;
  document.getElementById("fame-value").innerText = player.fame;

  const hpPercent = Math.max(0, (player.hp / player.maxHp) * 100);
  document.getElementById("hp-bar").style.width = `${hpPercent}%`;
  document.getElementById("hp-text").innerText = `${player.hp} / ${player.maxHp}`;

  const xpPercent = Math.min(100, (player.xp / player.xpToNext) * 100);
  document.getElementById("xp-bar").style.width = `${xpPercent}%`;
  document.getElementById("xp-text").innerText = `${player.xp} / ${player.xpToNext}`;

  const energyPercent = Math.max(0, (player.energy / player.maxEnergy) * 100);
  document.getElementById("energy-bar").style.width = `${energyPercent}%`;
  document.getElementById("energy-text").innerText = `${player.energy} / ${player.maxEnergy}`;

  renderMissions();
  renderSkills();
  renderRelics();
  renderSkillActions();
  updateEnemyUI();
  saveGame();
}

function renderMissions() {
  missionsContainer.innerHTML = "";
  missions.forEach((mission) => {
    const item = document.createElement("div");
    item.className = "item";

    const info = document.createElement("div");
    info.className = "info";
    const title = document.createElement("h4");
    title.textContent = mission.title;
    const desc = document.createElement("p");
    desc.textContent = mission.description;
    info.append(title, desc);

    const meta = document.createElement("div");
    meta.className = "meta";
    const reward = document.createElement("span");
    reward.className = "badge";
    reward.textContent = `+${mission.xpReward} XP`;

    const energy = document.createElement("span");
    energy.className = "badge";
    energy.textContent = `Coste: ${mission.energyCost} EN`;

    const type = document.createElement("span");
    type.className = "badge";
    type.textContent = mission.type === "combate" ? "Combate" : "Exploración";

    const button = document.createElement("button");
    button.textContent = mission.completed ? "Completada" : "Iniciar";
    button.className = mission.completed ? "ghost" : "primary";
    button.disabled = mission.completed || player.energy < mission.energyCost;

    button.addEventListener("click", () => startMission(mission.id));

    meta.append(reward, energy, type, button);
    item.append(info, meta);
    missionsContainer.appendChild(item);
  });

  const hint = document.getElementById("mission-hint");
  const incompletas = missions.filter((m) => !m.completed).length;
  hint.textContent = incompletas ? "Elige una misión para ganar XP." : "Has completado todas las misiones actuales.";
}

function renderSkills() {
  skillsContainer.innerHTML = "";
  player.skills.forEach((skill) => {
    const allowed = player.realmIndex >= skill.requiredRealm;
    const item = document.createElement("div");
    item.className = "item";

    const info = document.createElement("div");
    info.className = "info";
    const title = document.createElement("h4");
    title.textContent = skill.name;
    const desc = document.createElement("p");
    desc.textContent = skill.description;
    info.append(title, desc);

    const meta = document.createElement("div");
    meta.className = "meta";
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = `Coste: ${skill.cost} EN`;

    const lock = document.createElement("small");
    lock.className = "hint";
    lock.textContent = allowed ? "Disponible" : `Requiere ${realms[skill.requiredRealm]}`;

    meta.append(badge, lock);
    item.append(info, meta);
    if (!allowed) {
      item.style.opacity = 0.5;
    }
    skillsContainer.appendChild(item);
  });
}

function renderRelics() {
  relicsContainer.innerHTML = "";
  relicPool.forEach((relic) => {
    const owned = player.relics.includes(relic.id);
    const allowed = player.realmIndex >= relic.realmRequired;

    const item = document.createElement("div");
    item.className = "item";

    const info = document.createElement("div");
    info.className = "info";
    const title = document.createElement("h4");
    title.textContent = relic.name;
    const desc = document.createElement("p");
    desc.textContent = relic.description;
    info.append(title, desc);

    const meta = document.createElement("div");
    meta.className = "meta";
    const cost = document.createElement("span");
    cost.className = "badge";
    cost.textContent = `${relic.meritCost} mérito`;

    const state = document.createElement("small");
    state.className = "hint";
    state.textContent = owned ? "Ya vinculada" : allowed ? "Disponible" : `Requiere ${realms[relic.realmRequired]}`;

    const button = document.createElement("button");
    button.textContent = owned ? "Activa" : "Vincular";
    button.className = owned ? "ghost" : "primary";
    button.disabled = owned || !allowed || player.merit < relic.meritCost;
    button.addEventListener("click", () => purchaseRelic(relic));

    meta.append(cost, state, button);
    item.append(info, meta);
    if (!allowed) item.style.opacity = 0.6;
    relicsContainer.appendChild(item);
  });
}

function renderSkillActions() {
  skillActionsContainer.innerHTML = "";
  player.skills
    .filter((skill) => player.realmIndex >= skill.requiredRealm)
    .forEach((skill) => {
      const btn = document.createElement("button");
      btn.textContent = skill.name;
      btn.className = "primary";
      btn.disabled = !currentEnemy || player.energy < skill.cost;
      btn.addEventListener("click", () => playerAttack(skill));
      skillActionsContainer.appendChild(btn);
    });
}

function startMission(id) {
  const mission = missions.find((m) => m.id === id);
  if (!mission || mission.completed) return;
  if (player.energy < mission.energyCost) {
    addLog("No tienes energía suficiente para esta misión.");
    return;
  }

  player.energy = Math.max(0, player.energy - mission.energyCost);
  activeMissionId = mission.id;

  if (mission.type === "combate" && mission.enemy) {
    currentEnemy = { ...mission.enemy };
    enemyDefenseShield = false;
    addLog(`Comienza el combate contra ${mission.enemy.name}.`);
    updateUI();
    return;
  }

  const success = Math.random() > 0.2;
  if (success) {
    completeMission(mission, `Misión "${mission.title}" completada. +${mission.xpReward} XP.`);
  } else {
    addLog(`Fallaste en "${mission.title}". Inténtalo de nuevo tras recuperar energía.`);
  }
  updateUI();
}

function playerAttack(skill) {
  if (!currentEnemy) return;
  if (player.energy < skill.cost) {
    addLog("Necesitas más energía para usar esta técnica.");
    return;
  }

  player.energy = Math.max(0, player.energy - skill.cost);
  let damage = skill.damage + Math.max(0, player.attack - currentEnemy.defense);

  if (skill.type === "curación") {
    const healAmount = Math.abs(skill.damage) + 5;
    player.hp = Math.min(player.maxHp, player.hp + healAmount);
    addLog(`${skill.name} restaura ${healAmount} HP.`, "heal");
    enemyTurn();
    updateUI();
    return;
  }

  if (skill.type === "defensa") {
    enemyDefenseShield = true;
    addLog(`${skill.name} levanta un escudo espiritual.`, "heal");
    enemyTurn();
    updateUI();
    return;
  }

  currentEnemy.hp = Math.max(0, currentEnemy.hp - damage);
  addLog(`${skill.name} golpea causando ${damage} de daño.`);

  if (currentEnemy.hp <= 0) {
    endCombat(true);
  } else {
    enemyTurn();
  }
  updateUI();
}

function enemyTurn() {
  if (!currentEnemy) return;
  const raw = Math.max(1, currentEnemy.attack - player.defense);
  const damage = enemyDefenseShield ? Math.max(1, Math.floor(raw / 2)) : raw;
  enemyDefenseShield = false;
  player.hp = Math.max(0, player.hp - damage);
  addLog(`${currentEnemy.name} te ataca causando ${damage} de daño.`, damage >= 15 ? "critical" : "");

  if (player.hp <= 0) {
    endCombat(false);
  }
}

function endCombat(victory) {
  if (!currentEnemy) return;
  const mission = missions.find((m) => m.id === activeMissionId);
  if (victory) {
    const reward = mission?.xpReward || 30;
    addLog(`Has vencido a ${currentEnemy.name}. +${reward} XP.`);
    if (mission) {
      completeMission(mission, null);
    } else {
      gainExperience(reward, null);
    }
  } else {
    addLog(`Fuiste derrotado por ${currentEnemy.name}. Recuperas fuerzas tras meditar.`);
    player.hp = player.maxHp;
  }

  currentEnemy = null;
  activeMissionId = null;
  updateUI();
}

function completeMission(mission, message) {
  mission.completed = true;
  gainExperience(mission.xpReward, message);
  gainMerit(mission.meritReward || 0);
  recoverEnergy(6);
}

function gainExperience(amount, message) {
  player.xp += amount;
  player.totalXp += amount;
  if (message) addLog(message);
  checkLevelUp();
}

function gainMerit(amount) {
  if (!amount) return;
  player.merit += amount;
  addLog(`Ganas ${amount} de mérito sectario.`);
}

function gainFame(amount) {
  if (!amount) return;
  player.fame += amount;
}

function recoverEnergy(amount) {
  const bonus = getEnergyRegenBonus();
  player.energy = Math.min(player.maxEnergy, player.energy + amount + bonus);
}

function checkLevelUp() {
  let leveled = false;
  while (player.xp >= player.xpToNext) {
    player.xp -= player.xpToNext;
    player.level += 1;
    leveled = true;

    const realmBreak = player.level > 10;
    if (realmBreak) {
      player.level = 1;
      player.realmIndex = Math.min(realms.length - 1, player.realmIndex + 1);
      player.maxHp = Math.round(player.maxHp * 1.35);
      player.maxEnergy = Math.round(player.maxEnergy * 1.3);
      player.attack = Math.round(player.attack * 1.25);
      player.defense = Math.round(player.defense * 1.22);
      gainFame(5);
      addLog(`¡Avanzas al reino ${realms[player.realmIndex]}! Tus estadísticas se fortalecen.`);
      unlockAdvancedSkills();
    } else {
      player.maxHp += 8;
      player.maxEnergy += 6;
      player.attack += 2;
      player.defense += 1;
      addLog(`Subes al nivel ${player.level} del reino actual.`);
    }

    player.hp = player.maxHp;
    player.energy = player.maxEnergy;
    const multiplier = getXpMultiplierFromRelics();
    player.xpToNext = Math.round(player.xpToNext * 1.45 * multiplier);
  }
  if (leveled) updateUI();
}

function unlockAdvancedSkills() {
  const newSkills = [
    {
      id: "corte-astral",
      name: "Corte Astral",
      type: "ataque",
      damage: 34,
      cost: 12,
      description: "Un filo que divide el cielo en dos.",
      requiredRealm: 5
    },
    {
      id: "escudo-celestial",
      name: "Escudo del Cielo Quieto",
      type: "defensa",
      damage: 0,
      cost: 10,
      description: "Mitiga el próximo ataque por completo.",
      requiredRealm: 6
    }
  ];

  newSkills.forEach((skill) => {
    const already = player.skills.some((s) => s.id === skill.id);
    if (!already && player.realmIndex >= skill.requiredRealm) {
      player.skills.push(skill);
      addLog(`Has comprendido ${skill.name} al ascender.`);
    }
  });
}

function purchaseRelic(relic) {
  if (player.merit < relic.meritCost || player.relics.includes(relic.id)) return;
  player.merit -= relic.meritCost;
  player.relics.push(relic.id);
  applyRelicBonus(relic);
  addLog(`Vinculas ${relic.name}, su poder te envuelve.`);
  updateUI();
}

function applyRelicBonus(relic) {
  if (relic.bonus.attack) player.attack += relic.bonus.attack;
  if (relic.bonus.defense) player.defense += relic.bonus.defense;
  if (relic.bonus.hp) {
    player.maxHp += relic.bonus.hp;
    player.hp = player.maxHp;
  }
  if (relic.bonus.energy) {
    player.maxEnergy += relic.bonus.energy;
    player.energy = player.maxEnergy;
  }
  if (relic.bonus.fame) gainFame(relic.bonus.fame);
}

function getXpMultiplierFromRelics() {
  const hasReduction = player.relics
    .map((id) => relicPool.find((r) => r.id === id))
    .filter(Boolean)
    .find((r) => r.bonus.xpToNextMultiplier);
  return hasReduction ? hasReduction.bonus.xpToNextMultiplier : 1;
}

function getEnergyRegenBonus() {
  const relics = player.relics
    .map((id) => relicPool.find((r) => r.id === id))
    .filter(Boolean);
  const bonus = relics.reduce((acc, relic) => acc + (relic.bonus.energyRegen || 0), 0);
  return bonus;
}

function exploreFrontier() {
  const cost = 14;
  if (player.energy < cost) {
    addLog("Necesitas más energía para explorar tierras lejanas.");
    return;
  }
  player.energy = Math.max(0, player.energy - cost);

  const roll = Math.random();
  if (roll < 0.35) {
    currentEnemy = { name: "Bestia Errante", hp: 95, attack: 22, defense: 10 };
    addLog("En la frontera encuentras una bestia errante. ¡Prepárate para combatir!");
    updateUI();
    return;
  }

  const xpGain = Math.floor(60 + Math.random() * 40);
  const meritGain = 10;
  gainExperience(xpGain, `Descubres ruinas antiguas: +${xpGain} XP.`);
  gainMerit(meritGain);
  gainFame(3);
  recoverEnergy(4 + getEnergyRegenBonus());
  updateUI();
}

function performRitual() {
  const cost = 20;
  if (player.energy < cost) {
    addLog("Tu energía es insuficiente para el ritual.");
    return;
  }
  player.energy = Math.max(0, player.energy - cost);

  const xpGain = 80;
  gainExperience(xpGain, "Un ritual de iluminación refuerza tu dao interior.");
  gainMerit(6);
  gainFame(4);
  recoverEnergy(2 + getEnergyRegenBonus());
  updateUI();
}

function addLog(text, type = "") {
  const entry = document.createElement("p");
  entry.textContent = text;
  if (type) entry.classList.add(type);
  combatLog.appendChild(entry);
  combatLog.scrollTop = combatLog.scrollHeight;
}

function updateEnemyUI() {
  if (!currentEnemy) {
    enemyName.textContent = "Sin enemigo";
    enemyHp.textContent = "-";
    return;
  }
  enemyName.textContent = currentEnemy.name;
  enemyHp.textContent = `${currentEnemy.hp}`;
}

window.addEventListener("beforeunload", saveGame);

window.addEventListener("load", () => {
  loadGame();
  updateUI();
});
