# ORBITALEYE

A full‑stack web application that visualises NASA data and near‑earth objects in real time.

* **Backend:** Node.js + Express + TypeScript 
* **Frontend:** React + Vite + TypeScript

---

## Prerequisites

 Node.js ≥ 18.x  
 npm     ≥ 9.x   

> 

## Environment Variables

### 1. Backend (`backend/.env`)

Create a file called `.env` inside the **backend** folder and add:

```dotenv
PORT=5000
APIKEY=<YOUR_NASA_API_KEY>
```


### 2. Frontend (`frontend/.env`)

Create a file called `.env` inside the **frontend** folder and add:

```dotenv
VITE_MSURI=http://localhost:5000
```
## Getting Started

### Backend (Express API)

```bash
cd backend
npm install   
npm run dev

# Server is now running on http://localhost:5000
```

### Frontend (React UI)

```bash
cd frontend
npm install   
npm run dev

# The app is now running on http://localhost:5173
```

---

## Usage

1. Make sure **both** servers are running.
2. Open `http://localhost:5173` in your favourite browser.

> **Browser recommendation:** For the smoothest WebGL visualisation, we recommend Brave, Firefox, Edge, or Safari. 

## LiveURL
**[OrbitalEye](https://orbital-eye-1z9n.vercel.app/)**



