# Report Filippi - Tissi

Il progetto ha lo scopo di rappresentare un configuratore online interattivo per un sito di e-commerce commissionato dall'azienda "ACME". L'oggetto preso in considerazione in questo lavoro sarà uno sgabello.

Ci siamo prefissati di realizzare un sito web _professionale_, facendo attenzione alla scelta dei colori e uniformandoci al design dei siti web specializzati nel campo dell'arredamento; per renderlo il più universale possibile abbiamo utilizzato l'inglese come lingua di navigazione.

Nel footer della pagina abbiamo inserito degli spazi destinati ai social per la condivisione e la promozione da parte dei possibili utenti che la visiteranno. Osservando i maggiori siti web abbiamo notato che era importante introdurre un pulsante _i_ che fornisce all'utente informazioni sul prodotto che sta visualizzando per favorirne l'eventuale acquisto.

La decisione sulla scelta del modello è ricaduta su uno sgabello che soddisfava le limitazioni inserite nella consegna (low-poly); inoltre si prestava bene a una scomposizione in più parti e ci dava la possibilità di introdurre vari materiali. 
Il modello dello sgabello è stato modificato con il programma "Blender"; la mappatura delle varie parti è stata fatta da noi. Abbiamo rimosso la mappatura di tipo "unwrapped" e abbiamo introdotto la "Cube_projection".

Di seguito illustreremo la personalizzazione che abbiamo deciso di offire ai fruitori del sito:

* Seduta: è possibile esprimere una preferenza tra due materiali (pelle e stoffa) e per ognuno si può individuare il colore più adatto   
  tra i colori proposti nella barra sottostante.

* Sottocuscino: non è personalizzabile e viene inserito di defeault. Abbiamo preso questa decisione poichè abbiamo notato che l'eventuale   scelta non avrebbe condizionato e portato modifiche di rilievo al progetto.

* Struttura: può essere in metallo, in plastica oppure in legno. Per quanto riguarda il metallo i creatori hanno deciso di non permettere   all'utente di scegliere un'eventuale personalizzazione poichè ritengono la scelta fatta coerente con il modello. Discorso diverso per   
  la plastica e il legno: per quanto riguarda la prima è possibile esprimere una preferenza sulla colorazione tra 4 colori, mentre sono disponibili due diversi tipi di legno (uno più chiaro e uno più scuro)

Si è deciso di introdurre 3 luci di scena che illuminano l'oggetto; durante la fase di progettazione esse sono state mantenute visibili, mentre abbiamo deciso di commentare la riga nella quale venivano introdotte nella scena.

ENV LIGHT ?

La cubemap, introdotta nel progetto, è stata volontariamente non resa visibile nel visualizzatore; esaminando il codice è possibile notare il commento alla riga che ne permetterebbe la visibilità. Tuttavia, con i materiali che consentono una buona riflessione, è possibile notarne la presenza.


# Metodo di lavoro 

Abbiamo deciso di mantenere lo stesso metodo di lavoro che abbiamo seguito con lo sviluppo del primo progetto; il processo di creazione dell'elaborato finale aggiornato, di giorno in giorno, si trova nel file _Journal.md_. Per una migliore gestione del lavoro abbiamo deciso di servirci anche del programma _GitKraken_.

# Presentazione della strutturazione delle cartelle

Il progetto ha avuto inizio a partire dal codice visto in classe durante gli esempi (contenuto nelle slides).

Di seguito presentiamo l'organizzazione che abbiamo scelto per le cartelle durante il progetto:

* Il file denomianato _index.html_ contiene il vertex shader, il fragment shader e il codice html usato per lo sviluppo del sito.
* La cartella _styles_ contiene il file _style.css_ che abbiamo usato per personalizzare lo stile del sito web (TOGLIAMO L'ALTRO FILE?)
* La cartella _scripts_ contiene il file _main.js_ che contiene tutte le funzioni che abbiamo implementato per permettere la personalizzazione dei materali e del (TUTTO INSOMMA)
* La cartella _models_ contiene due file: il primo è denominato _SgabelloSeparato.blend_ con il quale abbiamo modificato, mappato il modello e generato il secondo file denominato _SgabelloCompleto.obj_ utilizzato per caricare il modello.
* La cartella _textures_ contiene la cubemap uttilizzata e la cartella con tutti i materiali introdotti nel progetto. (DICIAMO COME ABBIAMO GENERATO I VARI MATERIALI? OPPURE DELLA SPECULAR MAP?)


AMBIENT occlusion per ombreggiatura?
BRDF utilizzata?

# Risultato finale

L'immagine che segue rappresenta l'elaborato finale del nostro lavoro.
