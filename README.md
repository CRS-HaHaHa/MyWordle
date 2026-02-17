# 🧩 MyWordle - Multilingua

Benvenuto in **MyWordle**, un clone moderno e personalizzabile del famoso gioco di parole, sviluppato interamente in HTML, CSS e JavaScript. 

Il progetto è nato per offrire una sfida dinamica, permettendo di giocare in diverse lingue e con parole di varia lunghezza.

---

## ✨ Caratteristiche Principali

* **🌍 Multilingua:** Supporto completo per Italiano, Inglese, Francese e Spagnolo.
* **📏 Difficoltà Variabile:** Scegli tra parole di 5, 6 o 7 lettere.
* **🔥 Sistema di Streak:** Il gioco tiene traccia delle tue vittorie consecutive e del tuo record migliore per ogni categoria (salvati localmente nel browser).
* **📱 Design Responsive:** Interfaccia ottimizzata per PC e dispositivi mobile con tastiera virtuale integrata.
* **🎨 Feedback Visivo:** Colori classici (Verde, Giallo, Grigio) e sfondi dinamici basati sulla lingua scelta.

---

## 🚀 Come Giocare

1.  **Requisiti:** Non serve installare nulla! Basta un browser web (Chrome, Firefox, Safari, ecc.).
2.  **Apertura:** Vai al sito `https://crs-hahaha.github.io/MyWordle/` per iniziare subito a giocare.
3.  **Regole:** * Hai un numero limitato di tentativi (lunghezza parola + 1).
    * **Verde:** La lettera è corretta e nel posto giusto.
    * **Giallo:** La lettera è presente nella parola ma nel posto sbagliato.
    * **Grigio:** La lettera non è presente nella parola.

---

## 🛠️ Tecnologie Utilizzate

* **HTML5:** Struttura del gioco.
* **CSS3:** Layout moderno con Flexbox, variabili CSS e animazioni per i badge.
* **JavaScript (Vanilla):** Tutta la logica di gioco, gestione del dizionario e salvataggio dei progressi tramite `localStorage`.

---

## 📁 Struttura del Progetto

* `index.html`: Contiene la struttura del gioco, gli stili CSS e la logica JavaScript principale.
* `words_data.js`: Il database contenente i dizionari e le liste di soluzioni per le diverse combinazioni di lingua e lunghezza.
