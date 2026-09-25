// Pakiety. Tu zmieniasz nazwy, ceny i zawartość.
// price: wpisz np. "29 zł" – puste ("") pokaże na stronie „Cena wkrótce”.
// note: dopisek pod ceną, np. "za cały sezon".
// featured: true = pakiet delikatnie wyróżniony.

export const pricing = [
  {
    id: "darmowy",
    name: "Darmowy",
    for: "Na dobry początek",
    price: "0 zł",
    note: "",
    featured: false,
    points: [
      "Powitanie i osobisty plan",
      "Kalendarz z gotowym planem",
      "Odliczanie do Wigilii",
      "Prezenty dla kilku osób",
      "Lista pakowania",
    ],
  },
  {
    id: "pelny",
    name: "Pełny",
    for: "Dla Ciebie, bez limitów",
    price: "",
    note: "",
    featured: false,
    points: [
      "Wszystko z pakietu Darmowego, bez limitów",
      "Kartki i życzenia",
      "Pomoc w pomysłach na prezenty",
      "Pomoc w pisaniu życzeń",
    ],
  },
  {
    id: "rodzinny",
    name: "Rodzinny",
    for: "Dla całego domu",
    price: "",
    note: "",
    featured: true,
    points: [
      "Wszystko z pakietu Pełnego",
      "Zadania z rodziną i zapraszanie linkiem",
      "Goście i zaproszenia na Wigilię",
      "Potwierdzanie obecności za gości",
    ],
  },
] as const;

export const priceSoon = "Cena wkrótce";
