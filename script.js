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
    energyCost: 8,
    completed: false
  },
  {
    id: "lobo",
    title: "Cazar Lobo Escarlata",
    description: "Un lobo espiritual amenaza a los aldeanos cercanos.",
    type: "combate",
    xpReward: 60,
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
    energyCost: 16,
    enemy: { name: "Rayo Purificador", hp: 90, attack: 20, defense: 8 },
    completed: false
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
  skills: [...defaultSkills]
};

let player = { ...basePlayer };

let missions = [...defaultMissions];
let currentEnemy = null;
let activeMissionId = null;
let enemyDefenseShield = false;

const meditateBtn = document.getElementById("meditate-btn");
const saveBtn = document.getElementById("save-btn");
const resetBtn = document.getElementById("reset-btn");
const missionsContainer = document.getElementById("missions");
const skillsContainer = document.getElementById("skills");
const skillActionsContainer = document.getElementById("skill-actions");
const combatLog = document.getElementById("combat-log");
const enemyName = document.getElementById("enemy-name");
const enemyHp = document.getElementById("enemy-hp");

meditateBtn.addEventListener("click", () => {
  gainExperience(12, "Meditación tranquila: +12 XP");
  recoverEnergy(6);
  updateUI();
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

function loadGame() {
  const stored = localStorage.getItem("gameState");
  if (stored) {
    const parsed = JSON.parse(stored);
    player = { ...basePlayer, ...parsed.player };
    if (!player.skills) {
      player.skills = [...defaultSkills];
    }
    missions = parsed.missions?.length ? parsed.missions : [...defaultMissions];
  }
}

function saveGame() {
  localStorage.setItem(
    "gameState",
    JSON.stringify({ player, missions })
  );
}

function resetState() {
  player = { ...basePlayer, skills: [...defaultSkills] };
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

function updateUI() {
  document.getElementById("realm-name").innerText = realms[player.realmIndex];
  document.getElementById("realm-level").innerText = player.level;
  document.getElementById("hp-value").innerText = `${player.hp} / ${player.maxHp}`;
  document.getElementById("energy-value").innerText = `${player.energy} / ${player.maxEnergy}`;
  document.getElementById("attack-value").innerText = player.attack;
  document.getElementById("defense-value").innerText = player.defense;
  document.getElementById("total-xp").innerText = player.totalXp;

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
  recoverEnergy(6);
}

function gainExperience(amount, message) {
  player.xp += amount;
  player.totalXp += amount;
  if (message) addLog(message);
  checkLevelUp();
}

function recoverEnergy(amount) {
  player.energy = Math.min(player.maxEnergy, player.energy + amount);
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
      addLog(`¡Avanzas al reino ${realms[player.realmIndex]}! Tus estadísticas se fortalecen.`);
    } else {
      player.maxHp += 8;
      player.maxEnergy += 6;
      player.attack += 2;
      player.defense += 1;
      addLog(`Subes al nivel ${player.level} del reino actual.`);
    }

    player.hp = player.maxHp;
    player.energy = player.maxEnergy;
    player.xpToNext = Math.round(player.xpToNext * 1.45);
  }
  if (leveled) updateUI();
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
