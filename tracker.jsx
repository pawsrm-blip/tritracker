import { useState } from "react";

const PROFIL = {
  prenom: "Toi",
  regime: "végétarien ovo-lacto (+ huîtres à la maison)",
  poids: 72.1, mg: 18.6, objectifMG: 17, objectifPoids: 70,
  proteinesCible: 120,
  calRepos: 1400,
  calEntrainement: 2000,
  races: [
    { label: "Semi-Marathon", date: "2026-04-05", emoji: "🏃" },
    { label: "Deauville Triathlon", date: "2026-06-21", emoji: "🏅" },
  ],
};

const PLAN_SEMI = [
  { date: "2026-03-10", type: "course", label: "Sortie easy [OK]", detail: "5,28km — Thames Path — 27:24 — 5:11/km", allure: "5:11/km", couleur: "#84cc16", fait: true,
    etapes: [
      { label: "Échauffement", duree: "5 min", allure: "6:00/km", note: "Très facile" },
      { label: "Corps de séance", duree: "22 min", allure: "5:11/km", note: "Fréquence cardiaque basse" },
      { label: "Retour au calme", duree: "5 min", allure: "6:00/km", note: "" },
    ]},
  { date: "2026-03-12", type: "course", label: "Tempo 3+2 [OK]", detail: "8,78km — 45:49 — blocs 4:47/km", allure: "4:47/km", couleur: "#f97316", fait: true,
    etapes: [
      { label: "Échauffement", duree: "15 min", allure: "5:30/km", note: "" },
      { label: "Bloc tempo 1", duree: "3 km", allure: "4:47/km", note: "Effort contrôlé, respiration rythmée" },
      { label: "Récup", duree: "3 min", allure: "6:00/km", note: "Trot léger" },
      { label: "Bloc tempo 2", duree: "2 km", allure: "4:47/km", note: "Maintenir l'allure" },
      { label: "Retour au calme", duree: "10 min", allure: "5:30/km", note: "" },
    ]},
  { date: "2026-03-14", type: "course", label: "Sortie longue [OK]", detail: "14,01km — 1h13:04 — 5:13/km — 150bpm", allure: "5:13/km", couleur: "#84cc16", fait: true,
    etapes: [
      { label: "Départ facile", duree: "4 km", allure: "5:30/km", note: "FC < 140bpm" },
      { label: "Progression", duree: "7 km", allure: "5:13/km", note: "FC ~150bpm — zone 2/3" },
      { label: "Finale", duree: "3 km", allure: "5:03/km", note: "Progression naturelle" },
    ]},
  { date: "2026-03-16", type: "course", label: "Vélo récup 🚴 [OK]", detail: "30:22 — 233kcal — 117bpm moy — Z1 dominante", allure: "Zone 2", couleur: "#84cc16", fait: true,
    etapes: [
      { label: "Échauffement", duree: "5 min", allure: "Résistance légère", note: "FC < 120bpm" },
      { label: "Zone 2 continu", duree: "25-30 min", allure: "FC 130-140bpm", note: "Résistance modérée — circulation sanguine" },
      { label: "Retour au calme", duree: "5 min", allure: "Très léger", note: "Étirements dos + psoas après" },
    ]},
  { date: "2026-03-18", type: "course", label: "10x400m [OK] 🔥", detail: "7,62km — 39:14 — ~4:03/km moy (cible 4:20) — 152bpm — 554 kcal", allure: "4:03/km", couleur: "#f97316", fait: true,
    etapes: [
      { label: "Échauffement", duree: "2 km", allure: "5:30/km", note: "+ 4 accélérations progressives" },
      { label: "10 × 400m", duree: "400m × 10", allure: "4:20/km", note: "Récup 90s trot entre chaque" },
      { label: "Retour au calme", duree: "1 km", allure: "6:00/km", note: "Très facile" },
    ]},
  { date: "2026-03-22", type: "course", label: "Sortie longue", detail: "17km dont 8km a 4:59/km", allure: "5:10/km", couleur: "#3b82f6", fait: false,
    etapes: [
      { label: "Mise en route", duree: "4 km", allure: "5:30/km", note: "Facile" },
      { label: "Bloc allure cible", duree: "8 km", allure: "4:59/km", note: "Allure semi-marathon — tenir !" },
      { label: "Retour progressif", duree: "5 km", allure: "5:20/km", note: "Décompression" },
    ]},
  { date: "2026-03-24", type: "course", label: "Récup active", detail: "6km facile", allure: "5:50/km", couleur: "#84cc16", fait: false,
    etapes: [
      { label: "Footing continu", duree: "6 km", allure: "5:50/km", note: "FC < 135bpm" },
      { label: "Étirements", duree: "10 min", allure: "—", note: "Mobilité complète" },
    ]},
  { date: "2026-03-26", type: "course", label: "Tempo intervals", detail: "10km — 4x2km a 4:47/km — Quais de Seine BB", allure: "4:47/km", couleur: "#f97316", fait: false,
    etapes: [
      { label: "Échauffement", duree: "2 km", allure: "5:30/km", note: "Depuis chez toi jusqu'aux quais" },
      { label: "4 × 2km tempo", duree: "2km × 4", allure: "4:47/km", note: "Pont de Sèvres → Pont St-Cloud aller/retour — récup 2 min trot entre chaque" },
      { label: "Retour au calme", duree: "~1 km", allure: "6:00/km", note: "Retour à la maison" },
    ]},
  { date: "2026-03-29", type: "course", label: "Sortie longue max 🔑", detail: "17km dont 8km a 4:59/km — seance cle", allure: "5:05/km", couleur: "#3b82f6", fait: false,
    etapes: [
      { label: "Mise en route", duree: "4 km", allure: "5:20/km", note: "Jambes fraîches — ne pas partir vite" },
      { label: "Bloc allure cible 🔑", duree: "8 km", allure: "4:59/km", note: "Séance clé — confirme le 1h45" },
      { label: "Retour progressif", duree: "5 km", allure: "5:20/km", note: "Si encore frais → accélère km 15-17" },
    ]},
  { date: "2026-03-31", type: "course", label: "Taper facile", detail: "5km facile — debut taper", allure: "5:45/km", couleur: "#84cc16", fait: false,
    etapes: [
      { label: "Footing taper", duree: "5 km", allure: "5:45/km", note: "Garder les jambes sans les fatiguer" },
    ]},
  { date: "2026-04-02", type: "course", label: "Footing léger", detail: "4km recup active", allure: "5:50/km", couleur: "#84cc16", fait: false,
    etapes: [
      { label: "Footing léger", duree: "4 km", allure: "5:50/km", note: "Très facile — J-3" },
      { label: "4 × 100m", allure: "Fluide", duree: "100m × 4", note: "Juste pour activer les jambes" },
    ]},
  { date: "2026-04-04", type: "course", label: "Activation J-1", detail: "3km + 4x100m legers", allure: "Tres facile", couleur: "#84cc16", fait: false,
    etapes: [
      { label: "Footing", duree: "3 km", allure: "6:00/km", note: "Très très facile" },
      { label: "4 × 100m", duree: "100m × 4", allure: "Fluide", note: "Pas de sprint — juste réveiller les jambes" },
      { label: "Étirements légers", duree: "10 min", allure: "—", note: "Prépare la tenue et le dossard ce soir" },
    ]},
  { date: "2026-04-05", type: "race", label: "SEMI-MARATHON 🏁", detail: "Objectif 1h45 — allure 4:59/km", allure: "4:59/km", couleur: "#c17b3e", fait: false,
    etapes: [
      { label: "Km 1-3", duree: "~15 min", allure: "5:05/km", note: "Départ contrôlé — résister à l'euphorie" },
      { label: "Km 4-16", duree: "~60 min", allure: "4:59/km", note: "Allure cible — rythme de croisière" },
      { label: "Km 17-21,1", duree: "~21 min", allure: "Tout ce qu'il reste", note: "Vider le réservoir 🔥" },
    ]},
];

const SEMAINES_SEMI = [
  { label: "S1 — Londres", dates: ["2026-03-10","2026-03-12","2026-03-14"] },
  { label: "S2", dates: ["2026-03-16","2026-03-18","2026-03-22"] },
  { label: "S3 — Clé 🔑", dates: ["2026-03-24","2026-03-26","2026-03-29"] },
  { label: "S4 — Taper ⬇️", dates: ["2026-03-31","2026-04-02","2026-04-04"] },
  { label: "🏁 Race Day", dates: ["2026-04-05"] },
];

// ── Plan Triathlon Deauville ───────────────────────────────────────────────
const REPAS_TYPES = ["Petit-déjeuner","Déjeuner","Dîner","Collation","Sport 🏃"];

