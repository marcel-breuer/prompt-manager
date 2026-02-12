# Prompt Manager 🚀

Ein Tool zur Verwaltung und Veröffentlichung von ChatGPT-Prompt-Vorlagen.
Nutzer können Prompts in einer übersichtlichen UI durchsuchen, kategorisieren und direkt mit einem verlinkten GPT auf chatgpt.com/gpts testen oder den Prompt in die Zwischenablage kopieren.

## ✨ Features
- Übersichtliche Anzeige von Prompts mit Kategorien
- Direkte Verlinkung zu einem GPT für einfaches Testen
- Kopierfunktion, um Prompts schnell in die Zwischenablage zu speichern
- PostgreSQL-Datenbank zur Verwaltung der Prompts

## 📦 Installation
1. Projekt klonen
    ```bash
    git clone https://github.com/m-breuer/prompt-manager.git
    cd prompt-manager
    ```

2.	Abhängigkeiten installieren
    ```bash
    npm install
    ```

3.  Umgebungsvariablen einrichten
    Erstelle eine `.env.local` Datei im Hauptverzeichnis des Projekts und füge die Verbindungszeichenfolge für deine PostgreSQL-Datenbank hinzu. Eine `.env.example`-Datei ist als Vorlage vorhanden.
    ```bash
    cp .env.example .env.local
    ```
    Bearbeite die `.env.local`-Datei mit deinen Datenbankdaten.

4.  Datenbankmigration
    Führe das Migrationsskript aus, um die `prompts`-Tabelle in deiner Datenbank zu erstellen und die anfänglichen Daten zu laden.
    ```bash
    npm run migrate
    ```

5.	Entwicklungsserver starten
    ```bash
    npm run dev
    ```
    Danach ist die App unter http://localhost:3000 erreichbar.
