# React Native Task Manager App

A simple and elegant task manager app built with **React Native**, **Expo**, and **TypeScript**.

It allows users to:
- ✅ Add new tasks
- ✅ Mark tasks as complete
- ✅ Delete tasks with animated feedback
- ✅ View tasks in a clean list
- ✅ Enjoy light/dark mode support and responsive UI

---

## ✨ Features

- **Add Tasks** using input + Enter key or button
- **Complete Tasks** with checkbox + bounce animation
- **Delete Tasks** with a shrink/fade animation and toast confirmation
- **Responsive UI** that adapts to light/dark themes
- **Keyboard dismiss** after task entry


## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/shivamAmrutia/simple_taskManager.git
cd task-manager-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the App
```bash
npx expo start
```

Open with the **Expo Go app** on mobile or an emulator.

---

## 📁 Project Structure

```
.
├── app/
│   └── index.tsx            # Main app screen
├── components/
│   └── TaskItem.tsx         # Task item with animations + toast
├── types/
│   └── index.ts             # Task type
├── theme/
│   └── index.ts             # Light/dark theme config
├── assets/                  # (Optional) Static assets
├── package.json
├── app.json
└── README.md
```

---

## 🧩 Tech Stack

- **React Native (Expo)**
- **TypeScript**
- **React Hooks (`useState`, `useEffect`, `useRef`)**
- **Animated API**
- **react-native-toast-message**
- **@expo/vector-icons**

---

## 🧪 Third-Party Libraries

| Library                   | Purpose                             |
|---------------------------|-------------------------------------|
| `@expo/vector-icons`      | Icons (checkbox, trash)             |
| `react-native-toast-message` | Toast on task deletion          |

---



