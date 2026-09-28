import { PROTOCOLS_DATA } from "./data/protocols.js";
import { KoraI18n, KORA_LANGUAGES } from "https://cdn.jsdelivr.net/gh/KoraDevsOrg/kora-web-sdk@main/kora-i18n.js";
import { EmergencyBeacon } from "./modules/beacon.js";

class EmergencyApp {
  constructor() {
    this.i18n = new KoraI18n("kora_salud_lang", "es");
    this.currentProtocolId = "heimlich";
    this.audioCtx = null;
    this.metroInterval = null;
    this.isMetroRunning = false;

    // Instancia del módulo de hardware Baliza SOS
    this.beacon = new EmergencyBeacon();

    this.cacheDom();
    this.populateLanguageOptions();
    this.bindEvents();
    this.initKoraSync();
    this.render();
  }

  cacheDom() {
    this.sideDrawer = document.getElementById("sideDrawer");
    this.drawerBackdrop = document.getElementById("drawerBackdrop");
    this.btnOpenDrawer = document.getElementById("btnOpenDrawer");
    this.btnCloseDrawer = document.getElementById("btnCloseDrawer");
    this.drawerList = document.getElementById("drawerList");
    this.langSelect = document.getElementById("langSelect");
    this.mainContent = document.getElementById("mainContent");
    this.metronomeContainer = document.getElementById("metronomeContainer");
    this.appTitle = document.getElementById("appTitle");
    this.offlineBadge = document.getElementById("offlineBadge");
    this.footerText = document.getElementById("footerText");
    this.drawerTitle = document.getElementById("drawerTitle");

    // Elementos de la Baliza SOS
    this.btnBeacon = document.getElementById("btnBeacon");
    this.beaconTitle = document.getElementById("beaconTitle");
    this.beaconDesc = document.getElementById("beaconDesc");
  }

  populateLanguageOptions() {
    this.langSelect.innerHTML = "";
    Object.values(KORA_LANGUAGES).forEach((lang) => {
      const opt = document.createElement("option");
      opt.value = lang.code;
      opt.textContent = lang.name;
      this.langSelect.appendChild(opt);
    });
    this.langSelect.value = this.i18n.getLang();
  }

  bindEvents() {
    this.btnOpenDrawer.addEventListener("click", () => this.toggleDrawer(true));
    this.btnCloseDrawer.addEventListener("click", () => this.toggleDrawer(false));
    this.drawerBackdrop.addEventListener("click", () => this.toggleDrawer(false));

    this.langSelect.addEventListener("change", (e) => {
      this.i18n.setLang(e.target.value);
      this.render();
    });

    // Evento del Botón de Emergencia / Baliza
    if (this.btnBeacon) {
      this.btnBeacon.addEventListener("click", () => this.handleBeaconClick());
    }
  }

  toggleDrawer(open) {
    this.sideDrawer.classList.toggle("open", open);
    this.drawerBackdrop.classList.toggle("active", open);
  }

  handleBeaconClick() {
    this.beacon.toggleLevel((level, details) => {
      if (!this.btnBeacon) return;

      if (level === 0) {
        this.btnBeacon.style.background = "#ef4444";
        this.btnBeacon.style.transform = "scale(1)";
        if (this.beaconTitle) this.beaconTitle.textContent = "Baliza Desactivada";
        if (this.beaconDesc) this.beaconDesc.textContent = "Toca para alternar: Eco (Nivel 1) → Medio (Nivel 2) → Rápido (Nivel 3)";
      } else {
        this.btnBeacon.style.background = level === 3 ? "#b91c1c" : (level === 2 ? "#d97706" : "#2563eb");
        this.btnBeacon.style.transform = "scale(1.05)";
        if (this.beaconTitle) this.beaconTitle.textContent = details.name;
        if (this.beaconDesc) this.beaconDesc.textContent = `Intervalo: ${details.period} • Batería: ${details.battery}`;
      }
    });
  }

