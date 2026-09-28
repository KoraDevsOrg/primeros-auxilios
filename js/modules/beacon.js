/**
 * Baliza de Emergencia Local Acústica y Visual (Cero consumo de red)
 * Kora Health Initiative - Licencia Libre MIT
 */

export class EmergencyBeacon {
  constructor() {
    this.level = 0; // 0: Off, 1: Eco, 2: Alerta, 3: Proximidad
    this.audioCtx = null;
    this.videoTrack = null;
    this.wakeLock = null;
    this.intervalId = null;
    this.flashTimeoutId = null;
    this.hasTorch = false;

    this.initHardware();
  }

  async initHardware() {
    // Intentar vincular la linterna del teléfono (Flash LED)
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities ? track.getCapabilities() : {};
        if (capabilities.torch) {
          this.videoTrack = track;
          this.hasTorch = true;
        }
      }
    } catch (e) {
      console.warn("[Beacon] Linterna física no disponible, usando pantalla como flash:", e);
    }
  }

  async toggleLevel(onUpdateUI) {
    this.level = (this.level + 1) % 4;
    this.stopBeacons();

    if (this.level > 0) {
      await this.requestWakeLock();
      this.startLevelLoop();
    } else {
      this.releaseWakeLock();
    }

    if (onUpdateUI) {
      onUpdateUI(this.level, this.getLevelDetails());
    }
  }

  getLevelDetails() {
    switch (this.level) {
      case 1:
        return { name: "Nivel 1: Eco-Supervivencia", period: "10s / 30s", battery: "Ahorro Máximo" };
      case 2:
        return { name: "Nivel 2: Alerta Intermedia", period: "2s / 6s", battery: "Consumo Moderado" };
      case 3:
        return { name: "Nivel 3: Rescate Inmediato", period: "Ráfaga continua", battery: "Consumo Alto" };
      default:
        return { name: "Inactivo", period: "--", battery: "Standby" };
    }
  }

  startLevelLoop() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }

    if (this.level === 1) {
      // Nivel 1: Flash cada 10s, Bip cada 30s
      let tick = 0;
      this.triggerFlash(60);
      this.playTone(3000, 0.35, 120);

      this.intervalId = setInterval(() => {
        tick++;
        this.triggerFlash(60);
        if (tick % 3 === 0) {
          this.playTone(3000, 0.35, 120);
        }
      }, 10000);

    } else if (this.level === 2) {
      // Nivel 2: Doble destello cada 2s, Tono SOS cada 6s
      let tick = 0;
      this.triggerFlash(80);
      setTimeout(() => this.triggerFlash(80), 200);
      this.playTone(2800, 0.75, 200);

      this.intervalId = setInterval(() => {
        tick++;
        this.triggerFlash(80);
        setTimeout(() => this.triggerFlash(80), 200);
        if (tick % 3 === 0) {
          this.playTone(2800, 0.75, 300);
        }
      }, 2000);

    } else if (this.level === 3) {
      // Nivel 3: Estroboscópico continuo y sirena penetrante 100% volumen
      this.intervalId = setInterval(() => {
        this.triggerFlash(100);
        this.playTone(3200, 1.0, 150);
        if (navigator.vibrate) navigator.vibrate(80);
      }, 350);
    }
  }

  async triggerFlash(durationMs) {
    if (this.hasTorch && this.videoTrack) {
      try {
        await this.videoTrack.applyConstraints({ advanced: [{ torch: true }] });
        this.flashTimeoutId = setTimeout(async () => {
          await this.videoTrack.applyConstraints({ advanced: [{ torch: false }] });
        }, durationMs);
      } catch (e) {
        this.screenFlashFallback(durationMs);
      }
    } else {
      this.screenFlashFallback(durationMs);
    }
  }

  screenFlashFallback(durationMs) {
    const flashEl = document.getElementById("beaconScreenFlash");
    if (flashEl) {
      flashEl.style.opacity = "1";
      setTimeout(() => { flashEl.style.opacity = "0"; }, durationMs);
    }
  }

  playTone(frequency, volume, durationMs) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);
    gain.gain.setValueAtTime(volume, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + (durationMs / 1000));

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.stop(this.audioCtx.currentTime + (durationMs / 1000));
  }

  stopBeacons() {
    clearInterval(this.intervalId);
    clearTimeout(this.flashTimeoutId);
    if (this.hasTorch && this.videoTrack) {
      this.videoTrack.applyConstraints({ advanced: [{ torch: false }] }).catch(() => {});
    }
  }

  async requestWakeLock() {
    try {
      if ("wakeLock" in navigator) {
        this.wakeLock = await navigator.wakeLock.request("screen");
      }
    } catch (e) {
      console.log("[Beacon] WakeLock no soportado o bloqueado");
    }
  }

  releaseWakeLock() {
    if (this.wakeLock) {
      this.wakeLock.release().catch(() => {});
      this.wakeLock = null;
    }
  }
}
