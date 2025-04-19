# Benzine

**Benzine** is een eenvoudige webapplicatie waarmee je kunt berekenen hoeveel jouw rit aan benzine kost.  
Je voert het aantal gereden kilometers in, en de app rekent op basis van de actuele benzineprijs uit wat de rit je heeft gekost.

De benzineprijs wordt automatisch opgehaald via de officiële open data API van het CBS:  
[https://opendata.cbs.nl/ODataApi](https://opendata.cbs.nl/ODataApi)

---

## 🚗 Functionaliteit

- ✅ Vul het aantal gereden kilometers in
- ⛽ Automatisch ophalen van de meest recente benzineprijs
- 💸 Direct inzicht in je brandstofkosten
- 🔒 Alleen ondersteuning voor **benzine** (geen diesel, elektrisch of hybride)

---

## ▶️ Project starten

### 📦 Installatie

1. Installeer afhankelijkheden:

```bash
yarn
```

2. Start de ontwikkelserver:

```bash
yarn dev
```

De app is nu beschikbaar op [http://localhost:3000](http://localhost:3000)

---

### 🚀 Productiebouw

Wil je de app builden voor productie?

```bash
yarn build
yarn start
```

---

## 📡 Externe data

Deze app gebruikt de open data API van het CBS voor de benzineprijzen:  
[https://opendata.cbs.nl/ODataApi](https://opendata.cbs.nl/ODataApi)

Let op: de app is afhankelijk van beschikbaarheid van deze API.

---

## ⚠️ Beperkingen

- Alleen benzine wordt ondersteund
- Geen ondersteuning voor meerdere brandstoftypes of voertuigspecifieke verbruiksgegevens
- De berekening gaat uit van een **vast gemiddeld verbruik** (in de code gedefinieerd)

---

## 🧾 Licentie

MIT — gebruik deze app vrij voor eigen doeleinden of breid hem uit naar wens.

---

Veel plezier met rekenen!
