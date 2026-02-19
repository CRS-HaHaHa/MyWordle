# 🧩 MyWordle - Multilingua

Benvenuto in **MyWordle**, un clone moderno, fluido e personalizzabile del famoso gioco di parole, sviluppato interamente in HTML5, CSS3 e JavaScript. 

Il progetto offre una sfida dinamica adattabile a diversi livelli di competenza linguistica e difficoltà.

---

## ✨ Caratteristiche Principali

* **🌍 Multilingua Avanzato:** Supporto completo per **Italiano, Inglese, Francese e Spagnolo**.
    * Gestione nativa di caratteri speciali: **Ñ** per lo spagnolo e **Ç** per il francese.
    * Normalizzazione automatica degli accenti (es: *perché* diventa *perche*) per garantire una giocabilità fluida.
* **📏 Difficoltà Variabile:** Possibilità di sfidarsi con parole di **5, 6 o 7 lettere**.
* **📚 Dizionari Curati:** Le liste di parole sono state generate partendo dai corpora dell'Università di Lipsia, filtrando i termini per frequenza d'uso e ripulendo i dati da simboli e nomi propri.
    * **Soluzioni:** Prime 3.000 parole più comuni per categoria.
    * **Dizionario:** Migliaia di parole accettate per ogni lingua.
* **🔥 Sistema di Streak & Record:** Il gioco tiene traccia delle tue vittorie consecutive e del tuo miglior punteggio per ogni combinazione lingua/lunghezza (salvataggio locale tramite `localStorage`).
* **📱 PWA Ready:** Include `manifest.json` e `sw.js` (Service Worker) per essere installato come un'app nativa su smartphone.
* **🎨 Design Responsivo:** Interfaccia adattiva con tastiera virtuale dinamica e layout della griglia ottimizzato per PC e Mobile.

---

## 🚀 Come Giocare

1.  **Accesso:** Visita [https://crs-hahaha.github.io/MyWordle/](https://crs-hahaha.github.io/MyWordle/) dal tuo browser.
2.  **Configurazione:** Scegli la lingua cliccando sulla bandiera e seleziona la lunghezza della parola.
3.  **Regole:**
    * Hai un numero di tentativi pari alla **lunghezza della parola + 1**.
    * **🟩 Verde:** Lettera corretta nella posizione corretta.
    * **🟨 Giallo:** Lettera presente nella parola ma in una posizione diversa.
    * **⬜ Grigio:** Lettera non presente nella parola.

---

## 🛠️ Dettagli Tecnici e Pulizia Dati

I dizionari inclusi in `words_data.js` sono il risultato di un processo di elaborazione dati (Python/JS) che ha:
1.  Unito più corpora di frequenza da 1M di frasi.
2.  Sostituito legature speciali (es: `œ` → `oe`).
3.  Preservato caratteri distintivi (`ñ`, `ç`) rimuovendo gli accenti fonetici.
4.  Suddiviso i file per lunghezza (5, 6, 7) e ordinato per popolarità.

---

## 📁 Struttura del Repository

* `index.html`: Cuore dell'applicazione (Logica, UI, Stili).
* `words_data.js`: Database dei dizionari e delle soluzioni.
* `Flags/`: Directory contenente le icone delle bandiere nazionali.
* `MyWordle.png`: Immagine di copertina e icona dell'app.
* `manifest.json` & `sw.js`: File necessari per il supporto Progressive Web App (PWA).

---

## 👨‍💻 Sviluppo e Dedica

Questo progetto è nato da un'idea semplice ma speciale: creare un'esperienza di gioco personalizzata per la mia ragazza, appassionata di puzzle linguistici e giochi di parole. 

L'obiettivo era superare i limiti dei classici cloni di Wordle, offrendole la possibilità di giocare nella sua lingua preferita, scegliere la lunghezza delle parole e avere un sistema di record persistente. 

Dal punto di vista tecnico, MyWordle dimostra come una logica di gioco complessa e multilingua possa essere gestita interamente lato client (Vanilla JS), garantendo un'esperienza fluida, veloce e senza interruzioni pubblicitarie.

---
*Creato con ❤️ per una giocatrice speciale e per tutti gli amanti dei puzzle linguistici.*