  render() {
    // 1. Textos estáticos globales desde el SDK
    this.appTitle.textContent = this.i18n.t("appTitle");
    this.offlineBadge.textContent = this.i18n.t("offlineTag");
    this.footerText.textContent = this.i18n.t("footerText");
    this.drawerTitle.textContent = this.i18n.t("menuTitle");

    // 2. Lista de Protocolos en el Drawer Lateral
    this.drawerList.innerHTML = "";
    PROTOCOLS_DATA.forEach((prot) => {
      const btn = document.createElement("button");
      btn.className = `drawer-item ${prot.id === this.currentProtocolId ? "active" : ""}`;
      btn.textContent = this.i18n.t(prot.i18nKey);
      btn.addEventListener("click", () => {
        this.currentProtocolId = prot.id;
        this.toggleDrawer(false);
        this.render();
      });
      this.drawerList.appendChild(btn);
    });

    // 3. Metrónomo RCP (solo en pantalla de RCP)
    if (this.currentProtocolId === "rcp") {
      this.metronomeContainer.style.display = "block";
      this.metronomeContainer.innerHTML = `
        <div class="metronome-box">
          <div id="pulseLight" class="pulse-light"></div>
          <button id="btnMetro" class="metronome-btn">
            ${this.isMetroRunning ? this.i18n.t("btnStopMetro") : this.i18n.t("btnStartMetro")}
          </button>
          <p style="color: var(--text-sub); font-size: 0.8rem; margin-top: 8px;">
            ${this.i18n.t("metroInstruction")}
          </p>
        </div>
      `;
      document.getElementById("btnMetro").addEventListener("click", () => this.toggleMetronome());
    } else {
      this.metronomeContainer.style.display = "none";
      if (this.isMetroRunning) this.toggleMetronome();
    }

    // 4. Renderizar tarjetas de pasos e imágenes
    const activeProt = PROTOCOLS_DATA.find((p) => p.id === this.currentProtocolId);
    this.mainContent.innerHTML = "";

    activeProt.steps.forEach((step) => {
      const card = document.createElement("div");
      card.className = "step-card";
      card.innerHTML = `
        <div class="step-header">
          <div class="step-number">${step.order}</div>
          <h2 style="font-size: 1.05rem;">${this.i18n.getText(step.title)}</h2>
        </div>
        <div class="svg-container">${step.svg}</div>
        <p style="font-size: 0.95rem; line-height: 1.45;">${this.i18n.getText(step.desc)}</p>
        ${
          step.alert
            ? `<div class="danger-box"><strong>${this.i18n.t("alertLabel")}</strong> ${this.i18n.getText(step.alert)}</div>`
            : ""
        }
      `;
      this.mainContent.appendChild(card);
    });
  }

  // Metrónomo acústico y vibratorio (110 BPM)
  toggleMetronome() {
    const btn = document.getElementById("btnMetro");
    if (this.isMetroRunning) {
      clearInterval(this.metroInterval);
      this.isMetroRunning = false;
      if (btn) btn.textContent = this.i18n.t("btnStartMetro");
    } else {
      this.playTick();
      this.metroInterval = setInterval(() => this.playTick(), 545);
      this.isMetroRunning = true;
      if (btn) btn.textContent = this.i18n.t("btnStopMetro");
    }
  }

  playTick() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.frequency.setValueAtTime(850, this.audioCtx.currentTime);
    gain.gain.setValueAtTime(0.7, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.08);

    if (navigator.vibrate) navigator.vibrate(40);

    const light = document.getElementById("pulseLight");
    if (light) {
      light.classList.add("pulse-active");
      setTimeout(() => light.classList.remove("pulse-active"), 80);
    }
  }

  // Persistencia SQLite vía KoraSyncEngine
  async initKoraSync() {
    if (typeof window.KoraSyncEngine !== "undefined") {
      const engine = new window.KoraSyncEngine({
        pkgName: "org.koradevs.salud.primerosauxilios",
        appName: "Kora Primeros Auxilios",
        tableName: "mod_salud_pasos",
        currentHtmlVersion: "3.1.0",
        tableDdl: `
          CREATE TABLE IF NOT EXISTS mod_salud_pasos (
            id TEXT PRIMARY KEY,
            protocolo_id TEXT NOT NULL,
            paso_orden INTEGER NOT NULL,
            svg_content TEXT NOT NULL
          );
        `,
        insertHandler: (db, item) => {
          const sql = `
            INSERT OR REPLACE INTO mod_salud_pasos (id, protocolo_id, paso_orden, svg_content)
            VALUES (?, ?, ?, ?);
          `;
          db.execute(sql, JSON.stringify([item.id, item.protocolo_id, item.paso_orden, item.svg_content]));
        }
      });

      const syncItems = [];
      PROTOCOLS_DATA.forEach((p) => {
        p.steps.forEach((s) => {
          syncItems.push({
            id: `${p.id}_step_${s.order}`,
            protocolo_id: p.id,
            paso_orden: s.order,
            svg_content: s.svg
          });
        });
      });

      await engine.sync(syncItems);
    }
  }
}

// Inicialización limpia tras cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  new EmergencyApp();
});
