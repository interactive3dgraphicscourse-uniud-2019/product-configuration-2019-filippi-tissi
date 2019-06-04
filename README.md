# Report Filippi - Tissi

Il progetto ha lo scopo di rappresentare un configuratore online interattivo per un sito di e-commerce commissionato dalla società "ACME" dopo un'attenta valutazione, l'oggetto su cui è ricaduta la nostra scelta è stato uno sgabello.
Andando nel dettaglio, ci siamo prefissati di realizzare un sito web _professionale_, facendo attenzione alla scelta dei colori e uniformandoci al design dei siti web specializzati nel campo dell'arredamento; per renderlo più universale possibile abbiamo utilizzato l'inglese come lingua di navigazione.
Nel footer della pagina abbiamo inserito degli spazi destinati ai social per la condivisione e la promozione della pagina da parte dei possibili clienti che la visiteranno. Osservando i maggiori siti web abbiamo notato che era importante introdurre un pulsante _i_ che fornisce all'utente informazioni sul prodotto che sta visualizzando per favorirne l'eventuale acquisto.

La decisione sulla scelta del modello è ricaduta su uno sgabello in quanto soddisfava le limitazioni inserite nella consegna (low-poly), si prestava bene a una scomposizione in più parti e ci dava la possibilità di introdurre vari materiali. 
Il modello dello sgabello è stato modificato con il programma "Blender"; la mappatura delle varie parti è stata fatta da noi. Abbiamo rimosso la mappatura di tipo "unwrapped" e abbiamo introdotto la "Cube_projection".

Di seguito illustreremo la personalizzazione che abbiamo deciso di offire ai fruitori del sito:

* Seduta: è possibile esprimere una preferenza tra due materiali (pelle e stoffa) e per ognuno si può individuare il colore più adatto   
  tra i colori proposti nella barra sottostante.

* Sottocuscino: non è personalizzabile e viene inserito di defeault. Abbiamo preso questa decisione poichè abbiamo notato che l'eventuale   scelta non avrebbe condizionato e portato modifiche di rilievo al progetto.

* Struttura: può essere in metallo, in plastica oppure in legno. Per quanto riguarda il metallo i creatori hanno deciso di non permettere   all'utente di scegliere un'eventuale personalizzazione poichè ritengono la scelta fatta coerente con il modello. Discorso diverso per   
  la plastica e il legno: per quanto riguarda la prima è possibile esprimere una preferenza sulla colorazione tra 4 colori, mentre sono disponibili due diversi tipi di legno (uno più chiaro e uno più scuro)

Si è deciso di introdurre 3 luci di scena che illuminano l'oggetto; durante la fase di progettazione esse sono state mantenute visibili, mentre abbiamo deciso di commentare la riga nella quale venivano introdotte nella scena.

ENV LIGHT ?

La cubemap introdotta nel progetto è stata volontariamente non resa visibile nel visualizzatore; osservando il codice è possibile notare il commento alla riga di codice che ne permetterebbe la visibilità. Tuttavia, con i materiali che consentono una buona riflessione, è possibile percepire alcune sfumature modificando la posizione del modello.