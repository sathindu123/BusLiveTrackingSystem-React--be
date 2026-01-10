# ⚙️ LankaBus Live - Backend (Node.js & Express)

Technical documentation for the data management, communication, and GPS handling backend service.

## 🏗 System Architecture
This system utilizes a hybrid approach of **REST APIs** and **WebSockets (Socket.io)** for seamless data synchronization.

## 🛠 Technologies Used
- **Server:** Node.js + Express.js
- **Real-time Engine:** Socket.io (Facilitates Driver → Backend → Passenger data relay)
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **Environment Management:** Dotenv

## 🗃️ Database Design (MongoDB)

### 🔹 Users Collection
```json
{
  busNb: string;
  username: string;
  password: string;
  telNb: number;
}
```

### 🔹 Buses Collection
```json
{
  "bus_id": "UUID",
  "number": "WP ND-4521",
  "route_id": "R138",
  "driver_id": "U001",
  "status": "online | offline"
}
```

### 🔹 Live Locations Collection
```json
{
  "bus_id": "UUID",
  "lat": 6.9271,
  "lng": 79.8612,
  "speed": 45,
  "last_updated": "Timestamp"
}
```

## 📡 API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/auth/login` | POST | User authentication |
| `/api/bus/register` | POST | Register a new bus |
| `/api/trip/start` | POST | Initiate a trip session |
| `/api/routes` | GET | Fetch all available bus routes |
| `/api/bus/locations` | GET | Retrieve all active bus locations |

## 🔁 System Flow
1. **Driver Side:** Once a trip starts, the app captures GPS coordinates via `navigator.geolocation.watchPosition` and emits updates to the server through Socket.io.
2. **Backend Side:** The server receives coordinates and immediately broadcasts them to all passengers subscribed to that specific route room.
3. **Passenger Side:** The passenger's client receives the broadcast and updates the bus marker position on the map in real-time.

## 🧮 ETA Calculation
- **Logic:** `Time = Distance / Speed`
- **Methodology:** Calculated using the Google Distance Matrix API or the Haversine Formula for point-to-point distance measurement.

## 📝 Setup Instructions
1. Initialize the project:
   ```bash
   npm init
   ```
2. Install required dependencies:
   ```bash
   npm install express mongoose socket.io cors dotenv jsonwebtoken bcrypt
   ```
3. Create a `.env` file and configure your `MONGODB_URI`, `JWT_SECRET`, and `PORT`.
4. Start the server:
   ```bash
   node index.js
