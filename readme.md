Progetto Tecnologie Web
----

### Funzionalità

- login / logout necessario per accedere al sito e gestione delle sessioni
- registrazione di nuovi utenti
- filtri per interrogare il database
- validazione input utente sia lato client che lato server
- protezione contro attacchi XSS e HTML/SQL Injection

### User experience

- Loader per ogni azione in background
- Messaggi di feedback (non utilizzare pop-up!)
- Animazione interattiva all'utente (ad esempio: drag & drop, playlist virtuale, un giochino, etc.)
- Chiaro e facile da usare magari con layout flessibile / responsive (schema a due / tre colonne)

Analisi di requisiti
----

### Tema del sito

Consultazione delle news, mappe ed orari delle principali compagnie di trasporti pubblici presenti a Catania.
Possibilità di registrarsi al sito per gestire le prorie linee preferite e condividere i contenuti con gli amici tramite i principali social network.
Una delle funzionalità principali deve essere quella di visualizzare un conto alla rovescia del prossimo autobus passante dalla fermata
di proprio interesse più vicina.
Da valutare la possibilità di visualizzare la mappa con le linee e gli autobus che stanno per arrivare alla fermata.

### Sezioni principali

- Homepage: una sorta di dashboard con mappa delle fermate più vicine, ultime news e conto alla rovescia dai bus dalla tua fermata preferita più vicina.
- Avvisi: ultime news in ordine cronologico descrescente
- Lineei: permette di selezionare una linea e vederne le fermate, il percorso e gli orari
- Profilo: dati del profilo e linee preferite

### Schema di navigazione

Il sito prevede un menu in cima uguale per tutte le pagine, in modo che tutte le pagine siano sempre raggiungibili.
Subito dopo il click deve comparire una barra di progresso indeterminato che scomparirà al termine dell'operazione eseguita. 




INTERAZIONE / ANIMAZIONE: tipo giochino / drag & drop, etc...