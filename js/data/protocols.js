export const PROTOCOLS_DATA = Object.freeze([
  {
    id: "heimlich",
    category: "asfixia",
    titles: {
      es: "Atragantamiento (Heimlich)",
      guc: "Kakulaa (Heimlich)",
      pbb: "Dxij cxe'ni (Heimlich)"
    },
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
          es: "Si pierde el conocimiento, colócala en el suelo e inicia RCP de inmediato.",
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
  {
    id: "rcp",
    category: "paro",
    titles: {
      es: "Paro Cardiorrespiratorio (RCP)",
      guc: "Aashajuushii (RCP)",
      pbb: "Yu'tse' Uypx (RCP)"
    },
    steps: [
      {
        order: 1,
        title: {
          es: "Compresiones Torácicas (Solo Manos)",
          guc: "A'yatawaa süka japüiwa",
          pbb: "Pkhbuya Kuseyujx"
        },
        desc: {
          es: "Brazos rectos en 90°. Hunde el pecho 5 a 6 cm en el centro del esternón al ritmo de 100-120 por minuto.",
          guc: "Pa'yataa wopü waneepia. Pahunda 5-6 cm sünain aashajawaa.",
          pbb: "Kuse txuxte pa'the'. Dxij 5-6 cm kuse'sxte jxukte tucxya'."
        },
        alert: {
          es: "No des respiración boca a boca si no eres personal capacitado. No pares las compresiones.",
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
  {
    id: "hemorragia",
    category: "trauma",
    titles: {
      es: "Control de Hemorragias",
      guc: "Ashaa aashajawaa",
      pbb: "Iskwe Ksa'ji"
    },
    steps: [
      {
        order: 1,
        title: {
          es: "Presión Directa Continua",
          guc: "Pa'yataa waneepia ashaa",
          pbb: "Kuseyuj ksa'j"
        },
        desc: {
          es: "Aplica tela limpia o apósito sobre la herida y presiona con ambas manos sin retirar la tela si se empapa.",
          guc: "Paacha karalo'uta anaasü no'upüna ashaaka. Nnojo pülüküin.",
          pbb: "Dxij piitstx sxawthe kse'te iskwe uwe'sxte ksa'jya'."
        },
        alert: {
          es: "Si la sangre no se detiene en brazos o piernas, aplica un torniquete 5 cm arriba de la herida.",
          guc: "Müleka nnojorüle eitain ashaa, paapa wane wariira pükotolüin.",
          pbb: "Iskwe kasejme'te, torniquete ksakwe 5 cm thegte."
        },
        svg: `<svg viewBox="0 0 240 180" fill="none">
          <path d="M30 90 L210 90" stroke="#fde047" stroke-width="32" stroke-linecap="round"/>
          <circle cx="120" cy="90" r="14" fill="#ef4444"/>
          <rect x="95" y="65" width="50" height="24" rx="4" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
          <rect x="100" y="40" width="40" height="22" rx="6" fill="#38bdf8"/>
          <line x1="120" y1="15" x2="120" y2="35" stroke="#ef4444" stroke-width="4"/>
          <polyline points="114,28 120,36 126,28" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
        </svg>`
      }
    ]
  }
]);
