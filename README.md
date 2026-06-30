# Show Me Your Prime Another Time

App web statica per diario alimentare, ricettario, profilo, progressi peso e palestra.

## Come funziona il salvataggio

Per ora l'app salva tutto in **localStorage** del browser:

- profilo
- pasti
- ricette
- peso
- palestra programmata/fatta
- target calorie e macro

Questo significa che:

- se la usi tu sul tuo telefono/computer, i dati restano lì;
- se pubblichi l'app su GitHub Pages e mandi il link a un'altra persona, quella persona non vede i tuoi dati;
- ogni browser/dispositivo ha i propri dati separati;
- cancellando dati del browser o usando modalità privata puoi perdere i dati.

Per sicurezza c'è il pulsante **Backup**: esporta un file JSON che puoi conservare. Dalla pagina **Profilo** puoi anche importare un backup JSON.

## Come pubblicarla gratis su GitHub Pages

1. Crea un repository su GitHub.
2. Carica questi file nella root del repository:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `manifest.webmanifest`
   - `README.md`
3. Vai su **Settings → Pages**.
4. In **Build and deployment**, scegli:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Dopo qualche minuto GitHub ti darà il link pubblico.

## Se un giorno vuoi account veri

Per avere registrazione/login veri e dati sincronizzati tra dispositivi serve un backend gratuito tipo:

- Supabase
- Firebase

Per ora è volutamente offline/local-first, quindi costa zero e non richiede server.