const PLAN_TRI = [
  // S1 (6-12 avr)
  { date: "2026-04-07", type: "run", label: "Run Z2 facile", detail: "6km facile — première sortie post-semi", allure: "5:40/km", couleur: "#84cc16", fait: false, etapes: [
    { label: "Footing continu", duree: "6 km", allure: "5:40/km", note: "FC < 135bpm — récup semi" },
  ]},
  { date: "2026-04-09", type: "natation", label: "Natation technique crawl", detail: "1000m crawl — focus technique", allure: "2:40/100m", couleur: "#06b6d4", fait: false, etapes: [
    { label: "Échauffement crawl", duree: "200m", allure: "Lent", note: "" },
    { label: "4x50m technique bras", duree: "4x50m", allure: "—", note: "Un bras à la fois — pull buoy" },
    { label: "Crawl continu", duree: "400m", allure: "2:40/100m", note: "Rythme confortable" },
    { label: "100m retour crawl", duree: "100m", allure: "Lent", note: "" },
  ]},
  { date: "2026-04-10", type: "muscu", label: "Muscu Phase 1 💪", detail: "Stabilisation gainage + sciatique", allure: "30 min", couleur: "#8b5cf6", fait: false, etapes: [
    { label: "Cat-cow + figure 4", duree: "5 min", allure: "—", note: "Échauffement" },
    { label: "Gainage transverse", duree: "3x10 resp.", allure: "—", note: "Le plus important" },
    { label: "Clamshell élastique", duree: "3x15/côté", allure: "—", note: "Fessier moyen — sciatique++" },
    { label: "Pont fessier bilatéral", duree: "3x15", allure: "—", note: "Lent et contrôlé" },
    { label: "Dead bug", duree: "3x8/côté", allure: "—", note: "Dos au sol plat" },
    { label: "Superman lent", duree: "3x10", allure: "—", note: "Multifides" },
    { label: "Étirements sciatique", duree: "5 min", allure: "—", note: "Piriforme + ischio 45s/côté" },
  ]},
  { date: "2026-04-11", type: "velo", label: "Vélo Z2", detail: "1h30 zone 2", allure: "24 km/h", couleur: "#3b82f6", fait: false, etapes: [
    { label: "Mise en route", duree: "20 min", allure: "Z1", note: "Cadence 85-90 rpm" },
    { label: "Zone 2 continu", duree: "55 min", allure: "24 km/h", note: "FC 135-145bpm" },
    { label: "Retour calme", duree: "15 min", allure: "Z1", note: "" },
  ]},
  // S2 (13-19 avr)
  { date: "2026-04-13", type: "run", label: "Run Z2", detail: "8km facile", allure: "5:30/km", couleur: "#84cc16", fait: false, etapes: [
    { label: "Footing Z2", duree: "8 km", allure: "5:30/km", note: "FC 135-145bpm" },
  ]},
  { date: "2026-04-14", type: "muscu", label: "Muscu Phase 1 💪", detail: "Stabilisation", allure: "30 min", couleur: "#8b5cf6", fait: false, etapes: [
    { label: "Routine Phase 1", duree: "30 min", allure: "—", note: "" },
  ]},
  { date: "2026-04-16", type: "natation", label: "Natation 1500m crawl", detail: "1500m crawl continu", allure: "2:40/100m", couleur: "#06b6d4", fait: false, etapes: [
    { label: "Échauffement", duree: "200m", allure: "Lent", note: "" },
    { label: "1000m crawl continu", duree: "1000m", allure: "2:40/100m", note: "Rythme régulier" },
    { label: "4x50m rapides", duree: "4x50m", allure: "2:10/100m", note: "Récup 20s" },
    { label: "100m retour", duree: "100m", allure: "Lent", note: "" },
  ]},
  { date: "2026-04-18", type: "velo", label: "Brique vélo+run", detail: "1h30 vélo + 20min run — première brique !", allure: "24 km/h", couleur: "#f97316", fait: false, etapes: [
    { label: "Vélo Z2", duree: "1h30", allure: "24 km/h", note: "FC 135-145bpm" },
    { label: "Transition T2", duree: "2-3 min", allure: "—", note: "Entraîne la transition — changer vite" },
    { label: "Run post-vélo", duree: "20 min", allure: "5:10/km", note: "Jambes lourdes normales — tiens le rythme" },
  ]},
  // S3 (20-26 avr)
  { date: "2026-04-20", type: "run", label: "Run Z2", detail: "8km facile", allure: "5:30/km", couleur: "#84cc16", fait: false, etapes: [
    { label: "Footing Z2", duree: "8 km", allure: "5:30/km", note: "" },
  ]},
  { date: "2026-04-21", type: "muscu", label: "Muscu Phase 2 💪", detail: "Construction — début charge", allure: "35 min", couleur: "#8b5cf6", fait: false, etapes: [
    { label: "Échauffement mobilité", duree: "5 min", allure: "—", note: "" },
    { label: "Squat goblet léger", duree: "3x12", allure: "—", note: "Dos droit, profondeur contrôlée" },
    { label: "Clamshell élastique", duree: "3x15/côté", allure: "—", note: "" },
    { label: "Pont fessier unilatéral", duree: "3x12/jambe", allure: "—", note: "" },
    { label: "Romanian deadlift léger", duree: "3x10", allure: "—", note: "Ischio excentrique — clé sciatique" },
    { label: "Tirage élastique vertical", duree: "3x15", allure: "—", note: "Puissance nage crawl" },
    { label: "Planche 3 points", duree: "3x30s/côté", allure: "—", note: "" },
    { label: "Étirements psoas + piriforme", duree: "5 min", allure: "—", note: "" },
  ]},
  { date: "2026-04-23", type: "natation", label: "Natation 1500m allure", detail: "1500m crawl allure cible", allure: "2:35/100m", couleur: "#06b6d4", fait: false, etapes: [
    { label: "Échauffement", duree: "200m", allure: "Lent", note: "" },
    { label: "1000m crawl allure cible", duree: "1000m", allure: "2:35/100m", note: "Progression vs 2:46 en course" },
    { label: "4x50m vite", duree: "4x50m", allure: "2:10/100m", note: "" },
    { label: "100m retour", duree: "100m", allure: "Lent", note: "" },
  ]},
  { date: "2026-04-25", type: "velo", label: "Vélo Z2 long", detail: "2h zone 2", allure: "25 km/h", couleur: "#3b82f6", fait: false, etapes: [
    { label: "Vélo Z2 progressif", duree: "2h", allure: "25 km/h", note: "FC 135-145bpm — montée en durée" },
  ]},
  // S4 (27 avr - 2 mai)
  { date: "2026-04-27", type: "run", label: "Run fractionné", detail: "8km dont 4x1km à 4:50/km", allure: "4:50/km", couleur: "#f97316", fait: false, etapes: [
    { label: "Échauffement", duree: "2 km", allure: "5:30/km", note: "" },
    { label: "4x1km", duree: "1km x 4", allure: "4:50/km", note: "Récup 90s trot" },
    { label: "Retour calme", duree: "2 km", allure: "5:30/km", note: "" },
  ]},
  { date: "2026-04-28", type: "muscu", label: "Muscu Phase 2 💪", detail: "Construction", allure: "35 min", couleur: "#8b5cf6", fait: false, etapes: [
    { label: "Routine Phase 2", duree: "35 min", allure: "—", note: "" },
  ]},
  { date: "2026-04-30", type: "natation", label: "Natation 2000m crawl", detail: "2000m dont 1000m allure course", allure: "2:35/100m", couleur: "#06b6d4", fait: false, etapes: [
    { label: "Échauffement", duree: "300m", allure: "Lent", note: "" },
    { label: "1000m crawl allure Deauville", duree: "1000m", allure: "2:35/100m", note: "Rythme cible" },
    { label: "4x100m récup", duree: "4x100m", allure: "2:46/100m", note: "Récup 20s" },
    { label: "300m retour", duree: "300m", allure: "Lent", note: "" },
  ]},
  { date: "2026-05-02", type: "velo", label: "Brique vélo+run", detail: "2h vélo + 25min run", allure: "25 km/h", couleur: "#f97316", fait: false, etapes: [
    { label: "Vélo 2h", duree: "2h", allure: "25 km/h", note: "FC 135-145bpm" },
    { label: "Transition T2", duree: "2-3 min", allure: "—", note: "Rapidité transition" },
    { label: "Run 25min", duree: "25 min", allure: "5:10/km", note: "Tenir l'allure malgré les jambes" },
  ]},
  // S5 Annecy (6-10 mai)
  { date: "2026-05-06", type: "run", label: "Run découverte Annecy", detail: "6km facile", allure: "5:30/km", couleur: "#84cc16", fait: false, etapes: [
    { label: "Footing découverte", duree: "6 km", allure: "5:30/km", note: "Profite du paysage !" },
  ]},
  { date: "2026-05-07", type: "muscu", label: "Muscu Phase 2 💪", detail: "Annecy — chambre hôtel", allure: "35 min", couleur: "#8b5cf6", fait: false, etapes: [
    { label: "Routine Phase 2", duree: "35 min", allure: "—", note: "Chambre hôtel OK" },
  ]},
  { date: "2026-05-08", type: "natation", label: "Nage lac Annecy — eau libre", detail: "1500m crawl eau libre — première expérience !", allure: "2:35/100m", couleur: "#06b6d4", fait: false, etapes: [
    { label: "Adaptation eau froide", duree: "5 min", allure: "—", note: "Lac ~12-14C — combinaison indispensable !" },
    { label: "1500m crawl eau libre", duree: "~40 min", allure: "2:35/100m", note: "Navigation à vue — lève la tête toutes les 10 brasses" },
    { label: "Bilan sensations", duree: "—", allure: "—", note: "Eau libre vs piscine — noter les différences" },
  ]},
  { date: "2026-05-09", type: "velo", label: "Vélo lac Annecy", detail: "2h autour du lac", allure: "25-27 km/h", couleur: "#3b82f6", fait: false, etapes: [
    { label: "Tour du lac Annecy", duree: "2h", allure: "25-27 km/h", note: "~40km avec D+ — parfait simulation Deauville" },
  ]},
  { date: "2026-05-10", type: "run", label: "Brique nage+run Annecy", detail: "1500m lac crawl + 20min run", allure: "5:10/km", couleur: "#f97316", fait: false, etapes: [
    { label: "1500m crawl lac", duree: "~40 min", allure: "2:35/100m", note: "Deuxième eau libre" },
    { label: "Transition T1", duree: "3 min", allure: "—", note: "Combinaison → chaussures run" },
    { label: "Run post-nage", duree: "20 min", allure: "5:10/km", note: "Sensation clé — jambes de nage vers course !" },
  ]},
  // S6 (11-17 mai — dont Villard)
  { date: "2026-05-13", type: "natation", label: "Natation 2000m crawl", detail: "2000m crawl maintien", allure: "2:35/100m", couleur: "#06b6d4", fait: false, etapes: [
    { label: "2000m crawl continu", duree: "~45 min", allure: "2:35/100m", note: "" },
  ]},
  { date: "2026-05-15", type: "run", label: "Run trail Villard", detail: "6km trail", allure: "6:00/km", couleur: "#84cc16", fait: false, etapes: [
    { label: "Trail découverte", duree: "6 km", allure: "6:00/km", note: "Terrain varié — proprioception++" },
  ]},
  { date: "2026-05-16", type: "velo", label: "Vélo D+ Villard", detail: "2h vélo montagne", allure: "20 km/h D+", couleur: "#3b82f6", fait: false, etapes: [
    { label: "Sortie vélo D+", duree: "2h", allure: "20 km/h moy", note: "Montées en force — descentes techniques" },
  ]},
  { date: "2026-05-17", type: "run", label: "Run trail Villard retour", detail: "8km trail", allure: "5:50/km", couleur: "#84cc16", fait: false, etapes: [
    { label: "Trail", duree: "8 km", allure: "5:50/km", note: "" },
  ]},
  // S7 (18-24 mai)
  { date: "2026-05-19", type: "muscu", label: "Muscu Phase 3 💪", detail: "Puissance — début Phase 3", allure: "35 min", couleur: "#8b5cf6", fait: false, etapes: [
    { label: "Échauffement mobilité complète", duree: "5 min", allure: "—", note: "" },
    { label: "Squat bulgare", duree: "3x10/jambe", allure: "—", note: "Puissance vélo" },
    { label: "Romanian deadlift", duree: "3x12", allure: "—", note: "Charge progressive" },
    { label: "Fente avec rotation", duree: "3x8/côté", allure: "—", note: "" },
    { label: "Tirage élastique vertical", duree: "3x15", allure: "—", note: "Puissance crawl" },
    { label: "Nordic curl excentrique", duree: "3x6", allure: "—", note: "Y aller doucement" },
    { label: "Étirements sciatique", duree: "5 min", allure: "—", note: "" },
  ]},
  { date: "2026-05-20", type: "natation", label: "Natation 2000m allure crawl", detail: "2000m dont 1500m allure Deauville", allure: "2:35/100m", couleur: "#06b6d4", fait: false, etapes: [
    { label: "Échauffement", duree: "200m", allure: "Lent", note: "" },
    { label: "1500m crawl allure Deauville", duree: "1500m", allure: "2:35/100m", note: "Simulation distance course" },
    { label: "300m retour", duree: "300m", allure: "Lent", note: "" },
  ]},
  { date: "2026-05-22", type: "run", label: "Run allure olympique", detail: "10km à 5:00/km", allure: "5:00/km", couleur: "#f97316", fait: false, etapes: [
    { label: "Échauffement", duree: "2 km", allure: "5:30/km", note: "" },
    { label: "8km allure course", duree: "8 km", allure: "5:00/km", note: "Allure Deauville — tenir !" },
    { label: "Retour calme", duree: "—", allure: "—", note: "" },
  ]},
  { date: "2026-05-24", type: "velo", label: "Brique vélo+run", detail: "40km vélo + 5km run", allure: "27 km/h", couleur: "#f97316", fait: false, etapes: [
    { label: "Vélo 40km", duree: "~1h29", allure: "27 km/h", note: "Allure Deauville" },
    { label: "Transition T2", duree: "3 min", allure: "—", note: "" },
    { label: "Run 5km", duree: "~25 min", allure: "5:00/km", note: "Jambes de vélo — tiens l'allure" },
  ]},
  // S8 (25-31 mai)
  { date: "2026-05-26", type: "muscu", label: "Muscu Phase 3 💪", detail: "Puissance", allure: "35 min", couleur: "#8b5cf6", fait: false, etapes: [
    { label: "Routine Phase 3", duree: "35 min", allure: "—", note: "" },
  ]},
  { date: "2026-05-27", type: "natation", label: "Natation 2000m crawl", detail: "2000m crawl maintien", allure: "2:35/100m", couleur: "#06b6d4", fait: false, etapes: [
    { label: "2000m crawl", duree: "~45 min", allure: "2:35/100m", note: "" },
  ]},
  { date: "2026-05-29", type: "run", label: "Run 10km allure", detail: "10km à 5:00/km", allure: "5:00/km", couleur: "#f97316", fait: false, etapes: [
    { label: "10km allure course", duree: "10 km", allure: "5:00/km", note: "Dernière longue run avant brique clé" },
  ]},
  { date: "2026-05-31", type: "velo", label: "Brique complète", detail: "40km vélo + 8km run — séance clé !", allure: "27 km/h", couleur: "#f97316", fait: false, etapes: [
    { label: "Vélo 40km", duree: "~1h29", allure: "27 km/h", note: "Allure Deauville" },
    { label: "Transition T2", duree: "3 min", allure: "—", note: "" },
    { label: "Run 8km", duree: "~40 min", allure: "5:00/km", note: "Séance clé — confirme l'objectif 2h55-3h00" },
  ]},
  // S9 (1-7 juin)
  { date: "2026-06-02", type: "muscu", label: "Muscu Phase 3 💪", detail: "Récup brique clé", allure: "35 min", couleur: "#8b5cf6", fait: false, etapes: [
    { label: "Gainage léger + étirements", duree: "35 min", allure: "—", note: "Récup post-brique clé" },
  ]},
  { date: "2026-06-03", type: "natation", label: "Natation 2000m crawl", detail: "2000m crawl allure", allure: "2:35/100m", couleur: "#06b6d4", fait: false, etapes: [
    { label: "2000m crawl allure", duree: "~45 min", allure: "2:35/100m", note: "" },
  ]},
  { date: "2026-06-05", type: "run", label: "Run 8km allure", detail: "8km à 5:00/km", allure: "5:00/km", couleur: "#f97316", fait: false, etapes: [
    { label: "8km allure course", duree: "8 km", allure: "5:00/km", note: "" },
  ]},
  { date: "2026-06-07", type: "velo", label: "Vélo allure + run", detail: "2h vélo + 20min run", allure: "27 km/h", couleur: "#3b82f6", fait: false, etapes: [
    { label: "Vélo 2h allure", duree: "2h", allure: "27 km/h", note: "Dernière longue vélo" },
    { label: "Run 20min", duree: "20 min", allure: "5:05/km", note: "" },
  ]},
  // S10 Taper (8-14 juin)
  { date: "2026-06-09", type: "natation", label: "Natation taper crawl", detail: "1200m crawl", allure: "2:35/100m", couleur: "#06b6d4", fait: false, etapes: [
    { label: "1200m crawl", duree: "~25 min", allure: "2:35/100m", note: "Volume -40%" },
  ]},
  { date: "2026-06-11", type: "run", label: "Run taper", detail: "6km allure course", allure: "5:00/km", couleur: "#84cc16", fait: false, etapes: [
    { label: "6km allure", duree: "6 km", allure: "5:00/km", note: "Léger mais vif" },
  ]},
  { date: "2026-06-12", type: "muscu", label: "Muscu taper", detail: "Phase 1 allégée", allure: "20 min", couleur: "#8b5cf6", fait: false, etapes: [
    { label: "Routine Phase 1 allégée", duree: "20 min", allure: "—", note: "Maintien uniquement" },
  ]},
  { date: "2026-06-13", type: "velo", label: "Vélo taper", detail: "1h léger", allure: "Z2", couleur: "#3b82f6", fait: false, etapes: [
    { label: "Vélo léger", duree: "1h", allure: "Z2", note: "Garder les jambes sans fatiguer" },
  ]},
  // S11 Taper final (15-21 juin)
  { date: "2026-06-15", type: "natation", label: "Natation taper crawl", detail: "1000m crawl", allure: "2:35/100m", couleur: "#06b6d4", fait: false, etapes: [
    { label: "1000m crawl", duree: "~20 min", allure: "2:35/100m", note: "" },
  ]},
  { date: "2026-06-17", type: "run", label: "Run activation", detail: "4km + accélérations", allure: "5:10/km", couleur: "#84cc16", fait: false, etapes: [
    { label: "Footing", duree: "4 km", allure: "5:10/km", note: "J-4 — garder les jambes vives" },
    { label: "4x100m", duree: "4x100m", allure: "Fluide", note: "Pas de sprint" },
  ]},
  { date: "2026-06-19", type: "velo", label: "Activation vélo+run", detail: "30min vélo + 15min run", allure: "Z2", couleur: "#3b82f6", fait: false, etapes: [
    { label: "Vélo 30min", duree: "30 min", allure: "Z2", note: "J-2 — vérification mécanique vélo !" },
    { label: "Run 15min", duree: "15 min", allure: "5:10/km", note: "Juste activer" },
  ]},
  { date: "2026-06-20", type: "repos", label: "Repos total J-1", detail: "Récup, logistique, matos", allure: "—", couleur: "#9a928a", fait: false, etapes: [
    { label: "Récup", duree: "—", allure: "—", note: "Prépare combinaison, vélo, nutrition course" },
    { label: "Hydratation++", duree: "—", allure: "—", note: "2-3L eau dans la journée" },
    { label: "Repas glucides", duree: "—", allure: "—", note: "Pâtes/riz le soir — charge glucidique" },
  ]},
  { date: "2026-06-21", type: "race", label: "TRIATHLON DEAUVILLE", detail: "Objectif 2h55-3h00 — 1,5km crawl / 40km vélo / 10km run", allure: "2h55-3h00", couleur: "#c17b3e", fait: false, etapes: [
    { label: "Crawl 1,5km", duree: "~38-40 min", allure: "2:35-2:40/100m", note: "Départ calme — navigation à vue, lève la tête régulièrement" },
    { label: "T1", duree: "~5 min", allure: "—", note: "Combinaison → casque → vélo" },
    { label: "Vélo 40km +400m D+", duree: "~1h28-1h30", allure: "27 km/h", note: "Gestion effort — garder 20% pour le run" },
    { label: "T2", duree: "~3 min", allure: "—", note: "Casque → chaussures run" },
    { label: "Run 10km", duree: "~50-52 min", allure: "5:00-5:12/km", note: "Km 1-2 patience — km 5+ tout donner" },
  ]},
];

const BLOCS_TRI = [
  { label: "Bloc 1 — Base S1 (6-12 avr)", dates: ["2026-04-07","2026-04-09","2026-04-10","2026-04-11"] },
  { label: "Bloc 1 — Base S2 (13-19 avr)", dates: ["2026-04-13","2026-04-14","2026-04-16","2026-04-18"] },
  { label: "Bloc 1 — Base S3 (20-26 avr)", dates: ["2026-04-20","2026-04-21","2026-04-23","2026-04-25"] },
  { label: "Bloc 1 — Base S4 (27 avr - 2 mai)", dates: ["2026-04-27","2026-04-28","2026-04-30","2026-05-02"] },
  { label: "Bloc 2 — Construction S5 Annecy (6-10 mai)", dates: ["2026-05-06","2026-05-07","2026-05-08","2026-05-09","2026-05-10"] },
  { label: "Bloc 2 — Construction S6 (11-17 mai — Villard)", dates: ["2026-05-13","2026-05-15","2026-05-16","2026-05-17"] },
  { label: "Bloc 3 — Spécifique S7 (18-24 mai)", dates: ["2026-05-19","2026-05-20","2026-05-22","2026-05-24"] },
  { label: "Bloc 3 — Spécifique S8 (25-31 mai)", dates: ["2026-05-26","2026-05-27","2026-05-29","2026-05-31"] },
  { label: "Bloc 3 — Spécifique S9 (1-7 juin)", dates: ["2026-06-02","2026-06-03","2026-06-05","2026-06-07"] },
  { label: "Bloc 4 — Taper S10 (8-14 juin)", dates: ["2026-06-09","2026-06-11","2026-06-12","2026-06-13"] },
  { label: "Bloc 4 — Taper S11 (15-21 juin)", dates: ["2026-06-15","2026-06-17","2026-06-19","2026-06-20"] },
  { label: "Race Day", dates: ["2026-06-21"] },
];

function joursAvant(dateStr) {
  const d = new Date(dateStr); d.setHours(0,0,0,0);
  const n = new Date(); n.setHours(0,0,0,0);
  return Math.max(0, Math.round((d - n) / 86400000));
}

function cleAujourdhui() {
  return new Date().toISOString().split("T")[0];
}

function useStorage(key, def) {
  const [v, setV] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : def; }
    catch { return def; }
  });
  const set = (val) => { setV(val); try { localStorage.setItem(key, JSON.stringify(val)); } catch {} };
  return [v, set];
}

