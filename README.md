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

3.  Docker und Umgebungsvariablen einrichten
    Dieses Projekt verwendet Docker für die Bereitstellung der Anwendung und der PostgreSQL-Datenbank (Version 17).
    Erstelle eine `.env` Datei im Hauptverzeichnis des Projekts, indem du die `.env.example`-Datei als Vorlage verwendest.
    ```bash
    cp .env.example .env
    ```
    Bearbeite die `.env`-Datei mit deinen Datenbankdaten. Setze `POSTGRES_HOST` auf `postgres` für die Docker-Umgebung.

4.	Entwicklungsserver und Datenbank starten
    Für die lokale Entwicklung, starte die Dienste mit dem `start-dev.sh` Skript:
    ```bash
    sh start-dev.sh
    ```
    Für die Produktion kannst du das `start-prod.sh` Skript verwenden.
    Danach ist die App unter http://localhost:3000 erreichbar.
