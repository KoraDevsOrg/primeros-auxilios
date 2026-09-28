export const PROTOCOLS_DATA = Object.freeze([
  // 1. ASFIXIA / HEIMLICH
  {
    id: "heimlich",
    i18nKey: "catAsfixia",
    steps: [
      {
        order: 1,
        title: {
          es: "Signo Universal de Asfixia",
          guc: "Eiyatüsü Kakulaa",
          pbb: "Cxe'ni thegni"
        },
        desc: {
          es: "La persona se lleva las manos al cuello, rostro amoratado, no puede hablar ni toser.",
          guc: "Chi wayuukai nüshakatüin nütüna süpüla nükotolo, nnojoishi aashajüin.",
          pbb: "Nasa ku'j cxe'nwa'j, jxupx vxite' ji'pme' yuwe pta'sya."
        },
        alert: {
          es: "Si tose fuertemente, NO golpees la espalda. Anímala a seguir tosiendo.",
          guc: "Müleka nütüjüle oono, nnojo pajapüchijüin no'upüna.",
          pbb: "Tjuhnx fxi'ze'te, e'stete ma'we. Mee fxi'zenya pta'nxa'."
        },
        svg: `<svg viewBox="0 0 200 200" fill="none">
          <path d="M100 25 C82 25 74 38 74 58 C74 76 84 90 100 90 C116 90 126 76 126 58 C126 38 118 25 100 25 Z" fill="#fde047"/>
          <path d="M86 52 L94 56 M94 52 L86 56" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M106 52 L114 56 M114 52 L106 56" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
          <ellipse cx="100" cy="72" rx="7" ry="9" fill="#991b1b"/>
          <path d="M70 105 C55 115 50 140 48 190 L152 190 C150 140 145 115 130 105 Z" fill="#334155"/>
          <rect x="91" y="86" width="18" height="20" fill="#fde047"/>
          <path d="M48 160 C50 120 70 95 90 98" stroke="#fde047" stroke-width="14" stroke-linecap="round"/>
          <path d="M152 160 C150 120 130 95 110 98" stroke="#fde047" stroke-width="14" stroke-linecap="round"/>
          <ellipse cx="92" cy="98" rx="8" ry="6" fill="#f59e0b"/>
          <ellipse cx="108" cy="98" rx="8" ry="6" fill="#f59e0b"/>
        </svg>`
      },
      {
        order: 2,
        title: {
          es: "Posición y Compresión en J",
          guc: "A'yatawaa sümaa japü",
          pbb: "Ksxu'jwe'sx ksa'j"
        },
        desc: {
          es: "Coloca el puño 2 dedos arriba del ombligo. Cubre con la otra mano y presiona hacia adentro y arriba.",
          guc: "Pa'yataa pajapü piamasü kalepü süsii nümüraka. Pütüna anainmüin sümaa iipümün.",
          pbb: "Kuse tucxte e'nz pa'ga txa'wte kase'je. Dxij piitstx jxutxte."
        },
        alert: {
          es: "Si pierde el conocimiento, colócala en el suelo boca arriba e inicia RCP de inmediato.",
          guc: "Müleka nütüjüle achumajaa, pa'laaja nüi mmoluu.",
          pbb: "Yu'tse' uypxte, ki'te e'nze' tucxte RCP pe'kweya'."
        },
        svg: `<svg viewBox="0 0 220 200" fill="none">
          <path d="M40 30 C75 30 75 170 40 170" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>
          <circle cx="68" cy="130" r="4" fill="#64748b"/>
          <rect x="85" y="80" width="34" height="30" rx="8" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
          <path d="M115 75 C130 75 130 115 115 115 Z" fill="#0284c7"/>
          <path d="M155 125 C140 125 120 120 120 70" stroke="#ef4444" stroke-width="6" stroke-linecap="round" fill="none"/>
          <polyline points="110,82 120,68 130,82" stroke="#ef4444" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
      }
    ]
  },

  // 2. PARO CARDIORRESPIRATORIO / RCP
  {
    id: "rcp",
    i18nKey: "catRcp",
    steps: [
      {
        order: 1,
        title: {
          es: "Compresiones Torácicas (Solo Manos)",
          guc: "A'yatawaa süka japüiwa",
          pbb: "Pkhbuya Kuseyujx"
        },
        desc: {
          es: "Arrodíllate a su lado con brazos rectos en 90°. Hunde el esternón 5 a 6 cm al ritmo de 100-120 por minuto.",
          guc: "Pa'yataa wopü waneepia. Pahunda 5-6 cm sünain aashajawaa.",
          pbb: "Kuse txuxte pa'the'. Dxij 5-6 cm kuse'sxte jxukte tucxya'."
        },
        alert: {
          es: "No des respiración boca a boca si no tienes equipo. No detengas el masaje cardíaco.",
          guc: "Nnojo paashajeerüin nünülia. Nnojo peitajüin.",
          pbb: "Mee yuwe yu'tsene' uypxte. Pkhbuya neyuj pe'kweya'."
        },
        svg: `<svg viewBox="0 0 240 200" fill="none">
          <line x1="10" y1="185" x2="230" y2="185" stroke="#334155" stroke-width="3"/>
          <circle cx="190" cy="165" r="14" fill="#fbbf24"/>
          <path d="M175 175 L80 175" stroke="#fbbf24" stroke-width="16" stroke-linecap="round"/>
          <circle cx="130" cy="170" r="7" fill="#ef4444"/>
          <circle cx="95" cy="40" r="16" fill="#38bdf8"/>
          <path d="M95 56 L105 105" stroke="#0284c7" stroke-width="18" stroke-linecap="round"/>
          <path d="M105 105 L80 150 L50 185" stroke="#0284c7" stroke-width="12" stroke-linecap="round" fill="none"/>
          <path d="M100 70 L130 162" stroke="#38bdf8" stroke-width="10" stroke-linecap="round"/>
          <line x1="130" y1="105" x2="130" y2="145" stroke="#ef4444" stroke-width="4"/>
          <polyline points="124,138 130,147 136,138" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
        </svg>`
      }
    ]
  },

  // 3. HEMORRAGIAS SEVERAS Y TORNIQUETE
  {
    id: "hemorragia",
    i18nKey: "catHemorragias",
    steps: [
      {
        order: 1,
        title: {
          es: "Presión Directa Firme",
          guc: "Pa'yataa waneepia ashaa",
          pbb: "Kuseyuj ksa'j"
        },
        desc: {
          es: "Coloca gasa o tela limpia directo en la herida y presiona con ambas manos. Si se empapa, pon otra encima sin retirar la primera.",
          guc: "Paacha karalo'uta anaasü no'upüna ashaaka. Nnojo pülüküin.",
          pbb: "Dxij piitstx sxawthe kse'te iskwe uwe'sxte ksa'jya'."
        },
        alert: {
          es: "No limpies coágulos profundos formados en la herida.",
          guc: "Nnojo pajüttüin ashaa motso'ojuushi.",
          pbb: "Mee iskwe kuse'te tucxwe'."
        },
        svg: `<svg viewBox="0 0 240 180" fill="none">
          <path d="M30 90 L210 90" stroke="#fde047" stroke-width="32" stroke-linecap="round"/>
          <circle cx="120" cy="90" r="14" fill="#ef4444"/>
          <rect x="95" y="65" width="50" height="24" rx="4" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
          <rect x="100" y="40" width="40" height="22" rx="6" fill="#38bdf8"/>
          <line x1="120" y1="15" x2="120" y2="35" stroke="#ef4444" stroke-width="4"/>
          <polyline points="114,28 120,36 126,28" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
        </svg>`
      },
      {
        order: 2,
        title: {
          es: "Aplicación de Torniquete",
          guc: "Wariira süpüla ashaa",
          pbb: "Torniquete ksa'ji"
        },
        desc: {
          es: "En hemorragias masivas de brazos o piernas, coloca el torniquete 5 a 7 cm proximal a la herida. Ajusta la varilla hasta que cese el sangrado.",
          guc: "Paapa wariira pükotolüin 5 cm no'u ashaakai.",
          pbb: "Torniquete ksakwe 5 cm thegte txux kasejme'."
        },
        alert: {
          es: "Anota la hora exacta en la frente del paciente. Nunca aflojes el torniquete.",
          guc: "Paashajeerüin ka'ika no'upüna chi wayuukai.",
          pbb: "Ksxawte hora pta'sya nasa thegte. Mee ksa'me."
        },
        svg: `<svg viewBox="0 0 240 180" fill="none">
          <path d="M20 90 L220 90" stroke="#fde047" stroke-width="30" stroke-linecap="round"/>
          <circle cx="190" cy="90" r="8" fill="#ef4444"/>
          <rect x="90" y="68" width="16" height="44" rx="3" fill="#0f172a" stroke="#ef4444" stroke-width="3"/>
          <line x1="75" y1="50" x2="120" y2="130" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>
          <path d="M125 60 A 25 25 0 0 1 145 90" stroke="#ef4444" stroke-width="3" fill="none"/>
        </svg>`
      }
    ]
  },

  // 4. QUEMADURAS TÉRMICAS
  {
    id: "quemaduras",
    i18nKey: "catQuemaduras",
    steps: [
      {
        order: 1,
        title: {
          es: "Enfriamiento con Agua Limpia",
          guc: "Wüin süpüla kousaa",
          pbb: "Pi'sx yaacxte"
        },
        desc: {
          es: "Irriga con agua corriente a temperatura ambiente durante 15 a 20 minutos ininterrumpidos.",
          guc: "Pütaja wüin anaasü no'upüna 20 minutos.",
          pbb: "Pi'sx yu'te kse'te 20 minutos pa'ga."
        },
        alert: {
          es: "PROHIBIDO: Cero hielo directo, pasta dental, café, aceites o mantequilla.",
          guc: "NNOJO paapüin jero, pasta dental otta aseite.",
          pbb: "MEE jxupxte pasta, kape, seytetx ksa'me."
        },
        svg: `<svg viewBox="0 0 240 180" fill="none">
          <path d="M30 140 C80 130 110 120 180 120" stroke="#fde047" stroke-width="26" stroke-linecap="round"/>
          <ellipse cx="140" cy="115" rx="20" ry="12" fill="#ef4444"/>
          <path d="M120 20 L140 20 L140 45 L130 45" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>
          <path d="M135 48 L135 110" stroke="#38bdf8" stroke-width="6" stroke-dasharray="6 4"/>
        </svg>`
      }
    ]
  },

  // 5. MORDEDURAS, PICADURAS Y VENENOS
  {
    id: "mordeduras",
    i18nKey: "catToxicos",
    steps: [
      {
        order: 1,
        title: {
          es: "Inmovilización de la Extremidad",
          guc: "Pansaawaa süpüla wüi",
          pbb: "Thakwe kse'te thegni"
        },
        desc: {
          es: "Mantén a la víctima quieta. Inmoviliza el miembro con tablilla o férula a nivel o por debajo del corazón.",
          guc: "Pa'laaja waneepia chi wayuukai, pansaajaa nütüna süka wunu'u.",
          pbb: "Nasa fxi'zenya ksa'te. Kse'te ki'te ksa'jya' thakwe."
        },
        alert: {
          es: "NUNCA hagas cortes, no succiones el veneno y no apliques torniquetes en mordeduras de serpientes.",
          guc: "NNOJO püsülajüin, nnojo pajapüchijüin sümaa ponzoña.",
          pbb: "MEE jxukwe pka'me, yuweyuj thakwe pxikme."
        },
        svg: `<svg viewBox="0 0 240 180" fill="none">
          <path d="M20 90 L220 90" stroke="#fde047" stroke-width="26" stroke-linecap="round"/>
          <circle cx="160" cy="85" r="3" fill="#ef4444"/>
          <circle cx="160" cy="95" r="3" fill="#ef4444"/>
          <rect x="40" y="112" width="160" height="12" rx="3" fill="#78350f" stroke="#451a03" stroke-width="2"/>
          <rect x="60" y="75" width="12" height="48" rx="2" fill="#e2e8f0"/>
          <rect x="110" y="75" width="12" height="48" rx="2" fill="#e2e8f0"/>
        </svg>`
      }
    ]
  }
]);
