# SnapShopr

![SnapShopr Logo](./assets/logo.png)

> A hyper-local MERN‑stack marketplace with real‑time chat and seamless deployment on Vercel.

---

## 🔗 Live Demo

Explore it live at: [https://snapshopr.vercel.app](https://snapshopr.vercel.app)

## 🚀 Features

* **User Authentication** via JWT (signup, login, logout)
* **Product Listings** with create, read, update, delete (CRUD) operations
* **Real‑Time Chat** between buyers and sellers powered by Socket.IO
* **Search & Filters** to quickly find items
* **Responsive UI** built with React and styled-components
* **Deployment** on Vercel with CI/CD pipeline
* **RESTful API** with Node.js, Express.js, and MongoDB

## 🛠️ Tech Stack

| Frontend          | Backend    | Database | DevOps         |
| ----------------- | ---------- | -------- | -------------- |
| React             | Node.js    | MongoDB  | Vercel         |
| React Router      | Express.js | Mongoose | GitHub Actions |
| styled-components | Socket.IO  |          |                |

## 📂 Project Structure

```
snapshopr/
├─ client/               # React frontend
│  ├─ src/
│  ├─ public/
│  └─ package.json
├─ server/               # Node.js backend
│  ├─ src/
│  ├─ .env.example
│  └─ package.json
├─ .gitignore
├─ README.md
└─ LICENSE
```

## ⚙️ Installation & Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/YourUsername/SnapShopr.git
   cd SnapShopr
   ```

2. **Client Setup**

   ```bash
   cd client
   npm install
   npm start
   ```

3. **Server Setup**

   ```bash
   cd server
   npm install
   cp .env.example .env    # configure your environment variables
   npm run dev             # starts backend on http://localhost:5000
   ```

4. **Environment Variables**

   * `MONGO_URI`: Your MongoDB connection string
   * `JWT_SECRET`: Secret key for JWT signing
   * `PORT`: (optional) Backend port (default: 5000)

## 📸 Screenshots

### Home & Product List

![Home Screenshot](./assets/home.png)

### Real‑Time Chat

![Chat Screenshot](./assets/chat.png)

## 🧪 Testing

*Add tests here if implemented.*

## 🤝 Contributing

1. Fork the repository
2. Create your branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

## 📞 Contact

* **Author**: Ayaan Shoaib
* **GitHub**: \Ayaan345\([https://github](https://github.com/Ayaan345)

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
