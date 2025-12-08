# 🗡️ Daggerheart Campaign Vault

A full-stack MERN application designed as a comprehensive companion for the Daggerheart TTRPG. This tool bridges the gap between a reference wiki and a campaign management suite, offering distinct tools for Game Masters (GMs) and Players.

## 🚀 Features

### 🛡️ For Game Masters
* **Campaign Dashboard:** Create and manage multiple campaigns.
* **GM Tools:** Track "Fear" currency and manage private session notes.
* **Interactive Calendar:** A custom-built calendar system to log session events chronologically.
* **Campaign Bestiary:** Save monsters from the global compendium directly to specific campaigns for quick access.

### ⚔️ For Players
* **Hero Tools:** Track "Hope" currency and view shared campaign lore.
* **Wiki & Compendium:** Browse detailed lore for Ancestries and Classes with a visual "Character Select" interface.
* **Reference Guide:** Full searchable bestiary with stats, tier filters, and damage thresholds.

### 🔐 Security & UX
* **Role-Based Access:** UI adapts based on user role (GM vs. Player).
* **Secure Auth:** JWT-based authentication with bcrypt password hashing.
* **Modern UI:** Material UI v6 with a custom "Daggerheart Anvil" dark theme (Purple/Gold aesthetic).

## 🛠️ Tech Stack

* **Frontend:** React, Vite, Material UI (MUI), React Big Calendar, Axios
* **Backend:** Node.js, Express
* **Database:** MongoDB (Mongoose)
* **Authentication:** JSON Web Tokens (JWT)

## ⚙️ Getting Started Locally

### 1. Clone the Repository
```bash
git clone <YOUR_REPO_URL_HERE>
cd daggerheart-vault