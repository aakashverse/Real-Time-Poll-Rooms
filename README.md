# Real-Time Poll Rooms

A full-stack web application that allows users to create polls, share them via a link, and collect votes with real-time result updates.

## Live Demo

🔗 [Add your deployed URL here]

---

## Features

* Create polls with multiple options
* Shareable poll links
* Real-time vote updates using WebSockets
* Persistent storage with MongoDB
* Duplicate vote protection
* Responsive and simple UI

---

## Tech Stack

**Frontend**

* React
* Tailwind CSS
* Socket.io client

**Backend**

* Node.js
* Express
* Socket.io
* MongoDB

---

## Fairness / Anti-Abuse Mechanisms

### 1. Browser Vote Lock

Votes are stored in localStorage to prevent multiple votes from the same browser session.

### 2. IP-Based Duplicate Prevention

Each vote is tied to the user's IP address and stored in the database to block repeat voting.

### 3. Rate Limiting

Basic rate limiting prevents rapid spam voting attempts.

---

## Edge Cases Handled

* Invalid poll ID
* Empty poll options
* Duplicate voting attempts
* Simultaneous voting conflicts
* Socket disconnect/reconnect
* Page refresh persistence

---

## Known Limitations

* Users on shared networks may be affected by IP blocking
* VPN users can bypass IP checks
* localStorage can be cleared by users

Future improvements could include authentication and device fingerprinting.

---

## Setup Instructions

### Backend

```
cd server
npm install
npm run dev
```

### Frontend

```
cd client
npm install
npm run dev
```

---

## Future Improvements

* User authentication
* Poll expiration timers
* Analytics dashboard
* QR code sharing
* Enhanced UI animations

---

## Author

AKASH YADAV
