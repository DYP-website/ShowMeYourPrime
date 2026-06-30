# Show Me Your Prime Another Time

App Next.js gratuita per diario alimentare, ricettario, profilo, calendario palestra e progressi.

## Gratis: come funziona
- GitHub: repository codice gratis.
- Vercel Hobby: hosting gratis per uso personale.
- Supabase Free: database/login gratis se in futuro vuoi sincronizzare cloud.
- Ora i dati sono salvati nel browser con localStorage, quindi non paghi nulla e non serve configurare backend.

## Caricamento su GitHub
1. Estrai questo ZIP.
2. Carica tutti i file nella repository GitHub.
3. Vai su Vercel.com, login con GitHub.
4. Importa la repository.
5. Deploy.

## Avvio locale
```bash
npm install
npm run dev
```

## Salvataggio dati
Versione attuale: localStorage del browser.
- Se apri dal tuo Mac, salva sul Mac.
- Se apri da iPhone, salva su iPhone.
- Un'altra persona con lo stesso link non vede i tuoi dati.

Per passare al cloud multi-dispositivo: crea un progetto Supabase Free, copia `.env.example` in `.env.local`, incolla URL/anon key, poi usa `supabase/schema.sql`.
