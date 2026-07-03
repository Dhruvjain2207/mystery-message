# Mystery Message 💬

An anonymous messaging platform where anyone can send honest feedback without revealing their identity.

🌐 Live Demo: https://mystery-message-sandy.vercel.app

---

## ✨ Features

- 🔐 Secure Authentication
- 📧 Email OTP Verification
- 👤 Unique Public Profile (`/u/username`)
- 💬 Anonymous Message Sending
- 🤖 AI-Powered Message Suggestions
- 📋 Copy Shareable Profile Link
- 📤 Native Share Support (Mobile & Browser)
- 📥 Dashboard to View Received Messages
- 🗑️ Delete Messages
- 🔄 Accept/Reject Incoming Messages
- 📱 Fully Responsive Design

---

## 🛠️ Tech Stack

### Frontend
- Next.js 16 (App Router)
- React
- TypeScript
- Tailwind CSS
- Motion
- Lucide React

### Backend
- Next.js API Routes
- MongoDB
- Mongoose
- Auth.js (NextAuth v5)

### Authentication
- Credentials Authentication
- Email OTP Verification
- Secure Session Management

### AI
- Groq API
- Llama Model

### Email
- Resend

### Deployment
- Vercel

---

## 📂 Project Structure

```
app/
├── api/
├── dashboard/
├── login/
├── register/
├── verify/
├── u/
│   └── [username]/
├── components/
├── lib/
├── model/
└── helpers/
```

---

## ⚙️ Environment Variables

Create a `.env.local` file and add:

```env
MONGODB_URI=

AUTH_SECRET=

RESEND_API_KEY=

EMAIL_FROM=

GROQ_API_KEY=

NEXT_PUBLIC_APP_URL=
```

---

## 🚀 Installation

Clone the repository

```bash
git clone https://github.com/Dhruvjain2207/mystery-message.git
```

Move into the project

```bash
cd mystery-message
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

## 📸 Screenshots

> Add screenshots here after deployment.

---

## 🔮 Future Improvements

- Message Reactions
- User Profile Customization
- Dark/Light Theme
- Image Attachments
- Real-time Notifications
- Analytics Dashboard
- Message Search
- Admin Panel

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push your branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developer

**Dhruv Jain**

GitHub: https://github.com/Dhruvjain2207

LinkedIn: *(Add your LinkedIn profile link here)*

---

⭐ If you found this project useful, don't forget to star the repository.