function conseilProteines(proteinesLoggees, cible, repasRestants) {
  const manque = cible - proteinesLoggees;
  if (manque <= 0) return { color: "#84cc16", msg: "🎉 Objectif protéines atteint aujourd'hui !" };
  if (manque <= 10) return { color: "#84cc16", msg: `🟢 Presque ! Plus que ${manque}g — un yaourt grec suffit.` };
  if (repasRestants === 0) return { color: "#ef4444", msg: `⚠️ Journée terminée avec ${proteinesLoggees}g/${cible}g. Demain : 3 œufs au petit déj !` };
  const parRepas = Math.round(manque / repasRestants);
  const exemples = parRepas > 35 ? "3 œufs + 200g skyr + 1 scoop whey"
    : parRepas > 25 ? "2 œufs brouillés + 150g fromage blanc 0%"
    : parRepas > 15 ? "200g skyr ou 100g tempeh"
    : "1 œuf dur ou 30g parmesan";
  return {
    color: parRepas > 30 ? "#ef4444" : "#f97316",
    msg: `Il te manque ${manque}g. Sur ${repasRestants} repas → ~${parRepas}g/repas. 🌱 Ex : ${exemples}.`
  };
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Figtree:wght@300;400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#f5f2ee;}
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-thumb{background:#d4cfc9;border-radius:2px;}
input,select,textarea{outline:none;font-family:inherit;}
button{cursor:pointer;font-family:inherit;}
.card{background:#fff;border-radius:20px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.06);}
.inp{width:100%;background:#f5f2ee;border:1.5px solid #e8e3dc;border-radius:10px;padding:10px 13px;color:#2a2520;font-size:14px;font-family:inherit;}
.inp:focus{border-color:#c17b3e;}
.inp::placeholder{color:#b5afa8;}
.btn-main{width:100%;border:none;border-radius:12px;padding:13px;font-size:14px;font-weight:700;font-family:inherit;background:#2a2520;color:#f5f2ee;transition:opacity .15s;}
.btn-main:hover{opacity:.85;}
.btn-sec{background:#f5f2ee;border:1.5px solid #e8e3dc;border-radius:10px;padding:8px 14px;font-size:13px;font-weight:600;color:#7a7068;transition:all .15s;}
.btn-sec:hover{border-color:#c17b3e;color:#c17b3e;}
.pill-type{border:1.5px solid #e8e3dc;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:600;background:#fff;color:#7a7068;transition:all .15s;}
.pill-type:hover{border-color:#c17b3e;color:#c17b3e;}
.pill-type.on{background:#c17b3e;color:#fff;border-color:#c17b3e;}
.bar{background:#f0ece6;border-radius:99px;height:8px;overflow:hidden;}
.bar-f{height:100%;border-radius:99px;transition:width .6s ease;}
.rmv{background:none;border:none;color:#ccc;font-size:18px;padding:0 4px;transition:color .15s;line-height:1;}
.rmv:hover{color:#ef4444;}
label{font-size:11px;color:#9a928a;font-weight:600;display:block;margin-bottom:5px;text-transform:uppercase;letter-spacing:.6px;}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.fade-in{animation:fadeIn .3s ease;}
@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
`;

export default function App() {
  const mkJ = (prot, cal, sport=false, sportCal=0) => ({
    entrainement: sport,
    repas: [
      { id: 1, type: "Petit-déjeuner", description: "Petit-déjeuner", proteines: Math.round(prot*0.20), calories: Math.round(cal*0.22), heure: "08:00" },
      { id: 2, type: "Déjeuner", description: "Déjeuner", proteines: Math.round(prot*0.38), calories: Math.round(cal*0.38), heure: "13:00" },
      { id: 3, type: "Dîner", description: "Dîner", proteines: Math.round(prot*0.42), calories: Math.round(cal*0.40), heure: "20:00" },
      ...(sport && sportCal > 0 ? [{ id: 9, type: "Sport 🏃", description: "Entraînement", proteines: 0, calories: -sportCal, isSport: true, heure: "17:00" }] : []),
    ]
  });

  const DEFAULT_LOGS = {    "2026-03-19": { entrainement: false, commentaire: "🟢 Journée verte Foodvisor — majorité d'aliments verts. 1840 kcal · 79g protéines · 79g lipides · 186g glucides · 26g fibres. Dîner festif — champagne + gâteau chocolat 🎂🥂", repas: [
      { id: 1, type: "Petit-déjeuner", description: "Kiwi · Protéines végétales Nutripure · Skyr nature · Banane", proteines: 18, calories: 338, isSport: false, heure: "07:30" },
      { id: 2, type: "Déjeuner", description: "Petit brownie · Tranche de pain · Canneloni ricotta épinard", proteines: 28, calories: 710, isSport: false, heure: "12:30" },
      { id: 3, type: "Dîner", description: "Champagne · Gâteau au chocolat · Légumes frais variés · Carrés de chocolat", proteines: 33, calories: 792, isSport: false, heure: "20:00" },
    ]},
    "2025-12-27": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 60, calories: 1400, isSport: false, heure: "12:00" } ] },
    "2025-12-28": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 70, calories: 1350, isSport: false, heure: "12:00" } ] },
    "2025-12-29": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 65, calories: 1900, isSport: false, heure: "12:00" } ] },
    "2025-12-30": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 55, calories: 1300, isSport: false, heure: "12:00" } ] },
    "2025-12-31": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 125, calories: 2600, isSport: false, heure: "12:00" } ] },
    "2026-01-01": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 20, calories: 750, isSport: false, heure: "12:00" } ] },
    "2026-01-02": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 40, calories: 280, isSport: false, heure: "12:00" } ] },
    "2026-01-03": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 45, calories: 850, isSport: false, heure: "12:00" } ] },
    "2026-01-04": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 10, calories: 180, isSport: false, heure: "12:00" } ] },
    "2026-01-05": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 65, calories: 1300, isSport: false, heure: "12:00" } ] },
    "2026-01-06": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 75, calories: 1400, isSport: false, heure: "12:00" } ] },
    "2026-01-07": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 30, calories: 650, isSport: false, heure: "12:00" } ] },
    "2026-01-08": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 70, calories: 1400, isSport: false, heure: "12:00" } ] },
    "2026-01-09": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 65, calories: 1300, isSport: false, heure: "12:00" } ] },
    "2026-01-10": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 75, calories: 1500, isSport: false, heure: "12:00" } ] },
    "2026-01-11": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 55, calories: 1100, isSport: false, heure: "12:00" } ] },
    "2026-01-12": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 95, calories: 2700, isSport: false, heure: "12:00" } ] },
    "2026-01-13": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 80, calories: 1600, isSport: false, heure: "12:00" } ] },
    "2026-01-14": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 65, calories: 1300, isSport: false, heure: "12:00" } ] },
    "2026-01-15": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 60, calories: 1200, isSport: false, heure: "12:00" } ] },
    "2026-01-16": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 70, calories: 1400, isSport: false, heure: "12:00" } ] },
    "2026-01-17": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 75, calories: 1500, isSport: false, heure: "12:00" } ] },
    "2026-01-18": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 80, calories: 1600, isSport: false, heure: "12:00" } ] },
    "2026-01-19": { entrainement: true, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 85, calories: 1700, isSport: false, heure: "12:00" }, { id: 9, type: "Sport 🏃", description: "Séance", proteines: 0, calories: -350, isSport: true, heure: "08:00" } ] },
    "2026-01-20": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 90, calories: 1900, isSport: false, heure: "12:00" } ] },
    "2026-01-21": { entrainement: true, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 85, calories: 1800, isSport: false, heure: "12:00" }, { id: 9, type: "Sport 🏃", description: "Séance", proteines: 0, calories: -350, isSport: true, heure: "08:00" } ] },
    "2026-01-22": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 75, calories: 1500, isSport: false, heure: "12:00" } ] },
    "2026-01-23": { entrainement: true, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 70, calories: 1400, isSport: false, heure: "12:00" }, { id: 9, type: "Sport 🏃", description: "Séance", proteines: 0, calories: -350, isSport: true, heure: "08:00" } ] },
    "2026-01-24": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 65, calories: 1300, isSport: false, heure: "12:00" } ] },
    "2026-01-25": { entrainement: true, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 60, calories: 1200, isSport: false, heure: "12:00" }, { id: 9, type: "Sport 🏃", description: "Séance", proteines: 0, calories: -350, isSport: true, heure: "08:00" } ] },
    "2026-01-26": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 50, calories: 1100, isSport: false, heure: "12:00" } ] },
    "2026-01-27": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 45, calories: 1000, isSport: false, heure: "12:00" } ] },
    "2026-01-28": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 95, calories: 2300, isSport: false, heure: "12:00" } ] },
    "2026-01-29": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 60, calories: 1300, isSport: false, heure: "12:00" } ] },
    "2026-01-30": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 70, calories: 1400, isSport: false, heure: "12:00" } ] },
    "2026-01-31": { entrainement: true, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 75, calories: 1500, isSport: false, heure: "12:00" }, { id: 9, type: "Sport 🏃", description: "Séance", proteines: 0, calories: -350, isSport: true, heure: "08:00" } ] },
    "2026-02-01": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 80, calories: 1850, isSport: false, heure: "12:00" } ] },
    "2026-02-02": { entrainement: true, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 90, calories: 1650, isSport: false, heure: "12:00" }, { id: 9, type: "Sport 🏃", description: "Séance", proteines: 0, calories: -350, isSport: true, heure: "08:00" } ] },
    "2026-02-03": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 75, calories: 1550, isSport: false, heure: "12:00" } ] },
    "2026-02-04": { entrainement: true, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 65, calories: 1450, isSport: false, heure: "12:00" }, { id: 9, type: "Sport 🏃", description: "Séance", proteines: 0, calories: -350, isSport: true, heure: "08:00" } ] },
    "2026-02-05": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 70, calories: 1650, isSport: false, heure: "12:00" } ] },
    "2026-02-06": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 60, calories: 1750, isSport: false, heure: "12:00" } ] },
    "2026-02-07": { entrainement: true, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 55, calories: 1750, isSport: false, heure: "12:00" }, { id: 9, type: "Sport 🏃", description: "Séance", proteines: 0, calories: -350, isSport: true, heure: "08:00" } ] },
    "2026-02-08": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 65, calories: 1550, isSport: false, heure: "12:00" } ] },
    "2026-02-09": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 60, calories: 1450, isSport: false, heure: "12:00" } ] },
    "2026-02-10": { entrainement: true, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 70, calories: 1650, isSport: false, heure: "12:00" }, { id: 9, type: "Sport 🏃", description: "Séance", proteines: 0, calories: -350, isSport: true, heure: "08:00" } ] },
    "2026-02-11": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 80, calories: 1950, isSport: false, heure: "12:00" } ] },
    "2026-02-12": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 90, calories: 2150, isSport: false, heure: "12:00" } ] },
    "2026-02-13": { entrainement: true, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 85, calories: 1850, isSport: false, heure: "12:00" }, { id: 9, type: "Sport 🏃", description: "Séance", proteines: 0, calories: -350, isSport: true, heure: "08:00" } ] },
    "2026-02-14": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 80, calories: 1650, isSport: false, heure: "12:00" } ] },
    "2026-02-15": { entrainement: true, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 160, calories: 2250, isSport: false, heure: "12:00" }, { id: 9, type: "Sport 🏃", description: "Séance", proteines: 0, calories: -350, isSport: true, heure: "08:00" } ] },
    "2026-02-16": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 150, calories: 2050, isSport: false, heure: "12:00" } ] },
    "2026-02-17": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 130, calories: 2150, isSport: false, heure: "12:00" } ] },
    "2026-02-18": { entrainement: true, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 110, calories: 1950, isSport: false, heure: "12:00" }, { id: 9, type: "Sport 🏃", description: "Séance", proteines: 0, calories: -350, isSport: true, heure: "08:00" } ] },
    "2026-02-19": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 120, calories: 2050, isSport: false, heure: "12:00" } ] },
    "2026-02-20": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 110, calories: 1850, isSport: false, heure: "12:00" } ] },
    "2026-02-21": { entrainement: true, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 100, calories: 1950, isSport: false, heure: "12:00" }, { id: 9, type: "Sport 🏃", description: "Séance", proteines: 0, calories: -350, isSport: true, heure: "08:00" } ] },
    "2026-02-22": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 105, calories: 1950, isSport: false, heure: "12:00" } ] },
    "2026-02-23": { entrainement: true, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 100, calories: 2850, isSport: false, heure: "12:00" }, { id: 9, type: "Sport 🏃", description: "Séance", proteines: 0, calories: -350, isSport: true, heure: "08:00" } ] },
    "2026-02-24": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 95, calories: 2150, isSport: false, heure: "12:00" } ] },
    "2026-02-25": { entrainement: true, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 90, calories: 2350, isSport: false, heure: "12:00" }, { id: 9, type: "Sport 🏃", description: "Séance", proteines: 0, calories: -350, isSport: true, heure: "08:00" } ] },
    "2026-02-26": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 85, calories: 2350, isSport: false, heure: "12:00" } ] },
    "2026-02-27": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 50, calories: 1150, isSport: false, heure: "12:00" } ] },
    "2026-02-28": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 10, calories: 750, isSport: false, heure: "12:00" } ] },
    "2026-03-01": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 5, calories: 80, isSport: false, heure: "12:00" } ] },
    "2026-03-02": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 5, calories: 80, isSport: false, heure: "12:00" } ] },
    "2026-03-03": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 40, calories: 800, isSport: false, heure: "12:00" } ] },
    "2026-03-04": { entrainement: true, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 55, calories: 180, isSport: false, heure: "12:00" }, { id: 9, type: "Sport 🏃", description: "Séance", proteines: 0, calories: -350, isSport: true, heure: "08:00" } ] },
    "2026-03-05": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 120, calories: 1250, isSport: false, heure: "12:00" } ] },
    "2026-03-06": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 150, calories: 1550, isSport: false, heure: "12:00" } ] },
    "2026-03-07": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 130, calories: 1650, isSport: false, heure: "12:00" } ] },
    "2026-03-08": { entrainement: false, repas: [ { id: 1, type: "Repas", description: "Alimentation du jour", proteines: 65, calories: 1750, isSport: false, heure: "12:00" } ] },
    "2026-03-04": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Vélo intérieur — Vélo d'intérieur 90 kcal + Nage 360m", proteines: 0, calories: -90, isSport: true, heure: "08:00" },
    ]},
    "2026-02-25": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Course — Course plein air 8,17km", proteines: 0, calories: -380, isSport: true, heure: "08:00" },
    ]},
    "2026-02-23": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Course — Course tapis 7,35km", proteines: 0, calories: -310, isSport: true, heure: "08:00" },
    ]},
    "2026-02-21": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Course — Course plein air 10,51km", proteines: 0, calories: -420, isSport: true, heure: "08:00" },
    ]},
    "2026-02-18": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Course — Course tapis 18,02km", proteines: 0, calories: -720, isSport: true, heure: "08:00" },
    ]},
    "2026-02-15": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Course — Course plein air 11,33km", proteines: 0, calories: -450, isSport: true, heure: "08:00" },
    ]},
    "2026-02-13": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Course — Course plein air 7,14km", proteines: 0, calories: -290, isSport: true, heure: "08:00" },
    ]},
    "2026-02-10": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Natation — Nage piscine 1000m", proteines: 0, calories: -220, isSport: true, heure: "08:00" },
    ]},
    "2026-02-07": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Course — Course plein air 18,03km", proteines: 0, calories: -740, isSport: true, heure: "08:00" },
    ]},
    "2026-02-04": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Course — Course plein air 10,02km", proteines: 0, calories: -410, isSport: true, heure: "08:00" },
    ]},
    "2026-02-02": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Vélo intérieur — Vélo d'intérieur 395 kcal", proteines: 0, calories: -395, isSport: true, heure: "08:00" },
    ]},
    "2026-01-31": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Course — Course plein air 8km + marche 1,89km", proteines: 0, calories: -340, isSport: true, heure: "08:00" },
    ]},
    "2026-01-25": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Vélo — Vélo plein air 30,15km", proteines: 0, calories: -500, isSport: true, heure: "08:00" },
    ]},
    "2026-01-23": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Natation — Nage piscine 1500m", proteines: 0, calories: -290, isSport: true, heure: "08:00" },
    ]},
    "2026-01-21": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Course — Course plein air 10,01km", proteines: 0, calories: -410, isSport: true, heure: "08:00" },
    ]},
    "2026-01-19": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Vélo intérieur — Vélo d'intérieur 227 kcal", proteines: 0, calories: -227, isSport: true, heure: "08:00" },
    ]},
    "2025-12-19": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Course — Course plein air 10km", proteines: 0, calories: -410, isSport: true, heure: "08:00" },
    ]},
    "2025-12-16": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Vélo intérieur — Vélo avec Tyrell 425 kcal", proteines: 0, calories: -425, isSport: true, heure: "08:00" },
    ]},
    "2025-12-14": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Natation — Nage piscine 2000m", proteines: 0, calories: -380, isSport: true, heure: "08:00" },
    ]},
    "2025-12-12": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Course — Course tapis 5km", proteines: 0, calories: -210, isSport: true, heure: "08:00" },
    ]},
    "2025-12-10": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Vélo intérieur — Vélo avec Emily 284 kcal", proteines: 0, calories: -284, isSport: true, heure: "08:00" },
    ]},
    "2025-12-08": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Vélo intérieur — Vélo avec Tyrell 410 kcal", proteines: 0, calories: -410, isSport: true, heure: "08:00" },
    ]},
    "2025-12-06": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Natation — Nage piscine 1500m", proteines: 0, calories: -290, isSport: true, heure: "08:00" },
    ]},
    "2025-12-01": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Vélo intérieur — Vélo avec Kym 104 kcal", proteines: 0, calories: -104, isSport: true, heure: "08:00" },
    ]},
    "2025-11-29": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Course — Course plein air 5,01km + marche 1,28km", proteines: 0, calories: -220, isSport: true, heure: "08:00" },
    ]},
    "2025-11-22": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Tennis — Tennis 343 kcal", proteines: 0, calories: -343, isSport: true, heure: "08:00" },
    ]},
    "2025-11-09": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Vélo — Vélo plein air 23,59km", proteines: 0, calories: -420, isSport: true, heure: "08:00" },
    ]},
    "2025-11-07": { entrainement: true, repas: [
      { id: 9, type: "Sport 🏃", description: "Course — Course plein air 10,03km", proteines: 0, calories: -410, isSport: true, heure: "08:00" },
    ]},
    "2026-03-18": { entrainement: true, commentaire: "🔥 10x400m réussi haut la main — ~4:03/km vs cible 4:20/km ! ✅ 111g protéines — objectif atteint malgré séance intense. ✅ 503 kcal dépensées sport. ❌ Seulement 1661 kcal brutes pour un jour d'entraînement intense — un peu léger, le corps aurait mérité plus après 554 kcal brûlées.", repas: [
      { id: 1, type: "Petit-déjeuner", description: "Banane", proteines: 1, calories: 105, heure: "07:00" },
      { id: 2, type: "Déjeuner", description: "Salade composée riz, lentilles, carottes, patates douces, haricots verts, tomates cerise", proteines: 22, calories: 420, heure: "13:00" },
      { id: 3, type: "Dîner", description: "Carrés chocolat noir 74% + Figue confite + Skyr nature + Protéines végétales Nutripure", proteines: 55, calories: 885, heure: "20:00" },
      { id: 4, type: "En-cas", description: "Amandes + Yaourt HiPro Fraise", proteines: 18, calories: 251, heure: "16:00" },
      { id: 9, type: "Sport 🏃", description: "10x400m — 7,62km — 39:14 — 152bpm — 554 kcal — Difficile 8/10", proteines: 0, calories: -503, isSport: true, heure: "07:07" },
    ]},
    "2026-03-17": { entrainement: false, commentaire: "✅ Protéines à 111g — quasi objectif pour un jour repos. ✅ Journée verte Foodvisor. ❌ Calories à 2065 kcal — un peu au-dessus de la cible repos (1400 kcal) surtout à cause du déjeuner chargé (1028 kcal). La tranche de gâteau au beurre au dîner n'a pas aidé 😄 Demain 10x400m — charge glucides bienvenue !", repas: [
      { id: 1, type: "Petit-déjeuner", description: "Graine de chia + Skyr nature + Kiwi + Banane + Protéines végétales Nutripure", proteines: 38, calories: 293, heure: "08:00" },
      { id: 2, type: "Déjeuner", description: "Fromage blanc 0% fruits rouges granola + Petit pot lentilles et œufs pochés (Pret)", proteines: 45, calories: 1028, heure: "13:00" },
      { id: 3, type: "Dîner", description: "Tranche de gâteau au beurre + Yaourt vanille Les 2 Vaches + Soupe de ramen", proteines: 28, calories: 570, heure: "20:00" },
      { id: 9, type: "Sport 🏃", description: "Autres activités (pas) + marche", proteines: 0, calories: -179, isSport: true, heure: "12:00" },
    ]},
    "2026-03-16": { entrainement: true, commentaire: "✅ Vélo récup bien géré — bon choix avec le dos sensible, zéro impact. ✅ Déjeuner exemplaire : salade composée végétarienne riche en fibres. ❌ Dîner trop calorique (1167 kcal) — le gâteau au citron a fait exploser le compteur. ❌ Protéines basses (101g) pour un jour entraînement — à compenser demain matin dès le petit déj.", repas: [
      { id: 1, type: "Petit-déjeuner", description: "Flocon d'avoine + Kiwi + Banane + Protéines végétales Nutripure", proteines: 28, calories: 338, heure: "08:00" },
      { id: 2, type: "Déjeuner", description: "Pomme + Salade composée lentilles, carottes, patates douces, tomates, haricots", proteines: 18, calories: 438, heure: "13:00" },
      { id: 3, type: "En-cas", description: "Pomme + Yaourt HiPro Fraise", proteines: 20, calories: 168, heure: "16:00" },
      { id: 4, type: "Dîner", description: "Tranche de gâteau au citron + Fajita à composer avec salade, haricots, riz et sauce", proteines: 35, calories: 1167, heure: "20:00" },
      { id: 9, type: "Sport 🏃", description: "Vélo récup 30:22 — 117bpm moy — Z1 25:46 / Z2 03:58 / Z3 00:33", proteines: 0, calories: -311, isSport: true, heure: "12:30" },
    ]},
    "2026-03-15": { entrainement: false, commentaire: "✅ Journée quasi parfaite — 9 kcal restantes, du billard ! ✅ Protéines à 145g, largement au-dessus de la cible. ✅ Journée verte Foodvisor, fibres dépassées. 💪 Montage meubles IKEA en bonus (~250 kcal).", repas: [
      { id: 1, type: "Petit-déjeuner", description: "Skyr nature + Protéines végétales Nutripure + Banane", proteines: 35, calories: 309, heure: "08:00" },
      { id: 2, type: "Déjeuner", description: "Yaourt vanille Les 2 Vaches + Œufs durs avec légumes rôtis", proteines: 33, calories: 425, heure: "13:00" },
      { id: 3, type: "Dîner", description: "Carré chocolat noir 75% + Figue confite + Protéine végétale Nutripure + 2 carrés Chapon", proteines: 77, calories: 657, heure: "21:00" },
    ]},
    "2026-03-14": { entrainement: true, commentaire: "✅ Sortie longue réussie — 14km à 5:13/km, mieux que l'objectif 5:20/km. ✅ 126g protéines malgré dîner festif. ✅ Déficit net excellent grâce aux 953 kcal sport.", repas: [
      { id: 1, type: "Petit-déjeuner", description: "Kiwi + banane + skyr nature + protéines végétales Nutripure", proteines: 42, calories: 324, heure: "07:30" },
      { id: 2, type: "Déjeuner", description: "8 boulettes végétales IKEA + purée + sauce + cornet glace vanille + yaourt fraise", proteines: 22, calories: 496, heure: "12:30" },
      { id: 9, type: "Sport 🏃", description: "Sortie longue 14,01km — 1h13:04 — 5:13/km — 150bpm", proteines: 0, calories: -953, isSport: true, heure: "17:06" },
      { id: 3, type: "Dîner", description: "Huîtres Girardeau N3 + Coquilles Saint-Jacques", proteines: 20, calories: 160, heure: "20:30" },
      { id: 4, type: "Dîner", description: "Légumes au four polenta fêta (patate douce, carotte, aubergine, courgette)", proteines: 12, calories: 320, heure: "21:00" },
      { id: 5, type: "Dîner", description: "Fromage d'Auvergne + baguette tradition", proteines: 14, calories: 400, heure: "21:30" },
      { id: 6, type: "Dîner", description: "Petite mousse au chocolat + demi tranche cake citron", proteines: 8, calories: 365, heure: "22:00" },
      { id: 7, type: "Dîner", description: "Champagne 1 coupe + Blason de l'Evangile Pomerol 2020", proteines: 0, calories: 290, heure: "20:00" },
    ]},
    "2026-03-13": { entrainement: false, commentaire: "✅ Protéines record (139g). ❌ Cacahuètes wasabi en soirée (+900 kcal) — piège classique des oléagineux. Sans elles, journée quasi parfaite.", repas: [
      { id: 1, type: "Petit-déjeuner", description: "Banane + skyr nature + protéines végétales Nutripure", proteines: 28, calories: 309, heure: "07:30" },
      { id: 2, type: "Déjeuner", description: "Chia pudding granola baies de goji", proteines: 8, calories: 212, heure: "13:00" },
      { id: 3, type: "Déjeuner", description: "Curry de lentilles avec riz basmati", proteines: 18, calories: 390, heure: "13:00" },
      { id: 4, type: "Dîner", description: "Skyr avec granola, noix de pecan et baies de goji", proteines: 20, calories: 260, heure: "20:00" },
      { id: 5, type: "Dîner", description: "Mezzaluna ricotta-cèpes aux champignons", proteines: 22, calories: 490, heure: "20:00" },
      { id: 6, type: "Collation", description: "Cacahuètes wasabi", proteines: 43, calories: 900, heure: "17:00" },
    ]},
    "2026-03-12": { entrainement: true, commentaire: "✅ Meilleure journée du séminaire — record protéines (148g), tempo 4:47/km réussi. ✅ Première whey Nutripure intégrée.", repas: [
      { id: 1, type: "Petit-déjeuner", description: "Petit déjeuner équilibré hôtel — œufs brouillés, pain, fromage, yaourt, fruits", proteines: 32, calories: 520, heure: "08:00" },
      { id: 9, type: "Sport 🏃", description: "Tempo Thames Path 3+2km — 8,78km — 45:49 — 150bpm", proteines: 0, calories: -748, isSport: true, heure: "06:44" },
      { id: 2, type: "Déjeuner", description: "Butternut Mezze Super Plate + Egg Mayo sandwich + Egg & Spinach Protein Pot + Bircher Muesli Bowl (Pret)", proteines: 60, calories: 1030, heure: "12:45" },
      { id: 6, type: "Dîner", description: "Omelette 5 blancs + 2 jaunes (sans matière grasse)", proteines: 29, calories: 195, heure: "19:00" },
      { id: 7, type: "Dîner", description: "Skyr nature 100g + Nutripure whey 40g", proteines: 34, calories: 210, heure: "19:00" },
    ]},
    "2026-03-11": { entrainement: false, commentaire: "❌ Jour repos séminaire difficile — +900 kcal vs cible, 4 verres de vin. ✅ Protéines correctes (81g). Assumé dans le contexte.", repas: [
      { id: 1, type: "Petit-déjeuner", description: "Yaourt grec, granola, noix, raisins secs, orange", proteines: 33, calories: 610, heure: "08:00" },
      { id: 2, type: "Déjeuner", description: "Assiette végétarienne galettes légumes + tartelette citron (buffet séminaire)", proteines: 16, calories: 430, heure: "13:00" },
      { id: 3, type: "Dîner", description: "Burrata végétale artichauts poivrons poire + Pavé courge ricotta pignon harissa kohlrabi sauge", proteines: 24, calories: 700, heure: "20:00" },
      { id: 4, type: "Dîner", description: "4 verres de vin 🍷 (14 Stories)", proteines: 0, calories: 480, heure: "21:00" },
    ]},
    "2026-03-10": { entrainement: true, commentaire: "✅ Sortie easy Thames Path réussie (5:11/km). ❌ Protéines insuffisantes (58g) — dîner festif Lilibeth's.", repas: [
      { id: 1, type: "Petit-déjeuner", description: "Skyr banane kiwi", proteines: 8, calories: 130, heure: "08:00" },
      { id: 8, type: "Sport 🏃", description: "Course Thames Path 5,28km — 27:24 — 5:11/km", proteines: 0, calories: -349, isSport: true, heure: "15:52" },
      { id: 2, type: "Déjeuner", description: "Salade lentilles + œufs pochés", proteines: 22, calories: 460, heure: "13:28" },
      { id: 3, type: "Dîner", description: "Black Truffle Risotto + Sprouting Broccoli + Chocolate Mousse + 2 verres vin 🍷 (Lilibeth's)", proteines: 28, calories: 1260, heure: "20:00" },
    ]},
    "2026-03-09": mkJ(52, 820, true, 320),
    "2026-03-08": mkJ(34, 480),
    "2026-03-07": mkJ(45, 650),
    "2026-03-06": mkJ(28, 400),
    "2026-03-05": mkJ(58, 890, true, 350),
    "2026-03-04": mkJ(33, 520),
    "2026-03-03": mkJ(41, 600),
    "2026-02-28": mkJ(92, 1920),
    "2026-02-27": mkJ(105, 2050, true, 420),
    "2026-02-25": mkJ(95, 1950, true, 380),
    "2026-02-23": mkJ(110, 2180, true, 450),
    "2026-02-20": mkJ(98, 1990, true, 400),
    "2026-02-18": mkJ(120, 2350, true, 520),
    "2026-02-16": mkJ(93, 1910, true, 390),
    "2026-02-14": mkJ(115, 2200),
    "2026-02-11": mkJ(100, 2020, true, 410),
    "2026-02-09": mkJ(90, 1880, true, 360),
    "2026-02-07": mkJ(160, 2400, true, 480),
    "2026-02-05": mkJ(95, 1940, true, 430),
    "2026-02-03": mkJ(88, 1820, true, 370),
    "2026-01-31": mkJ(72, 1480, true, 350),
    "2026-01-29": mkJ(80, 1560, true, 420),
    "2026-01-26": mkJ(90, 1720, true, 400),
    "2026-01-24": mkJ(75, 1500, true, 380),
    "2026-01-21": mkJ(85, 1640, true, 440),
    "2026-01-19": mkJ(65, 1350, true, 360),
    "2026-01-16": mkJ(88, 1700, true, 450),
    "2026-01-13": mkJ(75, 1520, true, 390),
    "2026-01-10": mkJ(82, 1620, true, 410),
    "2026-01-07": mkJ(78, 1550, true, 370),
  };

  const DEFAULT_CORPS = [
    // ── Mars 2026 ──────────────────────────────────────────────────────────
    { id: 1000, date: "2026-03-19", poids: 71.9, mg: 19.0 },
    { id: 1001, date: "2026-03-18", poids: 71.9, mg: 18.0 },
    { id: 1002, date: "2026-03-17", poids: 72.1, mg: 18.0 },
    { id: 1003, date: "2026-03-16", poids: 71.1, mg: 19.0 },
    { id: 1004, date: "2026-03-15", poids: 72.1, mg: 18.0 },
    { id: 1005, date: "2026-03-14", poids: 71.9, mg: 19.0 },
    { id: 1006, date: "2026-03-13", poids: 72.1, mg: 19.0 },
    { id: 1007, date: "2026-03-10", poids: 71.9, mg: 19.0 },
    { id: 1008, date: "2026-03-09", poids: 72.6, mg: null },
    // ── Février 2026 ───────────────────────────────────────────────────────
    { id: 1100, date: "2026-02-26", poids: 70.3, mg: 18.0 },
    { id: 1101, date: "2026-02-25", poids: 69.7, mg: 17.0 },
    { id: 1102, date: "2026-02-24", poids: 70.7, mg: 18.0 },
    { id: 1103, date: "2026-02-23", poids: 71.0, mg: 18.0 },
    { id: 1104, date: "2026-02-22", poids: 70.1, mg: 18.0 },
    { id: 1105, date: "2026-02-21", poids: 70.5, mg: 19.0 },
    { id: 1106, date: "2026-02-20", poids: 70.7, mg: 18.0 },
    { id: 1107, date: "2026-02-19", poids: 70.2, mg: 18.0 },
    { id: 1108, date: "2026-02-18", poids: 70.1, mg: 19.0 },
    { id: 1109, date: "2026-02-17", poids: 69.7, mg: 18.0 },
    { id: 1110, date: "2026-02-16", poids: 70.4, mg: 18.0 },
    { id: 1111, date: "2026-02-15", poids: 71.1, mg: 19.0 },
    { id: 1112, date: "2026-02-13", poids: 70.0, mg: 19.0 },
    { id: 1113, date: "2026-02-12", poids: 70.3, mg: 18.0 },
    { id: 1114, date: "2026-02-11", poids: 70.8, mg: 19.0 },
    { id: 1115, date: "2026-02-10", poids: 70.3, mg: 18.0 },
    { id: 1116, date: "2026-02-09", poids: 70.5, mg: 18.0 },
    { id: 1117, date: "2026-02-08", poids: 70.3, mg: 18.0 },
    { id: 1118, date: "2026-02-07", poids: 70.3, mg: 18.0 },
    { id: 1119, date: "2026-02-06", poids: 70.4, mg: 18.0 },
    { id: 1120, date: "2026-02-04", poids: 70.7, mg: 18.0 },
    { id: 1121, date: "2026-02-03", poids: 70.3, mg: 18.0 },
    { id: 1122, date: "2026-02-02", poids: 70.7, mg: 19.0 },
    { id: 1123, date: "2026-02-01", poids: 70.3, mg: 19.0 },
    // ── Janvier 2026 ───────────────────────────────────────────────────────
    { id: 1200, date: "2026-01-31", poids: 71.0, mg: 19.0 },
    { id: 1201, date: "2026-01-30", poids: 71.7, mg: 19.0 },
    { id: 1202, date: "2026-01-29", poids: 72.3, mg: 19.0 },
    { id: 1203, date: "2026-01-28", poids: 70.8, mg: 18.0 },
    { id: 1204, date: "2026-01-27", poids: 70.9, mg: 19.0 },
    { id: 1205, date: "2026-01-26", poids: 70.4, mg: 18.0 },
    { id: 1206, date: "2026-01-25", poids: 71.3, mg: 18.0 },
    { id: 1207, date: "2026-01-24", poids: 71.2, mg: 18.0 },
    { id: 1208, date: "2026-01-23", poids: 70.7, mg: 19.0 },
    { id: 1209, date: "2026-01-22", poids: 70.6, mg: 19.0 },
    { id: 1210, date: "2026-01-21", poids: 70.2, mg: 18.0 },
    { id: 1211, date: "2026-01-20", poids: 71.3, mg: 19.0 },
    { id: 1212, date: "2026-01-19", poids: 70.9, mg: 19.0 },
    { id: 1213, date: "2026-01-17", poids: 71.5, mg: 19.0 },
    { id: 1214, date: "2026-01-16", poids: 71.6, mg: 18.0 },
    { id: 1215, date: "2026-01-15", poids: 71.2, mg: 19.0 },
    { id: 1216, date: "2026-01-14", poids: 71.8, mg: 18.0 },
    { id: 1217, date: "2026-01-13", poids: 71.5, mg: 19.0 },
    { id: 1218, date: "2026-01-12", poids: 72.0, mg: 19.0 },
    { id: 1219, date: "2026-01-11", poids: 71.9, mg: 19.0 },
    { id: 1220, date: "2026-01-10", poids: 71.9, mg: 20.0 },
    { id: 1221, date: "2026-01-09", poids: 72.4, mg: 20.0 },
    { id: 1222, date: "2026-01-08", poids: 72.4, mg: 20.0 },
    { id: 1223, date: "2026-01-07", poids: 72.3, mg: 19.0 },
    { id: 1224, date: "2026-01-06", poids: 72.6, mg: 20.0 },
    { id: 1225, date: "2026-01-05", poids: 72.5, mg: 19.0 },
    { id: 1226, date: "2026-01-04", poids: 73.2, mg: 20.0 },
    { id: 1227, date: "2026-01-03", poids: 73.0, mg: 19.0 },
    // ── Décembre 2025 ──────────────────────────────────────────────────────
    { id: 1300, date: "2025-12-29", poids: 72.8, mg: 19.0 },
    { id: 1301, date: "2025-12-28", poids: 72.5, mg: 20.0 },
    { id: 1302, date: "2025-12-27", poids: 73.3, mg: 20.0 },
    { id: 1303, date: "2025-12-23", poids: 74.4, mg: 20.0 },
    { id: 1304, date: "2025-12-22", poids: 74.7, mg: 20.0 },
    { id: 1305, date: "2025-12-21", poids: 74.0, mg: 21.0 },
    { id: 1306, date: "2025-12-20", poids: 74.0, mg: 21.0 },
    { id: 1307, date: "2025-12-19", poids: 74.4, mg: 21.0 },
    { id: 1308, date: "2025-12-18", poids: 74.2, mg: 21.0 },
    { id: 1309, date: "2025-12-17", poids: 74.1, mg: 21.0 },
    { id: 1310, date: "2025-12-15", poids: 74.3, mg: 20.0 },
    { id: 1311, date: "2025-12-14", poids: 74.8, mg: 21.0 },
    { id: 1312, date: "2025-12-13", poids: 74.5, mg: 21.0 },
    { id: 1313, date: "2025-12-12", poids: 74.7, mg: 22.0 },
    { id: 1314, date: "2025-12-11", poids: 74.7, mg: 21.0 },
    { id: 1315, date: "2025-12-10", poids: 74.8, mg: 21.0 },
    { id: 1316, date: "2025-12-09", poids: 75.1, mg: 21.0 },
    { id: 1317, date: "2025-12-08", poids: 76.6, mg: 21.0 },
    { id: 1318, date: "2025-12-07", poids: 75.2, mg: 22.0 },
    { id: 1319, date: "2025-12-05", poids: 76.1, mg: 21.0 },
    { id: 1320, date: "2025-12-04", poids: 75.5, mg: 22.0 },
    { id: 1321, date: "2025-12-02", poids: 75.4, mg: 22.0 },
    { id: 1322, date: "2025-12-01", poids: 76.4, mg: 21.0 },
    // ── Novembre 2025 ──────────────────────────────────────────────────────
    { id: 1400, date: "2025-11-30", poids: 76.3, mg: 21.0 },
    { id: 1401, date: "2025-11-28", poids: 75.7, mg: 21.0 },
    { id: 1402, date: "2025-11-27", poids: 75.6, mg: 22.0 },
    { id: 1403, date: "2025-11-26", poids: 75.3, mg: 21.0 },
    { id: 1404, date: "2025-11-25", poids: 75.2, mg: 21.0 },
    { id: 1405, date: "2025-11-24", poids: 75.1, mg: 22.0 },
    { id: 1406, date: "2025-11-23", poids: 75.5, mg: 21.0 },
    { id: 1407, date: "2025-11-21", poids: 75.8, mg: 22.0 },
    { id: 1408, date: "2025-11-20", poids: 75.5, mg: 21.0 },
    { id: 1409, date: "2025-11-18", poids: 75.3, mg: 21.0 },
    { id: 1410, date: "2025-11-17", poids: 75.4, mg: 21.0 },
  ];

  const [logs, setLogs] = useStorage("sv_logs_v12", DEFAULT_LOGS);
  const [corps, setCorps] = useStorage("sv_corps_v12", DEFAULT_CORPS);
  const [vue, setVue] = useState("journal");
  const [jourOffset, setJourOffset] = useState(0);
  const [repasType, setRepasType] = useState("Petit-déjeuner");
  const [description, setDescription] = useState("");
  const [proteines, setProteines] = useState("");
  const [calories, setCalories] = useState("");
  const [estEntrainement, setEstEntrainement] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [corpsForm, setCorpsForm] = useState({ poids: "", mg: "" });
  const [showCorpsForm, setShowCorpsForm] = useState(false);
  const [expandedSeance, setExpandedSeance] = useState(null);
  const [planMode, setPlanMode] = useState("semi");
  const [chartPeriode, setChartPeriode] = useState(30);
  const [maWindow, setMaWindow] = useState(1);

  const dateAffichee = new Date();
  dateAffichee.setDate(dateAffichee.getDate() - jourOffset);
  const cleJour = dateAffichee.toISOString().split("T")[0];
  const labelJour = jourOffset === 0 ? "Aujourd'hui" : jourOffset === 1 ? "Hier"
    : dateAffichee.toLocaleDateString("fr", { weekday: "long", day: "numeric", month: "long" });

  const jourData = logs[cleJour] || { repas: [], entrainement: false };
  const totalProts = jourData.repas.reduce((s, r) => s + (r.proteines || 0), 0);
  const repasLoggues = new Set(jourData.repas.map(r => r.type));
  const repasRestants = REPAS_TYPES.filter(t => !repasLoggues.has(t)).length;
  const conseil = conseilProteines(totalProts, PROFIL.proteinesCible, repasRestants);

  const addRepas = () => {
    if (!description.trim()) return;
    const entry = {
      id: Date.now(), type: repasType, description: description.trim(),
      proteines: parseFloat(proteines) || 0, calories: parseFloat(calories) || 0,
      isSport: repasType === "Sport 🏃",
      heure: new Date().toLocaleTimeString("fr", { hour: "2-digit", minute: "2-digit" }),
    };
    setLogs({ ...logs, [cleJour]: { ...jourData, repas: [...jourData.repas, entry], entrainement: estEntrainement } });
    setDescription(""); setProteines(""); setCalories(""); setShowForm(false);
  };

  const removeRepas = (id) => {
    setLogs({ ...logs, [cleJour]: { ...jourData, repas: jourData.repas.filter(r => r.id !== id) } });
  };

  const addCorps = () => {
    if (!corpsForm.poids) return;
    const entry = { date: cleAujourdhui(), poids: parseFloat(corpsForm.poids), mg: parseFloat(corpsForm.mg) || null, id: Date.now() };
    setCorps([...corps.filter(c => c.date !== entry.date), entry].sort((a,b) => a.date > b.date ? -1 : 1));
    setCorpsForm({ poids: "", mg: "" }); setShowCorpsForm(false);
  };

  const histo = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - i);
    const k = d.toISOString().split("T")[0];
    const j = logs[k] || { repas: [] };
    const p = j.repas.reduce((s, r) => s + (r.proteines || 0), 0);
    return { k, label: d.toLocaleDateString("fr", { weekday: "short", day: "numeric" }), proteines: p, cals: j.repas.reduce((s,r) => s+(r.calories||0), 0), entrainement: j.entrainement };
  });

  const dernierCorps = corps[0];

  const Ring = ({ pct, color, size=90, stroke=9, children }) => {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const mainDash = Math.min(pct, 100) / 100 * circ;
    const overDash = pct > 100 ? ((pct - 100) / 100 * circ) : 0;
    return (
      <div style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
        <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f0ece6" strokeWidth={stroke}/>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={`${mainDash} ${circ}`} strokeLinecap="round" style={{ transition:"stroke-dasharray .6s ease" }}/>
          {pct > 100 && <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke+3} strokeDasharray={`${overDash} ${circ}`} strokeLinecap="round" opacity={0.4} style={{ transition:"stroke-dasharray .6s ease" }}/>}
        </svg>
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>{children}</div>
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "'Figtree', sans-serif", background: "#f5f2ee", minHeight: "100vh", color: "#2a2520" }}>
      <style>{CSS}</style>

      {/* HEADER */}
      <div style={{ background: "#2a2520", padding: "28px 20px 20px", color: "#f5f2ee" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, marginBottom: 4 }}>
            Mon Suivi <span style={{ fontStyle: "italic", color: "#c17b3e" }}>Nutrition</span>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            {PROFIL.races.map(r => (
              <div key={r.label} style={{ flex: 1, background: "rgba(255,255,255,.07)", borderRadius: 12, padding: "10px 12px" }}>
                <div style={{ fontSize: 10, color: "#9a8a78", fontWeight: 700, textTransform: "uppercase", letterSpacing: .7 }}>{r.emoji} {r.label}</div>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, color: "#c17b3e", lineHeight: 1.2, marginTop: 2 }}>
                  {joursAvant(r.date)}<span style={{ fontSize: 12, color: "#7a6858", fontFamily: "'Figtree'" }}> j</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NAV */}
      <div style={{ background: "#fff", borderBottom: "1px solid #f0ece6", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 480, margin: "0 auto", display: "flex" }}>
          {[{ id: "journal", l: "Journal" }, { id: "historique", l: "Historique" }, { id: "corps", l: "Corps" }, { id: "plan", l: "Plan 🏁" }].map(t => (
            <button key={t.id} onClick={() => setVue(t.id)} style={{
              flex: 1, border: "none", background: "none", padding: "14px 8px", fontSize: 13, fontWeight: 700,
              color: vue === t.id ? "#2a2520" : "#b5afa8",
              borderBottom: vue === t.id ? "2px solid #c17b3e" : "2px solid transparent",
              transition: "all .2s", fontFamily: "inherit",
            }}>{t.l}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "20px 16px 100px" }}>

        {/* ── JOURNAL ── */}
        {vue === "journal" && <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button className="btn-sec" onClick={() => setJourOffset(o => o + 1)}>←</button>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 19 }}>{labelJour}</div>
            <button className="btn-sec" onClick={() => setJourOffset(o => Math.max(0, o - 1))} style={{ opacity: jourOffset === 0 ? .3 : 1 }}>→</button>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            {[{ v: true, l: "🏃 Entraînement" }, { v: false, l: "😴 Repos" }].map(opt => (
              <button key={String(opt.v)}
                className={`pill-type${(jourData.repas.length > 0 ? jourData.entrainement : estEntrainement) === opt.v ? " on" : ""}`}
                onClick={() => {
                  setEstEntrainement(opt.v);
                  if (jourData.repas.length > 0) setLogs({ ...logs, [cleJour]: { ...jourData, entrainement: opt.v } });
                }} style={{ flex: 1, padding: "9px 8px" }}>{opt.l}</button>
            ))}
          </div>

          {/* Bilan qualitatif */}
          {jourData.commentaire && (
            <div className="card" style={{ padding: "14px 16px" }}>
              <div style={{ fontSize: 11, color: "#9a928a", fontWeight: 700, textTransform: "uppercase", letterSpacing: .6, marginBottom: 10 }}>✨ Bilan qualitatif</div>
              <div style={{ fontSize: 13, color: "#2a2520", lineHeight: 1.7 }}>{jourData.commentaire}</div>
            </div>
          )}

          {/* Bilan visuel */}
          {(() => {
            const cibleCals = (jourData.repas.length > 0 ? jourData.entrainement : estEntrainement) ? 2000 : 1400;
            const calsNourriture = jourData.repas.filter(r => !r.isSport).reduce((s,r) => s+(r.calories||0), 0);
            const calsSport = Math.abs(jourData.repas.filter(r => r.isSport).reduce((s,r) => s+(r.calories||0), 0));
            const deficit = cibleCals - calsNourriture;
            const pctCals = Math.round((calsNourriture / cibleCals) * 100);
            const pctProt = Math.round((totalProts / PROFIL.proteinesCible) * 100);
            const calColor = pctCals > 110 ? "#ef4444" : pctCals > 100 ? "#f97316" : calsNourriture < cibleCals * 0.75 ? "#ef4444" : "#84cc16";
            const protColor = pctProt > 130 ? "#f97316" : pctProt >= 100 ? "#84cc16" : pctProt >= 60 ? "#c17b3e" : "#ef4444";
            return (
              <div className="card" style={{ padding: "18px 16px" }}>
                <div style={{ fontSize: 11, color: "#9a928a", fontWeight: 700, textTransform: "uppercase", letterSpacing: .6, marginBottom: 14 }}>
                  Bilan du jour — {(jourData.repas.length > 0 ? jourData.entrainement : estEntrainement) ? "🏃 Entraînement" : "😴 Repos"}
                </div>
                <div style={{ display: "flex", gap: 16, marginBottom: 16, alignItems: "center" }}>
                  <Ring pct={pctCals} color={calColor}>
                    <div style={{ fontSize: pctCals > 99 ? 13 : 15, fontFamily: "'Instrument Serif', serif", fontWeight: 700, lineHeight: 1, color: calColor }}>{pctCals}%</div>
                    <div style={{ fontSize: 9, color: "#9a928a", marginTop: 2 }}>kcal</div>
                  </Ring>
                  <Ring pct={pctProt} color={protColor}>
                    <div style={{ fontSize: pctProt > 99 ? 13 : 15, fontFamily: "'Instrument Serif', serif", fontWeight: 700, lineHeight: 1, color: protColor }}>{pctProt}%</div>
                    <div style={{ fontSize: 9, color: "#9a928a", marginTop: 2 }}>prot.</div>
                  </Ring>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ background: "#f5f2ee", borderRadius: 10, padding: "8px 11px" }}>
                      <div style={{ fontSize: 10, color: "#9a928a", fontWeight: 700, textTransform: "uppercase", letterSpacing: .5 }}>Nourriture</div>
                      <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18 }}>{calsNourriture} <span style={{ fontSize: 11, color: "#9a928a" }}>kcal</span></div>
                    </div>
                    {calsSport > 0 && (
                      <div style={{ background: "#f0fdf4", borderRadius: 10, padding: "8px 11px", border: "1px solid #bbf7d0" }}>
                        <div style={{ fontSize: 10, color: "#16a34a", fontWeight: 700, textTransform: "uppercase", letterSpacing: .5 }}>Sport −</div>
                        <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18, color: "#16a34a" }}>{calsSport} <span style={{ fontSize: 11 }}>kcal</span></div>
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ position: "relative", height: 28, background: "#f0ece6", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${Math.min(100, (calsNourriture / (cibleCals * 1.2)) * 100)}%`, background: "#c17b3e", borderRadius: 99, transition: "width .6s ease" }}/>
                    <div style={{ position: "absolute", top: 0, bottom: 0, left: `${(cibleCals / (cibleCals * 1.2)) * 100}%`, width: 2, background: "#2a2520", opacity: .5 }}/>
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff", mixBlendMode: "overlay" }}>{calsNourriture} kcal brutes</div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#9a928a", marginTop: 4 }}>
                    <span>0</span><span style={{ fontWeight: 700, color: "#2a2520" }}>▲ Cible {cibleCals}</span><span>{Math.round(cibleCals * 1.2)}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  {[
                    { l: "Protéines", v: `${totalProts}g`, t: `/${PROFIL.proteinesCible}g`, c: protColor },
                    { l: "Kcal brutes", v: calsNourriture, t: `/${cibleCals}`, c: calColor },
                    { l: "Sport −", v: calsSport > 0 ? `−${calsSport}` : "—", t: "kcal", c: "#16a34a" },
                  ].map(k => (
                    <div key={k.l} style={{ flex: 1, background: "#f5f2ee", borderRadius: 10, padding: "8px 10px", textAlign: "center" }}>
                      <div style={{ fontSize: 9, color: "#9a928a", fontWeight: 700, textTransform: "uppercase", letterSpacing: .5, marginBottom: 3 }}>{k.l}</div>
                      <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 17, color: k.c, lineHeight: 1 }}>{k.v}</div>
                      <div style={{ fontSize: 9, color: "#b5afa8" }}>{k.t}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#f5f2ee", borderRadius: 10, padding: "9px 12px", fontSize: 12, lineHeight: 1.6, borderLeft: `3px solid ${conseil.color}` }}>{conseil.msg}</div>
              </div>
            );
          })()}

          {/* Sources protéines */}
          <details style={{ background:"#fff", borderRadius:16, padding:"14px 16px", boxShadow:"0 1px 3px rgba(0,0,0,.06)" }}>
            <summary style={{ fontSize:13, fontWeight:700, color:"#7a7068", cursor:"pointer", listStyle:"none", display:"flex", justifyContent:"space-between" }}>
              🌱 Sources protéines végétariennes <span style={{ color:"#c17b3e" }}>▾</span>
            </summary>
            <div style={{ marginTop:12 }}>
              {[["3 œufs entiers","18g"],["200g skyr / fromage blanc 0%","20g"],["100g tempeh","19g"],["150g tofu ferme","18g"],["150g lentilles cuites","13g"],["150g pois chiches","12g"],["30g parmesan / gruyère","8g"],["6 huîtres (à la maison)","10g"],["1 scoop whey Nutripure","25g"],["200g yaourt grec","10g"]].map(([a,p]) => (
                <div key={a} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:"1px solid #f5f2ee", fontSize:13 }}>
                  <span>{a}</span><span style={{ fontWeight:700, color:"#c17b3e" }}>{p}</span>
                </div>
              ))}
              <div style={{ fontSize:11, color:"#b5afa8", marginTop:8 }}>💡 Cible : 120g prot/j · 1400 kcal (repos) / 2000 kcal (entraînement)</div>
            </div>
          </details>

          {/* Repas */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 17 }}>Repas</div>
              <button className="btn-sec" onClick={() => setShowForm(f => !f)} style={{ fontSize: 12, padding: "6px 12px" }}>
                {showForm ? "✕ Fermer" : "+ Ajouter"}
              </button>
            </div>
            {showForm && (
              <div className="fade-in" style={{ marginBottom: 16, padding: 14, background: "#f5f2ee", borderRadius: 14 }}>
                <div style={{ marginBottom: 10 }}>
                  <label>Type de repas</label>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {REPAS_TYPES.map(t => (
                      <button key={t} className={`pill-type${repasType === t ? " on" : ""}`} onClick={() => setRepasType(t)} style={{ fontSize: 12, padding: "5px 10px" }}>{t}</button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <label>Description</label>
                  <textarea className="inp" placeholder="ex. Salade lentilles + 2 œufs pochés + skyr" value={description} onChange={e => setDescription(e.target.value)} rows={2} style={{ resize: "none" }} />
                </div>
                <div className="g2" style={{ marginBottom: 12 }}>
                  <div><label>Protéines (g)</label><input className="inp" type="number" placeholder="ex. 32" value={proteines} onChange={e => setProteines(e.target.value)} /></div>
                  <div><label>Calories (kcal)</label><input className="inp" type="number" placeholder="ex. 420" value={calories} onChange={e => setCalories(e.target.value)} /></div>
                </div>
                <button className="btn-main" onClick={addRepas}>Enregistrer ce repas</button>
              </div>
            )}
            {jourData.repas.length === 0 && !showForm && (
              <div style={{ textAlign: "center", color: "#b5afa8", fontSize: 13, padding: "16px 0" }}>Aucun repas enregistré</div>
            )}
            {REPAS_TYPES.map(type => {
              const items = jourData.repas.filter(r => r.type === type);
              if (!items.length) return null;
              return (
                <div key={type} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#9a928a", textTransform: "uppercase", letterSpacing: .6, marginBottom: 6 }}>{type}</div>
                  {items.map(r => (
                    <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "9px 0", borderBottom: "1px solid #f0ece6" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.4 }}>{r.description}</div>
                        <div style={{ fontSize: 11, color: "#b5afa8", marginTop: 2, display: "flex", gap: 8 }}>
                          <span>{r.heure}</span>
                          {r.proteines > 0 && <span style={{ color:"#c17b3e", fontWeight:600 }}>{r.proteines}g prot</span>}
                          {r.calories !== 0 && <span style={{ color:"#3b82f6", fontWeight:600 }}>{r.calories} kcal</span>}
                        </div>
                      </div>
                      {jourOffset === 0 && <button className="rmv" onClick={() => removeRepas(r.id)}>×</button>}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>}

        {/* ── HISTORIQUE ── */}
        {vue === "historique" && <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 21 }}>30 derniers jours</div>
          <div className="card">
            {/* ── Graph protéines ── */}
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a928a", textTransform: "uppercase", letterSpacing: .6, marginBottom: 12 }}>Protéines / jour (g)</div>
            {(() => {
              const maxProt = Math.max(...histo.map(d => d.proteines), PROFIL.proteinesCible);
              const yTicks = [0, Math.round(maxProt * 0.5), PROFIL.proteinesCible, maxProt].filter((v,i,a) => a.indexOf(v) === i).sort((a,b) => a-b);
              const chartH = 140;
              const histoRev = [...histo].reverse();
              return (
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ position: "relative", width: 28, flexShrink: 0, height: chartH }}>
                    {yTicks.map(v => (
                      <div key={v} style={{ position: "absolute", right: 0, bottom: `${(v / maxProt) * 100}%`, fontSize: 9, color: "#b5afa8", lineHeight: 1, transform: "translateY(50%)" }}>{v}</div>
                    ))}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ position: "relative", height: chartH }}>
                      {yTicks.map(v => (
                        <div key={v} style={{ position: "absolute", left: 0, right: 0, bottom: `${(v / maxProt) * 100}%`, borderTop: v === PROFIL.proteinesCible ? "1.5px dashed #84cc16" : "1px dashed #f0ece6", opacity: 0.8 }} />
                      ))}
                      <div style={{ position: "absolute", inset: 0, display: "flex", gap: 2, alignItems: "flex-end" }}>
                        {histoRev.map((d, i) => (
                          <div key={d.k} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end", position: "relative" }}>
                            {i % 7 === 0 && <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", width: 1, height: "100%", background: "#e8e3dc", opacity: 0.5, pointerEvents: "none" }} />}
                            <div style={{ width: "100%", height: `${Math.min(100, (d.proteines / maxProt) * 100)}%`, background: d.proteines >= PROFIL.proteinesCible ? "#84cc16" : d.proteines >= PROFIL.proteinesCible * 0.6 ? "#c17b3e" : d.proteines > 0 ? "#ef4444" : "#f0ece6", borderRadius: "3px 3px 0 0", opacity: d.proteines ? 1 : .3, minWidth: 0, position: "relative", zIndex: 1 }} />
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Date labels */}
                    <div style={{ display: "flex", marginTop: 5, position: "relative" }}>
                      {histoRev.map((d, i) => (
                        <div key={d.k} style={{ flex: 1, textAlign: "center" }}>
                          {i % 7 === 0 && (
                            <div style={{ fontSize: 8.5, color: "#b5afa8", whiteSpace: "nowrap", overflow: "visible", lineHeight: 1 }}>
                              {new Date(d.k + "T12:00:00").toLocaleDateString("fr", { day: "numeric", month: "short" })}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
            <div style={{ display: "flex", gap: 12, marginTop: 8, fontSize: 11 }}>
              {[{ c: "#84cc16", l: "≥ 120g ✓" }, { c: "#c17b3e", l: "> 60%" }, { c: "#ef4444", l: "< 60%" }].map(l => (
                <div key={l.l} style={{ display: "flex", alignItems: "center", gap: 4, color: "#9a928a" }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: l.c }} />{l.l}
                </div>
              ))}
            </div>

            {/* ── Graph kcal ── */}
            <div style={{ height: 1, background: "#f0ece6", margin: "18px 0" }} />
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a928a", textTransform: "uppercase", letterSpacing: .6, marginBottom: 12 }}>Kcal consommées / jour</div>
            {(() => {
              const maxKcal = Math.max(...histo.map(d => d.cals), PROFIL.calEntrainement + 200);
              const yTicks = [0, 1000, PROFIL.calRepos, PROFIL.calEntrainement, Math.ceil(maxKcal/500)*500].filter((v,i,a) => v <= maxKcal && a.indexOf(v) === i).sort((a,b) => a-b);
              const chartH = 140;
              const histoRev = [...histo].reverse();
              return (
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ position: "relative", width: 32, flexShrink: 0, height: chartH }}>
                    {yTicks.map(v => (
                      <div key={v} style={{ position: "absolute", right: 0, bottom: `${(v / maxKcal) * 100}%`, fontSize: 9, color: v === PROFIL.calRepos ? "#9a928a" : v === PROFIL.calEntrainement ? "#c17b3e" : "#b5afa8", lineHeight: 1, transform: "translateY(50%)", textAlign: "right", fontWeight: (v === PROFIL.calRepos || v === PROFIL.calEntrainement) ? 700 : 400 }}>{v >= 1000 ? `${v/1000}k` : v}</div>
                    ))}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ position: "relative", height: chartH }}>
                      {/* Grid lines */}
                      {yTicks.map(v => (
                        <div key={v} style={{ position: "absolute", left: 0, right: 0, bottom: `${(v / maxKcal) * 100}%`,
                          borderTop: v === PROFIL.calEntrainement ? "1.5px dashed #c17b3e"
                                   : v === PROFIL.calRepos ? "1.5px dashed #9a928a"
                                   : "1px dashed #f0ece6",
                          opacity: 0.9 }} />
                      ))}
                      {/* Labels on grid lines */}
                      <div style={{ position: "absolute", right: 2, bottom: `${(PROFIL.calRepos / maxKcal) * 100}%`, fontSize: 8, color: "#9a928a", transform: "translateY(-3px)", fontStyle: "italic" }}>repos</div>
                      <div style={{ position: "absolute", right: 2, bottom: `${(PROFIL.calEntrainement / maxKcal) * 100}%`, fontSize: 8, color: "#c17b3e", transform: "translateY(-3px)", fontStyle: "italic" }}>sport</div>
                      <div style={{ position: "absolute", inset: 0, display: "flex", gap: 2, alignItems: "flex-end" }}>
                        {histoRev.map((d, i) => {
                          const cals = d.cals > 0 ? d.cals : 0;
                          const pct = Math.min(100, (cals / maxKcal) * 100);
                          const target = d.entrainement ? PROFIL.calEntrainement : PROFIL.calRepos;
                          const color = cals === 0 ? "#f0ece6" : cals < target * 0.8 ? "#ef4444" : cals > target * 1.25 ? "#f97316" : "#3b82f6";
                          return (
                            <div key={d.k} style={{ flex: 1, height: "100%", display: "flex", alignItems: "flex-end", position: "relative" }}>
                              {i % 7 === 0 && <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 1, height: "100%", background: "#e8e3dc", opacity: 0.5, pointerEvents: "none" }} />}
                              <div style={{ width: "100%", height: `${pct}%`, background: color, borderRadius: "3px 3px 0 0", minWidth: 0, opacity: cals ? 1 : .2, position: "relative", zIndex: 1 }} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {/* Date labels */}
                    <div style={{ display: "flex", marginTop: 5 }}>
                      {histoRev.map((d, i) => (
                        <div key={d.k} style={{ flex: 1, textAlign: "center" }}>
                          {i % 7 === 0 && (
                            <div style={{ fontSize: 8.5, color: "#b5afa8", whiteSpace: "nowrap", overflow: "visible", lineHeight: 1 }}>
                              {new Date(d.k + "T12:00:00").toLocaleDateString("fr", { day: "numeric", month: "short" })}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
            <div style={{ display: "flex", gap: 12, marginTop: 8, fontSize: 11, flexWrap: "wrap" }}>
              {[
                { c: "#3b82f6", l: "Dans la cible" },
                { c: "#ef4444", l: "< 80% cible" },
                { c: "#f97316", l: "> 125% cible" },
              ].map(l => (
                <div key={l.l} style={{ display: "flex", alignItems: "center", gap: 4, color: "#9a928a" }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: l.c }} />{l.l}
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#9a928a" }}>
                <svg width="14" height="4"><line x1="0" y1="2" x2="14" y2="2" stroke="#9a928a" strokeWidth="1.5" strokeDasharray="3 2"/></svg>{PROFIL.calRepos} repos
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#9a928a" }}>
                <svg width="14" height="4"><line x1="0" y1="2" x2="14" y2="2" stroke="#c17b3e" strokeWidth="1.5" strokeDasharray="3 2"/></svg>{PROFIL.calEntrainement} sport
              </div>
            </div>
          </div>
          {histo.filter(d => logs[d.k]?.repas?.length > 0).map(d => {
            const j = logs[d.k];
            return (
              <div key={d.k} className="card" style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{d.label} {j.entrainement ? "🏃" : "😴"}</div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18, color: d.proteines >= PROFIL.proteinesCible ? "#84cc16" : "#c17b3e" }}>{d.proteines}g</span>
                    <span style={{ fontSize: 11, color: "#b5afa8" }}> prot</span>
                    {d.cals !== 0 && <div style={{ fontSize: 11, color: "#b5afa8" }}>{d.cals} kcal</div>}
                  </div>
                </div>
                {j.commentaire && <div style={{ fontSize: 12, color: "#7a7068", fontStyle: "italic", marginBottom: 8, lineHeight: 1.6, borderLeft: "3px solid #c17b3e", paddingLeft: 10 }}>{j.commentaire}</div>}
                {j.repas.map(r => (
                  <div key={r.id} style={{ fontSize: 13, color: "#7a7068", borderTop: "1px solid #f0ece6", padding: "6px 0", lineHeight: 1.4 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#b5afa8", marginRight: 6 }}>{r.type}</span>
                    {r.description}
                    {r.proteines > 0 && <span style={{ color: "#c17b3e", fontWeight: 600 }}> · {r.proteines}g</span>}
                  </div>
                ))}
              </div>
            );
          })}
        </div>}

        {/* ── PLAN ── */}
        {vue === "plan" && <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* ── SEMI ── */}
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 21 }}>Plan Semi-Marathon</div>
          <div className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 13, color: "#7a7068" }}>Objectif</div>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: "#c17b3e" }}>1h45 — 4:59/km</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                <div style={{ fontSize: 13, color: "#7a7068" }}>Race day</div>
                <div style={{ fontWeight: 700 }}>Dimanche 5 avril 2026</div>
              </div>
              <div style={{ marginTop: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#9a928a", marginBottom: 4 }}>
                  <span>Progression</span><span>{PLAN_SEMI.filter(s => s.fait).length}/{PLAN_SEMI.length} séances</span>
                </div>
                <div className="bar"><div className="bar-f" style={{ width: `${Math.round((PLAN_SEMI.filter(s => s.fait).length / PLAN_SEMI.length) * 100)}%`, background: "#c17b3e" }} /></div>
              </div>
            </div>
            {SEMAINES_SEMI.map(sem => (
              <div key={sem.label} className="card">
                <div style={{ fontSize: 11, fontWeight: 700, color: "#9a928a", textTransform: "uppercase", letterSpacing: .6, marginBottom: 10 }}>{sem.label}</div>
                {sem.dates.map(d => {
                  const s = PLAN_SEMI.find(p => p.date === d);
                  if (!s) return null;
                  const todayStr = new Date().toISOString().split("T")[0];
                  const isToday = d === todayStr;
                  const isPast = d < todayStr;
                  return (
                    <div key={d} style={{ borderBottom: "1px solid #f0ece6", opacity: isPast && !s.fait ? .5 : 1 }}>
                      <div onClick={() => setExpandedSeance(expandedSeance === d ? null : d)}
                        style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", cursor: "pointer" }}>
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.couleur, flexShrink: 0, marginTop: 4, boxShadow: isToday ? `0 0 0 3px ${s.couleur}40` : "none" }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                              <div style={{ fontSize: 14, fontWeight: 700, color: s.type === "race" ? "#c17b3e" : "#2a2520" }}>
                                {s.label} {s.fait ? "✅" : isToday ? "👈" : ""}
                              </div>
                              <div style={{ fontSize: 12, color: "#7a7068", marginTop: 2 }}>{s.detail}</div>
                            </div>
                            <div style={{ fontSize: 11, color: "#9a928a", flexShrink: 0, marginLeft: 8, textAlign: "right" }}>
                              <div>{new Date(d + "T12:00:00").toLocaleDateString("fr", { weekday: "short", day: "numeric", month: "short" })}</div>
                              <div style={{ fontWeight: 700, color: s.couleur, marginTop: 2 }}>{s.allure}</div>
                              <div style={{ fontSize: 10, color: "#c17b3e", marginTop: 3 }}>{expandedSeance === d ? "▲ fermer" : "▼ détail"}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {expandedSeance === d && s.etapes && (
                        <div className="fade-in" style={{ marginLeft: 22, marginBottom: 12, background: "#f5f2ee", borderRadius: 12, padding: "12px 14px" }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: "#9a928a", textTransform: "uppercase", letterSpacing: .6, marginBottom: 10 }}>Déroulé de la séance</div>
                          {s.etapes.map((e, i) => (
                            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                              <div style={{ width: 22, height: 22, borderRadius: "50%", background: s.couleur, color: "#fff", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i+1}</div>
                              <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                  <div style={{ fontSize: 13, fontWeight: 700 }}>{e.label}</div>
                                  <div style={{ fontSize: 12, fontWeight: 700, color: s.couleur }}>{e.allure}</div>
                                </div>
                                <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
                                  <span style={{ fontSize: 11, color: "#9a928a", background: "#fff", borderRadius: 6, padding: "1px 7px" }}>⏱ {e.duree}</span>
                                  {e.note && <span style={{ fontSize: 11, color: "#7a7068", fontStyle: "italic" }}>{e.note}</span>}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
            <div style={{ background: "#2a2520", borderRadius: 16, padding: "16px", color: "#f5f2ee" }}>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 16, marginBottom: 10 }}>🏁 Stratégie de course</div>
              {[
                { km: "Km 1-3", allure: "5:05/km", note: "Départ contrôlé — résister à l'euphorie" },
                { km: "Km 4-16", allure: "4:59/km", note: "Allure cible — rythme de croisière" },
                { km: "Km 17-21", allure: "Tout ce qu'il reste", note: "Push final — vider le réservoir 🔥" },
              ].map(r => (
                <div key={r.km} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{r.km}</div>
                    <div style={{ fontSize: 11, color: "#9a8a78" }}>{r.note}</div>
                  </div>
                  <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18, color: "#c17b3e" }}>{r.allure}</div>
                </div>
              ))}
              <div style={{ marginTop: 12, fontSize: 12, color: "#7a6858" }}>💊 Charge glucides 3-4 avril · 1 scoop whey post chaque séance</div>
            </div>

          {/* ── TRIATHLON ── */}
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 21, marginTop: 8 }}>Plan Triathlon Deauville 🏅</div>

          {/* Header objectif */}
          <div className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 13, color: "#7a7068" }}>Objectif</div>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: "#c17b3e" }}>2h55-3h00 🎯</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                <div style={{ fontSize: 13, color: "#7a7068" }}>Race day</div>
                <div style={{ fontWeight: 700 }}>Samedi 21 juin 2026</div>
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                {[{ e: "🏊", l: "1,5km", t: "~38-40 min" }, { e: "🚴", l: "40km D+", t: "~1h28-30" }, { e: "🏃", l: "10km", t: "~50-52 min" }].map(d => (
                  <div key={d.l} style={{ flex: 1, minWidth: 80, background: "#f5f2ee", borderRadius: 10, padding: "8px", textAlign: "center" }}>
                    <div style={{ fontSize: 16 }}>{d.e}</div>
                    <div style={{ fontSize: 11, fontWeight: 700 }}>{d.l}</div>
                    <div style={{ fontSize: 10, color: "#c17b3e", fontWeight: 700 }}>{d.t}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#9a928a", marginBottom: 4 }}>
                  <span>Progression</span><span>{PLAN_TRI.filter(s => s.fait).length}/{PLAN_TRI.length} séances</span>
                </div>
                <div className="bar"><div className="bar-f" style={{ width: `${Math.round((PLAN_TRI.filter(s => s.fait).length / PLAN_TRI.length) * 100)}%`, background: "#06b6d4" }} /></div>
              </div>
            </div>

            {/* Légende types */}
          <div className="card" style={{ padding: "12px 16px" }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", fontSize: 11 }}>
              {[{ c: "#84cc16", l: "🏃 Run" }, { c: "#06b6d4", l: "🏊 Natation" }, { c: "#3b82f6", l: "🚴 Vélo" }, { c: "#8b5cf6", l: "💪 Muscu" }, { c: "#f97316", l: "🔥 Brique" }].map(l => (
                <div key={l.l} style={{ display: "flex", alignItems: "center", gap: 4, color: "#9a928a" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.c }} />{l.l}
                </div>
              ))}
            </div>
          </div>

          {BLOCS_TRI.map(bloc => (
            <div key={bloc.label} className="card">
                <div style={{ fontSize: 11, fontWeight: 700, color: "#9a928a", textTransform: "uppercase", letterSpacing: .6, marginBottom: 10 }}>{bloc.label}</div>
                {bloc.dates.map(d => {
                  const s = PLAN_TRI.find(p => p.date === d);
                  if (!s) return null;
                  const todayStr = new Date().toISOString().split("T")[0];
                  const isToday = d === todayStr;
                  const isPast = d < todayStr;
                  return (
                    <div key={d} style={{ borderBottom: "1px solid #f0ece6", opacity: isPast && !s.fait ? .5 : 1 }}>
                      <div onClick={() => setExpandedSeance(expandedSeance === d ? null : d)}
                        style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", cursor: "pointer" }}>
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.couleur, flexShrink: 0, marginTop: 4, boxShadow: isToday ? `0 0 0 3px ${s.couleur}40` : "none" }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                              <div style={{ fontSize: 14, fontWeight: 700, color: s.type === "race" ? "#c17b3e" : "#2a2520" }}>
                                {s.label} {s.fait ? "✅" : isToday ? "👈" : ""}
                              </div>
                              <div style={{ fontSize: 12, color: "#7a7068", marginTop: 2 }}>{s.detail}</div>
                            </div>
                            <div style={{ fontSize: 11, color: "#9a928a", flexShrink: 0, marginLeft: 8, textAlign: "right" }}>
                              <div>{new Date(d + "T12:00:00").toLocaleDateString("fr", { weekday: "short", day: "numeric", month: "short" })}</div>
                              <div style={{ fontWeight: 700, color: s.couleur, marginTop: 2 }}>{s.allure}</div>
                              <div style={{ fontSize: 10, color: "#c17b3e", marginTop: 3 }}>{expandedSeance === d ? "▲ fermer" : "▼ détail"}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {expandedSeance === d && s.etapes && (
                        <div className="fade-in" style={{ marginLeft: 22, marginBottom: 12, background: "#f5f2ee", borderRadius: 12, padding: "12px 14px" }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: "#9a928a", textTransform: "uppercase", letterSpacing: .6, marginBottom: 10 }}>Déroulé de la séance</div>
                          {s.etapes.map((e, i) => (
                            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                              <div style={{ width: 22, height: 22, borderRadius: "50%", background: s.couleur, color: "#fff", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i+1}</div>
                              <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                  <div style={{ fontSize: 13, fontWeight: 700 }}>{e.label}</div>
                                  <div style={{ fontSize: 12, fontWeight: 700, color: s.couleur }}>{e.allure}</div>
                                </div>
                                <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
                                  <span style={{ fontSize: 11, color: "#9a928a", background: "#fff", borderRadius: 6, padding: "1px 7px" }}>⏱ {e.duree}</span>
                                  {e.note && <span style={{ fontSize: 11, color: "#7a7068", fontStyle: "italic" }}>{e.note}</span>}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
        </div>}

        {/* ── CORPS ── */}
        {vue === "corps" && <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 21 }}>Composition corporelle</div>
            <button className="btn-sec" onClick={() => setShowCorpsForm(f => !f)} style={{ fontSize: 12 }}>{showCorpsForm ? "✕" : "+ Peser"}</button>
          </div>

          {/* Sélecteur période — contrôle TOUS les graphs */}
          <div style={{ display: "flex", gap: 4 }}>
            {[{ v: 7, l: "7j" }, { v: 30, l: "30j" }, { v: 90, l: "3m" }, { v: 150, l: "5m" }].map(p => (
              <button key={p.v} onClick={() => setChartPeriode(p.v)} style={{
                flex: 1, padding: "8px 4px", borderRadius: 10, border: "1.5px solid",
                borderColor: chartPeriode === p.v ? "#2a2520" : "#e8e3dc",
                background: chartPeriode === p.v ? "#2a2520" : "#fff",
                color: chartPeriode === p.v ? "#fff" : "#9a928a",
                fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              }}>{p.l}</button>
            ))}
          </div>

          {showCorpsForm && (
            <div className="card fade-in">
              <div className="g2" style={{ marginBottom: 12 }}>
                <div><label>Poids (kg)</label><input className="inp" type="number" placeholder="71.9" value={corpsForm.poids} onChange={e => setCorpsForm(f => ({ ...f, poids: e.target.value }))} /></div>
                <div><label>Masse grasse (%)</label><input className="inp" type="number" placeholder="19.5" value={corpsForm.mg} onChange={e => setCorpsForm(f => ({ ...f, mg: e.target.value }))} /></div>
              </div>
              <button className="btn-main" onClick={addCorps}>Enregistrer</button>
            </div>
          )}
          {dernierCorps && (
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1, background: "#f5f2ee", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: 10, color: "#9a928a" }}>Poids · {new Date(dernierCorps.date).toLocaleDateString("fr", { day: "numeric", month: "short" })}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                  <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22 }}>{dernierCorps.poids}</div>
                  <div style={{ fontSize: 11, color: "#9a928a" }}>kg</div>
                  <div style={{ fontSize: 10, color: "#9a928a", marginLeft: 4 }}>obj. {PROFIL.objectifPoids}</div>
                </div>
              </div>
              {dernierCorps.mg && (
                <div style={{ flex: 1, background: "#f5f2ee", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontSize: 10, color: "#9a928a" }}>MG%</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: +dernierCorps.mg > PROFIL.objectifMG + 3 ? "#c17b3e" : "#84cc16" }}>{dernierCorps.mg}</div>
                    <div style={{ fontSize: 11, color: "#9a928a" }}>%</div>
                    <div style={{ fontSize: 10, color: "#9a928a", marginLeft: 4 }}>obj. {PROFIL.objectifMG}</div>
                  </div>
                </div>
              )}
            </div>
          )}
          {corps.length > 1 && (
            <div className="card">
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9a928a", textTransform: "uppercase", letterSpacing: .6, marginBottom: 16 }}>Historique pesées</div>
              {(() => {
                // Filter by chartPeriode
                const cutoff = new Date();
                cutoff.setDate(cutoff.getDate() - chartPeriode);
                const cutoffStr = cutoff.toISOString().split("T")[0];
                const sorted = [...corps]
                  .filter(c => chartPeriode >= 150 || c.date >= cutoffStr)
                  .sort((a,b) => a.date > b.date ? 1 : -1);
                const withPoids = sorted.filter(c => c.poids);
                const withMG    = sorted.filter(c => c.mg);

                const poidsVals = withPoids.map(c => c.poids);
                const mgVals    = withMG.map(c => c.mg);

                const minP = Math.min(...poidsVals) - 0.5;
                const maxP = Math.max(...poidsVals) + 0.5;
                const rangeP = maxP - minP || 1;
                const minMG = Math.min(...mgVals) - 0.5;
                const maxMG = Math.max(...mgVals) + 0.5;
                const rangeMG = maxMG - minMG || 1;

                const H = 160;
                const W = 300;

                // Convert date to x position across full range
                const allDates = withPoids.map(c => c.date);
                const d0 = new Date(allDates[0] + "T12:00:00").getTime();
                const d1 = new Date(allDates[allDates.length-1] + "T12:00:00").getTime();
                const spanMs = d1 - d0 || 1;
                const dateToX = (dateStr) => ((new Date(dateStr + "T12:00:00").getTime() - d0) / spanMs) * W;
                const poidsToY = (v) => H - ((v - minP) / rangeP) * (H - 10) - 5;
                const mgToY    = (v) => H - ((v - minMG) / rangeMG) * (H - 10) - 5;

                // Y-axis ticks poids
                const pTicks = [Math.ceil(minP), Math.round((minP+maxP)/2), Math.floor(maxP)].filter((v,i,a) => a.indexOf(v)===i);
                // Y-axis ticks MG
                const mgTicksRaw = [Math.ceil(minMG), Math.round((minMG+maxMG)/2), Math.floor(maxMG)].filter((v,i,a) => a.indexOf(v)===i);

                // Month tick marks for X axis
                const monthTicks = [];
                const startDate = new Date(allDates[0] + "T12:00:00");
                const endDate   = new Date(allDates[allDates.length-1] + "T12:00:00");
                const cur = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
                while (cur <= endDate) {
                  const dateStr = cur.toISOString().split("T")[0];
                  const x = ((cur.getTime() - d0) / spanMs) * W;
                  if (x >= 0 && x <= W) {
                    monthTicks.push({ x, label: cur.toLocaleDateString("fr", { month: "short" }) });
                  }
                  cur.setMonth(cur.getMonth() + 1);
                }

                const ptsPoids = withPoids.map(c => ({ x: dateToX(c.date), y: poidsToY(c.poids), v: c.poids, date: c.date }));
                const ptsMG    = withMG.map(c => ({ x: dateToX(c.date), y: mgToY(c.mg), v: c.mg, date: c.date }));

                const dernierPoids = withPoids[withPoids.length - 1];
                const dernierMG    = withMG[withMG.length - 1];
                const premierPoids = withPoids[0];

                return (
                  <>
                    {/* Mini stats row */}
                    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                      {[
                        { label: "Min", v: `${Math.min(...poidsVals)}kg`, c: "#84cc16" },
                        { label: "Actuel", v: `${dernierPoids?.poids}kg`, c: "#2a2520" },
                        { label: "Δ total", v: `${dernierPoids && premierPoids ? (dernierPoids.poids - premierPoids.poids > 0 ? "+" : "") + (dernierPoids.poids - premierPoids.poids).toFixed(1) : "—"}kg`, c: dernierPoids && premierPoids && dernierPoids.poids < premierPoids.poids ? "#84cc16" : "#ef4444" },
                        { label: "MG actuel", v: dernierMG ? `${dernierMG.mg}%` : "—", c: "#06b6d4" },
                      ].map(s => (
                        <div key={s.label} style={{ flex: 1, background: "#f5f2ee", borderRadius: 10, padding: "8px 6px", textAlign: "center" }}>
                          <div style={{ fontSize: 9, color: "#9a928a", marginBottom: 3, textTransform: "uppercase", letterSpacing: .4 }}>{s.label}</div>
                          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 16, color: s.c, fontWeight: 700 }}>{s.v}</div>
                        </div>
                      ))}
                    </div>

                    {/* Chart */}
                    <div style={{ display: "flex", gap: 4 }}>
                      {/* Left Y axis — poids */}
                      <div style={{ position: "relative", width: 26, flexShrink: 0, height: H }}>
                        {pTicks.map(v => (
                          <div key={v} style={{ position: "absolute", right: 2, bottom: `${((v - minP) / rangeP) * 100}%`, fontSize: 8.5, color: "#84cc16", lineHeight: 1, transform: "translateY(50%)" }}>{v}</div>
                        ))}
                      </div>

                      {/* SVG chart */}
                      <div style={{ flex: 1, position: "relative" }}>
                        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: "100%", height: H, display: "block" }}>
                          {/* Grid lines horizontal */}
                          {pTicks.map(v => (
                            <line key={v} x1={0} x2={W} y1={poidsToY(v)} y2={poidsToY(v)} stroke="#f0ece6" strokeWidth="1" />
                          ))}
                          {/* Month vertical lines */}
                          {monthTicks.map((m, i) => (
                            <line key={i} x1={m.x} x2={m.x} y1={0} y2={H} stroke="#e8e3dc" strokeWidth="0.8" strokeDasharray="3 3" />
                          ))}
                          {/* Poids area fill */}
                          {ptsPoids.length >= 2 && (
                            <polyline
                              points={[
                                `${ptsPoids[0].x},${H}`,
                                ...ptsPoids.map(p => `${p.x},${p.y}`),
                                `${ptsPoids[ptsPoids.length-1].x},${H}`
                              ].join(" ")}
                              fill="#84cc1615" stroke="none"
                            />
                          )}
                          {/* Poids line */}
                          {ptsPoids.length >= 2 && (
                            <polyline points={ptsPoids.map(p => `${p.x},${p.y}`).join(" ")} fill="none" stroke="#84cc16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          )}
                          {/* Poids dots */}
                          {ptsPoids.map((p, i) => (
                            <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="#84cc16" stroke="#fff" strokeWidth="1.5" />
                          ))}
                          {/* MG line (dashed) */}
                          {ptsMG.length >= 2 && (
                            <polyline points={ptsMG.map(p => `${p.x},${p.y}`).join(" ")} fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 3" />
                          )}
                          {/* MG dots */}
                          {ptsMG.map((p, i) => (
                            <circle key={i} cx={p.x} cy={p.y} r="2" fill="#06b6d4" stroke="#fff" strokeWidth="1.5" />
                          ))}
                        </svg>

                        {/* X axis month labels */}
                        <div style={{ position: "relative", height: 16, marginTop: 2 }}>
                          {monthTicks.map((m, i) => (
                            <div key={i} style={{ position: "absolute", left: `${(m.x / W) * 100}%`, transform: "translateX(-50%)", fontSize: 8.5, color: "#b5afa8", whiteSpace: "nowrap" }}>{m.label}</div>
                          ))}
                        </div>
                      </div>

                      {/* Right Y axis — MG */}
                      <div style={{ position: "relative", width: 22, flexShrink: 0, height: H }}>
                        {mgTicksRaw.map(v => (
                          <div key={v} style={{ position: "absolute", left: 2, bottom: `${((v - minMG) / rangeMG) * 100}%`, fontSize: 8.5, color: "#06b6d4", lineHeight: 1, transform: "translateY(50%)" }}>{v}%</div>
                        ))}
                      </div>
                    </div>

                    {/* Légende */}
                    <div style={{ display: "flex", gap: 16, marginTop: 8, fontSize: 11 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#9a928a" }}>
                        <div style={{ width: 16, height: 2.5, background: "#84cc16", borderRadius: 2 }} />Poids (kg)
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#9a928a" }}>
                        <svg width="16" height="4"><line x1="0" y1="2" x2="16" y2="2" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 2" /></svg>MG%
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* Chart poids vs MG vs calories */}
          {(() => {
            const nDays = chartPeriode;
            const data30 = Array.from({ length: nDays }, (_, i) => {
              const d = new Date(); d.setDate(d.getDate() - (nDays - 1 - i));
              const k = d.toISOString().split("T")[0];
              const j = logs[k] || { repas: [] };
              const cals = j.repas.filter(r => !r.isSport).reduce((s,r) => s+(r.calories||0), 0);
              const prot = j.repas.reduce((s,r) => s+(r.proteines||0), 0);
              const sportCals = Math.abs(j.repas.filter(r => r.isSport).reduce((s,r) => s+(r.calories||0), 0));
              const pesee = corps.find(c => c.date === k);
              return { k, label: d.toLocaleDateString("fr", { day: "numeric", month: "short" }), cals, prot, sportCals, entrainement: j.entrainement, poids: pesee?.poids || null, mg: pesee?.mg || null };
            });

            const maxCals = Math.max(...data30.map(d => d.cals), 2000);
            const poidsVals = data30.filter(d => d.poids).map(d => d.poids);
            const mgVals = data30.filter(d => d.mg).map(d => d.mg);
            const minPoids = poidsVals.length ? Math.min(...poidsVals) - 0.5 : 70;
            const maxPoids = poidsVals.length ? Math.max(...poidsVals) + 0.5 : 75;
            const poidsRange = maxPoids - minPoids || 1;
            const minMG = mgVals.length ? Math.min(...mgVals) - 0.5 : 17;
            const maxMG = mgVals.length ? Math.max(...mgVals) + 0.5 : 22;
            const mgRange = maxMG - minMG || 1;

            // ── Pearson ────────────────────────────────────────────────────
            const pearson = (xs, ys) => {
              const n = xs.length;
              if (n < 3) return null;
              const mx = xs.reduce((a,b) => a+b, 0) / n;
              const my = ys.reduce((a,b) => a+b, 0) / n;
              const num = xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0);
              const den = Math.sqrt(xs.reduce((s,x) => s+(x-mx)**2, 0) * ys.reduce((s,y) => s+(y-my)**2, 0));
              return den === 0 ? null : +(num / den).toFixed(2);
            };

            // ── Moyenne mobile ─────────────────────────────────────────────
            const movingAvg = (arr, field, w) => {
              if (w <= 1) return arr.map(d => ({ ...d, [field + '_ma']: d[field] }));
              return arr.map((d, i) => {
                const window = arr.slice(Math.max(0, i - w + 1), i + 1);
                const vals = window.map(x => x[field]).filter(v => v !== null && v > 0);
                return { ...d, [field + '_ma']: vals.length >= Math.max(2, Math.floor(w/2)) ? vals.reduce((a,b) => a+b,0)/vals.length : null };
              });
            };

            const w = maWindow;
            const dataMA = movingAvg(movingAvg(movingAvg(movingAvg(data30, 'cals', w), 'poids', w), 'mg', w), 'prot', w);

            const paired    = dataMA.filter(d => d.poids_ma && d.cals_ma > 0);
            const pairedMG  = dataMA.filter(d => d.mg_ma    && d.cals_ma > 0);
            const pairedProt = dataMA.filter(d => d.poids_ma && d.prot_ma > 0);

            const corr_cals_poids  = paired.length >= 3    ? pearson(paired.map(d => d.cals_ma),    paired.map(d => d.poids_ma))    : null;
            const corr_prot_poids  = pairedProt.length >= 3 ? pearson(pairedProt.map(d => d.prot_ma), pairedProt.map(d => d.poids_ma)) : null;
            const corr_sport_poids = data30.filter(d => d.sportCals > 0 && d.poids).length >= 3
              ? pearson(data30.filter(d => d.sportCals > 0 && d.poids).map(d => d.sportCals), data30.filter(d => d.sportCals > 0 && d.poids).map(d => d.poids)) : null;
            const corr_cals_mg     = pairedMG.length >= 3  ? pearson(pairedMG.map(d => d.cals_ma),   pairedMG.map(d => d.mg_ma))    : null;
            const corr_prot_mg     = pairedMG.filter(d => d.prot_ma > 0).length >= 3
              ? pearson(pairedMG.filter(d => d.prot_ma > 0).map(d => d.prot_ma), pairedMG.filter(d => d.prot_ma > 0).map(d => d.mg_ma)) : null;

            const corrColor = r => r === null ? "#b5afa8" : Math.abs(r) > 0.6 ? (r > 0 ? "#ef4444" : "#84cc16") : Math.abs(r) > 0.3 ? "#f97316" : "#9a928a";
            const corrLabel = r => r === null ? "—" : Math.abs(r) > 0.6 ? (r > 0 ? "Forte +" : "Forte −") : Math.abs(r) > 0.3 ? "Modérée" : "Faible";

            const corrStats = [
              { label: "Calories → Poids", r: corr_cals_poids, note: "Calories élevées → poids qui monte ?" },
              { label: "Protéines → Poids", r: corr_prot_poids, note: "Plus de protéines → poids plus bas ?" },
              { label: "Sport → Poids", r: corr_sport_poids, note: "Les séances font-elles baisser le poids ?" },
              { label: "Calories → MG%", r: corr_cals_mg, note: "Les calories influencent-elles la MG ?" },
              { label: "Protéines → MG%", r: corr_prot_mg, note: "Les protéines protègent-elles la masse maigre ?" },
            ];

            // Moyenne poids jours entraînement vs repos
            const joursEntr  = data30.filter(d => d.entrainement && d.poids);
            const joursRepos = data30.filter(d => !d.entrainement && d.poids);
            const moyPoidsEntr  = joursEntr.length  ? (joursEntr.reduce((s,d)  => s+d.poids, 0) / joursEntr.length).toFixed(1)  : null;
            const moyPoidsRepos = joursRepos.length ? (joursRepos.reduce((s,d) => s+d.poids, 0) / joursRepos.length).toFixed(1) : null;

            return (
              <>
                <div className="card">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#9a928a", textTransform: "uppercase", letterSpacing: .6 }}>
                      Poids · MG% · Calories
                    </div>
                  </div>
                  <div style={{ position: "relative", height: 130 }}>
                    {[0, 0.5, 1].map(t => (
                      <div key={t} style={{ position: "absolute", left: 0, right: 0, top: `${t * 100}%`, borderTop: "1px dashed #f0ece6" }} />
                    ))}
                    {/* Barres calories */}
                    <div style={{ position: "absolute", inset: 0, display: "flex", gap: 2, alignItems: "flex-end" }}>
                      {data30.map(d => (
                        <div key={d.k} style={{ flex: 1, height: `${Math.min(100, (d.cals / maxCals) * 100)}%`, background: d.cals > 2000 ? "#f97316" : d.cals > 0 ? "#c17b3e" : "transparent", borderRadius: "2px 2px 0 0", opacity: 0.3 }} />
                      ))}
                    </div>
                    {/* SVG poids + MG */}
                    <svg viewBox="0 0 300 130" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                      {(() => {
                        const ptsPoids = data30.map((d, i) => {
                          if (!d.poids) return null;
                          const x = (i / (data30.length - 1)) * 300;
                          const y = 130 - ((d.poids - minPoids) / poidsRange) * 120 - 5;
                          return { x, y };
                        }).filter(Boolean);

                        const ptsMG = data30.map((d, i) => {
                          if (!d.mg) return null;
                          const x = (i / (data30.length - 1)) * 300;
                          const y = 130 - ((d.mg - minMG) / mgRange) * 120 - 5;
                          return { x, y };
                        }).filter(Boolean);

                        return (
                          <>
                            {ptsPoids.length >= 2 && <>
                              <polyline points={ptsPoids.map(p => `${p.x},${p.y}`).join(" ")} fill="none" stroke="#84cc16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              {ptsPoids.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3" fill="#84cc16" stroke="#fff" strokeWidth="1.5" />)}
                            </>}
                            {ptsMG.length >= 2 && <>
                              <polyline points={ptsMG.map(p => `${p.x},${p.y}`).join(" ")} fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 2" />
                              {ptsMG.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3" fill="#06b6d4" stroke="#fff" strokeWidth="1.5" />)}
                            </>}
                          </>
                        );
                      })()}
                    </svg>
                  </div>

                  {/* Légende */}
                  <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 11, flexWrap: "wrap" }}>
                    {[
                      { c: "#c17b3e", w: 12, h: 8, r: 2, op: 0.5, l: "Calories (barres)" },
                      { c: "#84cc16", w: 16, h: 3, r: 2, l: "Poids (courbe)" },
                      { c: "#06b6d4", w: 16, h: 3, r: 2, l: "MG% (pointillés)" },
                    ].map(l => (
                      <div key={l.l} style={{ display: "flex", alignItems: "center", gap: 5, color: "#9a928a" }}>
                        <div style={{ width: l.w, height: l.h, borderRadius: l.r, background: l.c, opacity: l.op || 1 }} />{l.l}
                      </div>
                    ))}
                  </div>

                  {/* Min/Max */}
                  <div style={{ display: "flex", gap: 12, marginTop: 10, fontSize: 11 }}>
                    {poidsVals.length > 0 && (
                      <div style={{ flex: 1, background: "#f5f2ee", borderRadius: 8, padding: "6px 10px" }}>
                        <div style={{ color: "#9a928a", marginBottom: 2 }}>Poids</div>
                        <span style={{ color: "#84cc16", fontWeight: 700 }}>{Math.min(...poidsVals)}</span>
                        <span style={{ color: "#9a928a" }}> → </span>
                        <span style={{ color: "#c17b3e", fontWeight: 700 }}>{Math.max(...poidsVals)} kg</span>
                      </div>
                    )}
                    {mgVals.length > 0 && (
                      <div style={{ flex: 1, background: "#f5f2ee", borderRadius: 8, padding: "6px 10px" }}>
                        <div style={{ color: "#9a928a", marginBottom: 2 }}>MG%</div>
                        <span style={{ color: "#84cc16", fontWeight: 700 }}>{Math.min(...mgVals)}</span>
                        <span style={{ color: "#9a928a" }}> → </span>
                        <span style={{ color: "#c17b3e", fontWeight: 700 }}>{Math.max(...mgVals)}%</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Stats corrélations ── */}
                <div className="card">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#9a928a", textTransform: "uppercase", letterSpacing: .6 }}>
                      📊 Corrélations — {chartPeriode === 7 ? "7 jours" : chartPeriode === 30 ? "30 jours" : chartPeriode === 90 ? "3 mois" : "5 mois"}
                    </div>
                    <div style={{ fontSize: 10, color: "#b5afa8" }}>{paired.length} pts</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
                    <div style={{ fontSize: 10, color: "#9a928a", flexShrink: 0 }}>Moy. mobile :</div>
                    <div style={{ display: "flex", gap: 4 }}>
                      {[{ v: 1, l: "Brut" }, { v: 2, l: "2j" }, { v: 7, l: "7j" }, { v: 10, l: "10j" }].map(p => (
                        <button key={p.v} onClick={() => setMaWindow(p.v)} style={{
                          padding: "3px 9px", borderRadius: 7, border: "1.5px solid",
                          borderColor: maWindow === p.v ? "#2a2520" : "#e8e3dc",
                          background: maWindow === p.v ? "#2a2520" : "#fff",
                          color: maWindow === p.v ? "#fff" : "#9a928a",
                          fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                        }}>{p.l}</button>
                      ))}
                    </div>
                    {maWindow > 1 && <div style={{ fontSize: 10, color: "#b5afa8", fontStyle: "italic" }}>lisse le bruit</div>}
                  </div>

                  {corrStats.map(s => (
                    <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #f0ece6" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>{s.label}</div>
                        <div style={{ fontSize: 11, color: "#9a928a", marginTop: 2 }}>{s.note}</div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 20, color: corrColor(s.r) }}>
                          {s.r !== null ? s.r : "—"}
                        </div>
                        <div style={{ fontSize: 10, color: corrColor(s.r), fontWeight: 700 }}>{corrLabel(s.r)}</div>
                      </div>
                    </div>
                  ))}

                  {/* Narratif interprétatif */}
                  {(() => {
                    const periodeLabel = chartPeriode === 7 ? "7 jours" : chartPeriode === 30 ? "30 jours" : chartPeriode === 90 ? "3 mois" : "5 mois";
                    const maLabel = maWindow === 1 ? "brutes" : `lissées sur ${maWindow} jours`;

                    const sentences = [];

                    // Protéines → Poids
                    if (corr_prot_poids !== null) {
                      if (corr_prot_poids < -0.4)
                        sentences.push(`Sur ${periodeLabel} (données ${maLabel}), les journées riches en protéines sont clairement associées à un poids plus bas — c'est le signal le plus fiable de tes données, et probablement partiellement causal.`);
                      else if (corr_prot_poids < -0.2)
                        sentences.push(`Une tendance modérée suggère que les protéines élevées vont de pair avec un poids légèrement plus bas, mais le signal reste faible sur cette période.`);
                      else if (corr_prot_poids > 0.3)
                        sentences.push(`Contre-intuitivement, les protéines et le poids montent ensemble sur cette période — probablement un artefact de trajectoire ou de rétention d'eau post-effort.`);
                      else
                        sentences.push(`Pas de lien clair entre protéines et poids sur ${periodeLabel} — il faudra plus de données loggées pour dégager un signal.`);
                    }

                    // Calories → Poids
                    if (corr_cals_poids !== null) {
                      if (corr_cals_poids < -0.3)
                        sentences.push(`La corrélation calories → poids est négative : les phases à calories élevées coïncident avec les périodes de poids bas. C'est un artefact de trajectoire — tu mangeais moins quand tu descendais depuis 75 kg, et tu as relâché une fois stabilisé plus bas. Ce n'est pas une loi physique inversée.`);
                      else if (corr_cals_poids > 0.3)
                        sentences.push(`Les calories élevées sont associées à un poids plus haut sur cette période — signal attendu et cohérent.`);
                      else
                        sentences.push(`Pas de lien net entre les calories et le poids sur cette fenêtre — la période est peut-être trop courte ou trop stable.`);
                    }

                    // Protéines → MG
                    if (corr_prot_mg !== null) {
                      if (Math.abs(corr_prot_mg) > 0.4)
                        sentences.push(`La corrélation protéines → MG% (${corr_prot_mg > 0 ? "positive" : "négative"}) est à prendre avec précaution : ta balance arrondit la MG à l'entier, ce qui limite la fiabilité statistique de ce signal.`);
                    }

                    // Levier actionnable
                    const hasProt = corr_prot_poids !== null;
                    const protGood = hasProt && corr_prot_poids < -0.3;
                    const avgProt = paired.length > 0 ? Math.round(paired.reduce((s,d) => s + (d.prot_ma || 0), 0) / paired.length) : null;

                    if (avgProt !== null && avgProt < PROFIL.proteinesCible * 0.85) {
                      sentences.push(`Ta moyenne protéines sur la période est de ~${avgProt}g/j — encore en dessous de ta cible de ${PROFIL.proteinesCible}g. C'est le levier le plus directement actionnable.`);
                    } else if (avgProt !== null && avgProt >= PROFIL.proteinesCible) {
                      sentences.push(`Ta moyenne protéines sur la période est de ~${avgProt}g/j — tu tiens ta cible de ${PROFIL.proteinesCible}g. Continue.`);
                    }

                    if (sentences.length === 0) {
                      sentences.push(`Pas assez de données loggées sur cette période pour générer une interprétation fiable. Continue de logger quotidiennement.`);
                    }

                    return (
                      <div style={{ marginTop: 16, padding: "14px 16px", background: "#f5f2ee", borderRadius: 12 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#9a928a", textTransform: "uppercase", letterSpacing: .6, marginBottom: 10 }}>
                          Lecture des données
                        </div>
                        {sentences.map((s, i) => (
                          <p key={i} style={{ fontSize: 12, color: "#5a5248", lineHeight: 1.7, margin: 0, marginBottom: i < sentences.length - 1 ? 10 : 0 }}>{s}</p>
                        ))}
                        <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid #e8e3dc", fontSize: 10, color: "#b5afa8", fontStyle: "italic" }}>
                          Corrélation ≠ causalité · MG% arrondie à l'entier (balance impédancemètre) · {paired.length} points sur {nDays} jours
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </>
            );
          })()}
        </div>}

      </div>
    </div>
  );
}
