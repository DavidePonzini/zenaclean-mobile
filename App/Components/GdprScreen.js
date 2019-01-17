import React, { Component } from 'react'
import { Text } from 'native-base'
import { View, StyleSheet, ScrollView } from 'react-native'
import Secrets from 'react-native-config'

export default class GdprScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>
            Informativa sulla privacy
          </Text>
          <Text style={styles.text}>

            Gentile Utente,
          </Text>
          <Text style={styles.text}>
            ai sensi del Regolamento (UE) 2016/679 in materia di protezione dei dati personali (in seguito, “Regolamento”) il trattamento delle informazioni che La riguardano sarà improntato ai principi di correttezza, liceità e trasparenza e di tutela della Sua riservatezza e dei Suoi diritti.

            Ai sensi degli artt. 12 e ss. del Regolamento, Le forniamo le seguenti informazioni:
            I dati da Lei spontaneamente forniti verranno trattati, nei limiti della normativa sulla privacy, per le seguenti finalità: erogazione di servizi specialistici e informative sui contenuti attivabili e presenti sulla piattaforma web {Secrets.URL}
            In conformità a quanto sancito dall’art. 5 del Regolamento, i dati personali oggetto di trattamento sono:
            trattati in modo lecito, corretto e trasparente nei confronti dell’Interessato;
            raccolti e registrati per finalità determinate, esplicite e legittime, e successivamente trattati in termini compatibili con tali finalità;
            adeguati, pertinenti e limitati a quanto necessario rispetto alle finalità per le quali sono trattati;
            esatti e se necessario, aggiornati;
            trattati in maniera da garantire un adeguato sicurezza;
            conservati in una forma che consenta l’identificazione dell’Interessato per un periodo di tempo non superiore al conseguimento delle finalità per le quali sono trattati.
            I dati personali saranno trattati con strumenti automatizzati e non automatizzati; la conservazione in forma elettronica dei dati personali avviene in server sicuri posti in aree ad accesso controllato. Specifiche misure di sicurezza sono osservate per prevenire la perdita dei dati, usi illeciti o non corretti ed accessi non autorizzati.
            Il conferimento dei dati relativi a nome, cognome, indirizzo di posta elettronica e recapito telefonico è obbligatorio, al fine di poter attivare i servizi della piattaforma web {Secrets.URL} da Lei richiesti (consulenza e/o assistenza o le prestazioni da Lei richieste e l'eventuale rifiuto a fornire tali dati potrebbe comportare la mancata o parziale esecuzione di tali servizi); inoltre il conferimento di tali dati ha lo scopo di permettere a Fondazione Andrea Fasciglione di informarLa ed aggiornarLa sulle attività e servizi presenti sulla piattaforma {Secrets.URL}
            I dati saranno comunicati, previo suo consenso, agli altri soggetti gestori della piattaforma (ad esempio Università degli Studi di Genova) {Secrets.URL} per le medesime finalità di cui sopra.
            Il titolare del trattamento è Andrea Fasciglione con sede in Genova, Via Dodecaneso 35. Responsabile del trattamento è il Direttore Operativo di Fondazione Andrea Fasciglione, contattabile ai seguenti recapiti: mail andrea@fasciglione.it
            Il trattamento dei dati, che verranno conservati per il periodo necessario a dar seguito alla richiesta e comunque per un periodo non superiore a 1 anno dalla data dell’ultimo accesso, ha luogo presso la predetta sede nonché presso le altre sedi di Fondazione Ricerca e Imprenditorialità dislocate sul territorio e sarà curato solo dal personale ad esso incaricato.
            Ai sensi della normativa applicabile in materia di protezione dei dati personali ed entro i limiti previsti dalla stessa, l’interessato ha il diritto di:
            accedere ai dati personali e ottenere informazioni relative al loro trattamento;
            chiedere di rettificare i dati personali che lo riguardano qualora risultino inesatti;
            ottenere la cancellazione dei propri dati personali in determinate circostanze previste dalla legge;
            opporsi al trattamento e di ottenere la limitazione del trattamento dei suoi dati personali ai sensi di legge;
            ottenere la portabilità dei dati personali (vale a dire ricevere alcuni dati personali in un formato strutturato, di uso comune e leggibile a livello informatico – tale diritto alla “portabilità” si applica solo ai dati personali forniti dall’interessato e può essere soggetto ad alcune restrizioni, così come previsto dalla normativa applicabile in materia di protezione dei dati personali);
            revocare il consenso prestato in qualsiasi momento, senza che ciò pregiudichi la liceità del trattamento basta sul consenso prestato prima della revoca;
            presentare un reclamo presso l’Autorità Garante per la protezione dei dati personali;
            essere informato delle rettifiche e delle cancellazioni dei dati personali, nonché delle limitazioni del trattamento
            Per ulteriori chiarimenti in merito alle finalità perseguite da Andrea Fasciglione e per avere altre informazioni circa l'organizzazione della fondazione La invitiamo a visitare la pagina web del sito {Secrets.URL} o a contattare la Fondazione all'indirizzo mail andrea@fasciglione.it.
            Per avere ulteriori informazioni in ordine ai suoi diritti sulla privacy La invitiamo a visitare il sito web dell'Autorità Garante per la protezione dei dati personali all'indirizzo www.garanteprivacy.it o a contattare la Fondazione all'indirizzo mail andrea@fasciglione.it.
          </Text>
          <Text style={styles.title}>
            Informativa sull'utilizzo dei cookie
          </Text>
          <Text style={styles.text}>
              Cookie
            Tipi di cookie
            Il Titolare fornisce di seguito alcune indicazioni di carattere generale sui cookie, propedeutiche per la comprensione dell’informativa estesa in materia qui riportata.

            I cookie sono stringhe di testo di piccole dimensioni che i siti visitati dall'utente inviano al suo terminale (solitamente al browser), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla successiva visita del medesimo utente.

            Nel corso della navigazione su un sito, l'utente può ricevere sul suo terminale anche cookie che vengono inviati da siti o da web server diversi (c.d. "terze parti"), sui quali possono risiedere alcuni elementi (quali, ad esempio, immagini, mappe, suoni, specifici link a pagine di altri domini) presenti sul sito che lo stesso sta visitando.

            I cookie sono usati per differenti finalità: esecuzione di autenticazioni informatiche, monitoraggio di sessioni, ecc.

            Il Garante per la protezione dei dati personali ha individuato due macro-categorie: cookie "tecnici" e cookie "di profilazione". Questa piattaforma utilizza solo cookies tecnici.

            I cookie tecnici sono quelli utilizzati al solo fine di "effettuare la trasmissione di una comunicazione su una rete di comunicazione elettronica, o nella misura strettamente necessaria al fornitore di un servizio della società dell'informazione esplicitamente richiesto dall'abbonato o dall'utente a erogare tale servizio". Essi non vengono utilizzati per scopi ulteriori e sono normalmente installati direttamente dal titolare o gestore del sito web.

            Gli unici cookies tecnici utilizzati sono cookie di navigazione o di sessione, che garantiscono la normale navigazione e fruizione del sito web (permettendo, ad esempio, di autenticarsi per accedere ad aree riservate).

            Gestione dei cookie
            E’ prevista la possibilità per l'utente di manifestare le proprie opzioni in merito all'uso dei cookie da parte del sito anche attraverso le impostazioni del browser.

            Attenzione: la disabilitazione totale o parziale dei cookie potrebbe compromettere in tutto o in parte l'utilizzo di alcune funzionalità del sito. Se l’utente utilizza più device, si rammenta di assicurarsi che ogni browser sia impostato in modo da soddisfare le proprie preferenze.
          </Text>
          <Text style={styles.title}>
            Diritti degli interessati
          </Text>
          <Text style={styles.text}>
            Per quanto attiene ai cookie si rinvia a quanto indicato sopra. Si rammenta la possibilità per l'utente - sopra indicata - di manifestare le proprie opzioni in merito all'uso dei cookie da parte del sito anche attraverso le impostazioni del browser.
          </Text>
          <Text style={styles.title}>
            Modifiche alla presente privacy policy e informativa estesa cookie e rinvio
          </Text>
          <Text style={styles.text}>
            Il Titolare può modificare la presente in qualsiasi momento, senza avviso. Si invita l’utente a consultare sempre l’informativa aggiornata. Per quanto occorra si rinvia alle note legali.
          </Text>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 20
  }
})
