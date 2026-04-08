# 💧 Water Supply Complaint System (जल शिकायत प्रबंधन प्रणाली)

![Water Supply Complaint System Banner](https://images.unsplash.com/photo-1541888087405-eb81f5c6e869?q=80&w=2070&auto=format&fit=crop) *(Image for illustration purposes)*

> A transparent, accessible, and accountable platform for managing and resolving water-related complaints in local communities.

## 📖 Overview

The **Water Supply Complaint System** is a modern web application designed to bridge the gap between citizens and water supply authorities. It provides a seamless interface for users to report water issues (like no supply, low pressure, leaks, etc.), track their complaint status, and allows administrators to efficiently manage, assign, and resolve these issues. 

Built with React and Tailwind CSS, the application offers a responsive and user-friendly experience with bilingual support (English/Hindi) to cater to a wider demographic.

---

## ✨ Key Features

### 🧑‍💻 For Citizens (Users)
* **Multiple Submission Channels:** Users can choose to submit complaints via a detailed online form, or get instructions for IVR (Toll-free) and SMS/WhatsApp submissions.
* **Comprehensive Issue Reporting:** Report various issues like No Water, Low Pressure, Contamination, Pipeline Breaks, and Leakages with exact locations and descriptions.
* **Instant Tracking:** Upon submission, users receive a unique `Complaint ID` (e.g., *WC123ABC*).
* **Real-time Status Updates:** Track the lifecycle of a complaint from *Submitted* -> *Under Review* -> *Assigned* -> *In Progress* -> *Resolved*.
* **Bilingual UI:** Key instructions and labels are provided in both English and Hindi.

### 🛡️ For Administrators (Officials)
* **Centralized Dashboard:** A bird's-eye view of all complaints with key metrics (Total, New, In Progress, Resolved).
* **Advanced Filtering:** Filter complaints by Status and Priority levels (Low, Medium, High, Critical).
* **Complaint Management:** Update complaint statuses, set priority levels, and assign specific officials to tasks.
* **Verification System:** Officials can upload proof of work completion, including photos, geo-location, and completion notes to close a ticket.

---

## 🛠️ Tech Stack

This project is built using modern web development tools:

* **Frontend Framework:** [React 18](https://react.dev/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
* **Icons:** [Lucide React](https://lucide.dev/)
* **State Management & Storage:** React Hooks (`useState`, `useEffect`) and custom LocalStorage wrapper (`src/app/utils/storage.ts`) for browser-based persistence.

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` or `pnpm` installed.

### Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone [https://github.com/yourusername/water-supply-complaint-system.git](https://github.com/yourusername/water-supply-complaint-system.git)
   cd water-supply-complaint-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or using pnpm
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

4. **Open the app:**
   Open your browser and navigate to `http://localhost:5173`

---

## 📂 Project Structure

```text
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── AdminDashboard.tsx   # Admin interface & analytics
│   │   │   ├── SubmitComplaint.tsx  # User complaint submission form
│   │   │   ├── TrackComplaint.tsx   # Status tracking interface
│   │   │   └── ui/                  # Reusable shadcn/ui components
│   │   ├── utils/
│   │   │   └── storage.ts           # LocalStorage handler for data persistence
│   │   └── App.tsx                  # Main application entry & Tab routing
│   ├── styles/                      # Tailwind and global CSS
│   └── main.tsx                     # React DOM rendering
├── package.json
├── vite.config.ts
└── tailwind.config.js / postcss.config.mjs
```

---

## 💡 How to Use

1. **Submitting a Complaint:** Navigate to the "Submit Complaint" tab. Fill in your details, select the issue type, provide a location, and submit. Copy the generated `Complaint ID`.
2. **Tracking:** Go to the "Track Status" tab. Paste your `Complaint ID` to see a detailed timeline of your issue.
3. **Admin Actions:** Switch to the "Admin Dashboard" tab. Here you can click on any submitted complaint to review it, change its priority, assign it to a local official, and eventually mark it as "Resolved" by providing verification details.

---

## 🔮 Future Enhancements

While this version runs efficiently in the browser using LocalStorage, future iterations could include:
* **Backend Integration:** Connect to a backend database (like Supabase, Firebase, or PostgreSQL) for real data persistence across devices.
* **Authentication:** Secure the Admin Dashboard with login credentials and Role-Based Access Control (RBAC).
* **SMS/Email Gateway:** Integrate Twilio or similar services to send actual SMS updates to users when their complaint status changes.
* **Map Integration:** Add Google Maps or Mapbox to visually plot complaints on a dashboard.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
*Built with ❤️ for better community services.*
```
