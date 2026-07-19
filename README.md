<div align="center">

[![Slovencina](https://img.shields.io/badge/SK-Sloven%C4%8Dina-2ea043?style=for-the-badge)](README.md) [![English](https://img.shields.io/badge/EN-English-30363d?style=for-the-badge)](README.en.md)

</div>

<div align="center">

# 🎄 Christmas Timer

**Živý vianočný odpočet do 25. decembra - jedna statická stránka so snehom, konfetami a progress barom.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Canvas](https://img.shields.io/badge/Canvas_2D-FF6B6B?style=flat-square)
![Bez závislostí](https://img.shields.io/badge/závislosti-žiadne-2ecc71?style=flat-square)
![License](https://img.shields.io/badge/license-GPL--3.0-blue?style=flat-square)

</div>

---

## 📋 Obsah

- [🔍 Prehľad](#-prehľad)
- [✨ Funkcie](#-funkcie)
- [🚀 Rýchly štart](#-rýchly-štart)
- [📁 Štruktúra projektu](#-štruktúra-projektu)
- [🛠️ Technológie](#️-technológie)
- [⚙️ Konfigurácia](#️-konfigurácia)
- [⚠️ Známe obmedzenia](#️-známe-obmedzenia)
- [📄 Licencia](#-licencia)

---

## 🔍 Prehľad

Christmas Timer je jednostránková, čisto klientská webová aplikácia v slovenčine, ktorá odpočítava dni, hodiny, minúty a sekundy do **25. decembra 00:00** v lokálnom časovom pásme návštevníka. Odpočet sa prepočítava každú sekundu a dopĺňa ho progress bar znázorňujúci, aká časť roka už uplynula.

Vizuálnu stránku tvorí animované sneženie na `<canvas>`, blikajúce vianočné žiarovky, aurora pozadie a plávajúce emoji dekorácie. Keď odpočet dobehne do nuly, nahradí ho správa **„Veselé Vianoce!"** a spustí sa konfetová animácia.

Celý projekt je postavený na čistom HTML, CSS a vanilla JavaScripte - **bez frameworku, bez build kroku a bez akejkoľvek inštalovateľnej závislosti**.

> [!NOTE]
> Predchádzajúca verzia tohto README uvádzala, že projekt je „Made in php". Nie je to pravda - repozitár neobsahuje ani jeden `.php` súbor a žiadny serverový kód. Ide o 100 % statický frontend.

---

## ✨ Funkcie

- ⏱️ **Živý odpočet** - dni, hodiny, minúty a sekundy do 25. decembra, aktualizované každú sekundu cez `setInterval`, s doplnením núl na dve miesta.
- 🔄 **Automatický prechod na ďalší rok** - ak je aktuálny čas už za hranicou 25. decembra 00:00:00, funkcia `getNextChristmas()` nastaví cieľ na 25. december nasledujúceho roka.
- 🃏 **Flip animácia číslic** - CSS 3D prevrátenie (`@keyframes flipDigit`) sa spustí len vtedy, keď sa hodnota danej jednotky reálne zmení.
- 📊 **Progress bar roka** - postup od 1. januára do 25. decembra cieľového roka, s percentom na jedno desatinné miesto.
- 🎉 **Vianočný režim** - keď `diff` klesne na nulu, karte sa pridá trieda `.christmas-active`, odpočet sa skryje, zobrazí sa pozdrav a spustia sa tri konfetové salvy (200, 100 a 80 kúskov v čase 0 s, 2 s a 4,5 s).
- ❄️ **Sneženie na canvase** - hustota vločiek sa škáluje podľa plochy viewportu (max. 300), s parallax vrstvami, sínusovým driftom, rešpektovaním `devicePixelRatio` a zabalením cez okraje.
- 🎛️ **Vypínač snehu** - tlačidlo zastaví alebo znovu naštartuje `requestAnimationFrame` slučku a prepne popisku medzi „Vypnúť sneh" a „Zapnúť sneh".
- 🔗 **Kopírovanie odkazu** - tlačidlo skopíruje `location.href` cez Clipboard API a na 2,5 s zobrazí stav „Skopírované ✓" alebo „Chyba".
- ♿ **Rešpektovanie `prefers-reduced-motion`** - CSS vypne všetky animácie a prechody, JavaScript navyše pri načítaní zastaví sneženie.
- 📱 **Responzívny layout** - breakpointy na 768 px a 400 px; pod 400 px sa tlačidlá roztiahnu na plnú šírku a naskladajú pod seba.
- 🖼️ **SEO a Open Graph metadáta** - slovenský title a description, OG tagy, `theme-color` a inline SVG data-URI favikona 🎄 (žiadne obrázkové súbory).

---

## 🚀 Rýchly štart

Projekt nemá build krok, package manager ani serverový runtime. Nie je čo inštalovať.

### Možnosť 1 - otvoriť súbor priamo

```powershell
start files\index.html
```

Stránka sa vykreslí kompletne, pretože `styles.css` aj `script.js` sú linkované relatívnou cestou v tom istom priečinku.

### Možnosť 2 - lokálny HTTP server (odporúčané)

Clipboard API vyžaduje secure context, takže tlačidlo „Kopírovať odkaz" funguje spoľahlivo len cez `https://` alebo `localhost`.

```bash
# z koreňa repozitára
python -m http.server 8000
# potom otvorte http://localhost:8000/files/
```

```bash
# alternatíva cez Node.js
npx serve files
```

> [!IMPORTANT]
> Vstupným bodom je `files/index.html`, **nie** koreň repozitára - root `index.html` neexistuje. Pri nasadení na GitHub Pages z koreňa bude stránka dostupná na `<site>/files/`, nie na `/`.

---

## 📁 Štruktúra projektu

```text
Christmas-timer/
├── files/
│   ├── index.html    # jediný vstupný bod: canvasy, dekorácie, karta s odpočtom, ovládanie
│   ├── script.js     # ~330 riadkov, celá logika v strict-mode IIFE bez globálov
│   └── styles.css    # ~785 riadkov, design tokeny v :root + všetky animácie
├── LICENSE           # plný text GNU GPL v3
├── README.en.md      # anglická verzia
└── README.md         # tento súbor
```

### Členenie `files/script.js`

| Sekcia             | Kľúčové funkcie                                                         | Čo robí                                              |
| ------------------ | ----------------------------------------------------------------------- | ---------------------------------------------------- |
| Odpočet a progress | `getNextChristmas`, `getYearStart`, `updateCountdown`, `triggerFlip`    | výpočet cieľa, prepočet každú sekundu, flip animácia |
| Kopírovanie odkazu | listener na `#copy-link`                                                | `navigator.clipboard.writeText(location.href)`       |
| Sneh               | `resizeCanvas`, `createSnowflakes`, `drawSnow`, `startSnow`, `stopSnow` | generovanie a animácia vločiek na `#snow-canvas`     |
| Konfety            | `resizeConfetti`, `createConfetti`, `drawConfetti`, `startConfetti`     | vianočná oslava na `#confetti-canvas`                |
| Reduced motion     | `window.matchMedia` kontrola                                            | pri načítaní zastaví sneh                            |

---

## 🛠️ Technológie

| Vrstva          | Použité                                                                                                                          |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Markup          | HTML5, `lang="sk"`, Open Graph metadáta                                                                                          |
| Štýly           | CSS3 - custom properties, `backdrop-filter` glassmorphism, keyframe animácie, media queries                                      |
| Logika          | Vanilla JavaScript (ES2019 - optional catch binding je najnovšia použitá vlastnosť), IIFE, žiadny framework                      |
| Grafika         | Canvas 2D API pre sneh aj konfety, `requestAnimationFrame`                                                                       |
| API prehliadača | Clipboard API, `matchMedia`, `devicePixelRatio`                                                                                  |
| Externé zdroje  | Google Fonts (Inter, Outfit) - jediná externá závislosť; načíta CSS z `fonts.googleapis.com` a font súbory z `fonts.gstatic.com` |

Konfetová aj snehová animácia sú napísané ručne, nie prevzaté z knižnice. V repozitári nie je `package.json`, lockfile ani vendorovaný kód.

---

## ⚙️ Konfigurácia

Projekt nemá konfiguračný súbor, `.env`, ani CLI prepínače. Všetko je zapísané priamo v zdrojáku:

| Čo chcete zmeniť         | Kde                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------- |
| Cieľový dátum            | `new Date(year, 11, 25, 0, 0, 0)` vo funkcii `getNextChristmas()` v `files/script.js` |
| Farby, zaoblenia, easing | blok `:root` v `files/styles.css`                                                     |
| Paleta konfiet           | pole `CONFETTI_COLORS` v `files/script.js`                                            |
| Hustota snehu            | `Math.min(Math.round((W * H) / 12000), 300)` vo funkcii `createSnowflakes()`          |
| Texty rozhrania          | priamo v `files/index.html` a v reťazcoch v `files/script.js`                         |

---

## ⚠️ Známe obmedzenia

- 🏷️ **Nesúlad v metadátach** - `<title>` aj `og:description` hovoria o „Štedrom dni" (24. december), no `getNextChristmas()` cieli na 25. december. Viditeľný podnadpis, `meta name="description"` aj pätička uvádzajú 25. december správne; nekonzistentné sú `<title>` a `og:description`.
- 🔁 **Oslavný režim je takmer nedosiahnuteľný** - `getNextChristmas()` robí `return now > xmas ? new Date(year + 1, 11, 25, ...) : xmas;`, takže stránka načítaná 25. decembra kedykoľvek po 00:00:00 už cieli na budúci rok. Namiesto pozdravu „Veselé Vianoce!" a konfiet vtedy návštevník uvidí normálny odpočet ~364 dní. Oslavný režim uvidí len karta, ktorá už bola otvorená v okamihu polnočného prechodu na 25. december.
- 📉 **Progress bar medzi 25. a 31. decembrom** - po prechode cieľa na ďalší rok sa `yearStart` posunie na nasledujúci 1. január, `elapsed` je záporný a lišta ukazuje 0,0 %, hoci od nového cieľa (25. 12. nasledujúceho roka) reálne uplynulo už niekoľko dní.
- 🌍 **Lokálne časové pásmo** - odpočet mieri na 00:00 v pásme návštevníka, nie na fixnú zónu; rôzni používatelia teda legitímne vidia rôzny zostávajúci čas.
- 📋 **Clipboard vyžaduje secure context** - cez obyčajné `http://` na inom hoste ako `localhost` tlačidlo zlyhá a zobrazí „Chyba".
- 🌐 **Fonty z internetu** - bez pripojenia stránka funguje, ale spadne na systémové fonty namiesto Inter/Outfit.
- 🔋 **Náročné efekty** - `backdrop-filter`, 80px blur aurora a až 300 animovaných častíc dokážu zaťažiť slabšie zariadenia a batériu. Jedinou obranou sú vypínač snehu a podpora `prefers-reduced-motion`.
- 📜 **Stránka nescrolluje** - `body { overflow: hidden }` znamená, že na veľmi nízkych viewportoch môže byť karta orezaná bez možnosti dostať sa k zvyšku obsahu.
- 🧹 **Mŕtve CSS** - pravidlá `.lights-wire` a jeho `svg`/`path` nemajú v `index.html` žiadny zodpovedajúci markup.
- ♻️ **Duplicitné animačné slučky** - `startConfetti()` naplánuje dve ďalšie salvy, ktoré volajú `drawConfetti()` bez kontroly bežiaceho `confettiRAF`, takže nad tým istým canvasom môžu bežať až tri slučky naraz. Vizuálne sa to prejaví - častice sa posúvajú, rotujú a strácajú priehľadnosť až trojnásobnou rýchlosťou, keďže všetky slučky mutujú to isté pole `confettiPieces`.
- 🗣️ **Len slovenčina** - `lang="sk"`, žiadne i18n ani prepínač jazyka.
- 🧪 **Žiadne testy** - v repozitári nie sú testy, linter, CI ani build tooling.

---

## 📄 Licencia

Repozitár obsahuje súbor `LICENSE` s úplným, neupraveným textom **GNU General Public License verzie 3** (29. jún 2007).

Šablónové zástupné hodnoty na konci licencie (`<year>`, `<name of author>`) neboli vyplnené a v `index.html`, `script.js` ani `styles.css` nie sú GPL hlavičky ani copyright poznámka. Akékoľvek redistribuované odvodené dielo musí podľa GPLv3 zostať pod GPLv3 a dodať aj zdrojový kód.

---

<div align="center">

Vytvoril **Alex Poliak** - [GitHub](https://github.com/Apoliak7777) - [alexpoliak21@gmail.com](mailto:alexpoliak21@gmail.com)

</div>
