# Statistics UI

Event-driven NestJs Backend based on Websocket(via Socket.io Library)for Statistics Project

‼️**This backend must run together with Statistics Frontend(NextJs).Repo name -> statistics_ui.**

## 📦 Installation

```bash
npm install
```

---

## 🔐 Environment Variables (Required)

Create a `.env` file in the backend root directory.  
 Use `.env.example` as a reference.

```env
PORT=3000
FRONT_END_PORT=2000
```

### Variables

- **PORT**  
  Backend server port.  
  You may choose any available port.

- **FRONT_END_PORT**  
  Frontend port used for WebSocket CORS configuration in Events Gateway.  
  Must match the port where the frontend is running.

> For sample values, please check the `.env.example` file.

⚠️ Make sure FRONT_END_PORT matches the frontend port defined in NEXT_PUBLIC_API_URL.

## 🔁 Real-Time Event Pipeline

A backend service generates a random number between **1 and 10** at a fixed **5-second interval**.

### ⚙ Number Generation Service

- Produces a random number between 1 and 10 every 5 seconds.
- After each generation, publishes the event:`numbers.tick`

### 🎛 Subscription Control

- The service does **not** generate data by default.
- Data flow is controlled via `subscribe` and `unsubscribe` events coming from the client.

- When the client emits **subscribe**:
  - The service starts generating numbers.
  - Each generated number triggers `numbers.tick`.

- When the client emits **unsubscribe**:
  - Number generation stops.
  - No further events are produced.

### 📡 Event Gateway

- Listens to the `numbers.tick` event.
- Receives the generated number from the service.
- Forwards the value to connected clients using WebSocket with the event:`server:stats`

### 🌐 Frontend

- Listens to the `server:stats` event.
- Continuously receives real-time statistics from the backend.
- Updates the UI accordingly.

### ✅ Result

- Fully event-driven data pipeline.
- Backend and frontend are loosely coupled.
- Real-time stream is efficient and scalable.

## 🛠 Tech Stack

- NestJS
- TypeScript
- Socket.io
- Event-based Architecture (Gateway + Services)
