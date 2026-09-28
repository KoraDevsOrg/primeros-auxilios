import { TRANSLATIONS } from "./data/translations.js";
import { PROTOCOLS_DATA } from "./data/protocols.js";

class EmergencyApp {
  constructor() {
    this.currentLang = localStorage.getItem("kora_salud_lang") || "es";
    this.currentProtocolId = "heimlich";
    this.audioCtx = null;
    this.metroInterval = null;
    this.isMetroRunning = false;

    this.cacheDom();
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
  }

  bindEvents() {
    this.btnOpenDrawer.addEventListener("click", () => this.toggleDrawer(true));
    this.btnCloseDrawer.addEventListener("click", () => this.toggleDrawer(false));
    this.drawerBackdrop.addEventListener("click", () => this.toggleDrawer(false));

    this.langSelect.value = this.currentLang;
    this.langSelect.addEventListener("change", (e) => {
      this.currentLang = e.target.value;
      localStorage.setItem("kora_salud_lang", this.currentLang);
      this.render();
    });
  }

  toggleDrawer(open) {
    this.sideDrawer.classList.toggle("open", open);
    this.drawerBackdrop.classList.toggle("active", open);
  }

  render() {
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.es;
    
    // UI Básica
    this.appTitle.textContent = t.appTitle;
    this.offlineBadge.textContent = t.offlineTag;
    this.footerText.textContent = t.footerText;
    this.drawerTitle.textContent = t.menuTitle;

    // Renderizar Menú Drawer
    this.drawerList.innerHTML = "";
    PROTOCOLS_DATA.forEach((prot) => {
      const btn = document.createElement("button");
      btn.className = `drawer-item ${prot.id === this.currentProtocolId ? "active" : ""}`;
      btn.textContent = prot.titles[this.currentLang] || prot.titles.es;
      btn.addEventListener("click", () => {
        this.currentProtocolId = prot.id;
        this.toggleDrawer(false);
        this.render();
      });
      this.drawerList.appendChild(btn);
    });

    // Renderizar Metrónomo solo si estamos en RCP
    if (this.currentProtocolId === "rcp") {
      this.metronomeContainer.style.display = "block";
      this.metronomeContainer.innerHTML = `
        <div class="metronome-box">
          <div id="pulseLight" class="pulse-light"></div>
          <button id="btnMetro" class="metronome-btn">
            ${this.isMetroRunning ? t.btnStopMetro : t.btnStartMetro}
          </button>
          <p style="color: var(--text-sub); font-size: 0.8rem; margin-top: 8px;">
            ${t.metroInstruction}
          </p>
        </div>
      `;
      document.getElementById("btnMetro").addEventListener("click", () => this.toggleMetronome());
    } else {
      this.metronomeContainer.style.display = "none";
      if (this.isMetroRunning) this.toggleMetronome();
    }

    // Renderizar Pasos y Gráficos del Protocolo Actual
    const activeProt = PROTOCOLS_DATA.find((p) => p.id === this.currentProtocolId);
    this.mainContent.innerHTML = "";

    activeProt.steps.forEach((step) => {
      const card = document.createElement("div");
      card.className = "step-card";
      card.innerHTML = `
        <div class="step-header">
          <div class="step-number">${step.order}</div>
          <h2 style="font-size: 1.05rem;">${step.title[this.currentLang] || step.title.es}</h2>
        </div>
        <div class="svg-container">${step.svg}</div>
        <p style="font-size: 0.95rem; line-height: 1.45;">${step.desc[this.currentLang] || step.desc.es}</p>
        ${
          step.alert
            ? `<div class="danger-box"><strong>${t.alertLabel}</strong>${step.alert[this.currentLang] || step.alert.es}</div>`
            : ""
        }
      `;
      this.mainContent.appendChild(card);
    });
  }

  // Motor Acústico del Metrónomo (110 BPM)
  toggleMetronome() {
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.es;
    const btn = document.getElementById("btnMetro");
    
    if (this.isMetroRunning) {
      clearInterval(this.metroInterval);
      this.isMetroRunning = false;
      if (btn) btn.textContent = t.btnStartMetro;
    } else {
      this.playTick();
      this.metroInterval = setInterval(() => this.playTick(), 545);
      this.isMetroRunning = true;
      if (btn) btn.textContent = t.btnStopMetro;
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

  // Integración Kora Admin DB (Persistencia en SQLite)
  async initKoraSync() {
    if (typeof window.KoraSyncEngine !== "undefined") {
      const engine = new window.KoraSyncEngine({
        pkgName: "org.koradevs.salud.primerosauxilios",
        appName: "Kora Primeros Auxilios",
        tableName: "mod_salud_pasos",
        currentHtmlVersion: "2.0.0",
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

      // Mapear cada imagen SVG como un registro independiente
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

document.addEventListener("DOMContentLoaded", () => {
  new EmergencyApp();
});
