import { createContext, useContext, useMemo, useState } from "react";
import friends from "../data/friends.json";

const AppContext = createContext(null);

const TIMELINE_STORAGE_KEY = "keenkeeper.timeline";

const seedTimeline = [
  { id: "t1", type: "call", friendName: "David Kim", createdAt: "2026-04-03T09:30:00Z" },
  { id: "t2", type: "text", friendName: "Emma Wilson", createdAt: "2026-04-08T15:20:00Z" },
  { id: "t3", type: "video", friendName: "Lisa Nakamura", createdAt: "2026-04-11T19:10:00Z" },
];

function getStoredTimeline() {
  const raw = localStorage.getItem(TIMELINE_STORAGE_KEY);
  if (!raw) return seedTimeline;

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : seedTimeline;
  } catch {
    return seedTimeline;
  }
}

export function AppProvider({ children }) {
  const [timeline, setTimeline] = useState(getStoredTimeline);
  const [toasts, setToasts] = useState([]);

  const pushToast = (message) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 2300);
  };

  const addInteraction = (type, friendName) => {
    const entry = {
      id: crypto.randomUUID(),
      type,
      friendName,
      createdAt: new Date().toISOString(),
    };

    setTimeline((prev) => {
      const updated = [entry, ...prev];
      localStorage.setItem(TIMELINE_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    const actionLabel = type[0].toUpperCase() + type.slice(1);
    pushToast(`${actionLabel} with ${friendName} added to timeline`);
  };

  const summary = useMemo(() => {
    const overdue = friends.filter((f) => f.status === "overdue").length;
    const onTrack = friends.filter((f) => f.status === "on-track").length;
    const almostDue = friends.filter((f) => f.status === "almost due").length;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const interactionsThisMonth = timeline.filter((item) => {
      const date = new Date(item.createdAt);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }).length;

    return {
      totalFriends: friends.length,
      onTrack,
      needAttention: overdue + almostDue,
      interactionsThisMonth,
    };
  }, [timeline]);

  const chartData = useMemo(() => {
    const count = { call: 0, text: 0, video: 0 };

    timeline.forEach((item) => {
      count[item.type] += 1;
    });

    return [
      { name: "Call", value: count.call, color: "#1e5631" },
      { name: "Text", value: count.text, color: "#f59f00" },
      { name: "Video", value: count.video, color: "#d6336c" },
    ];
  }, [timeline]);

  return (
    <AppContext.Provider
      value={{
        friends,
        timeline,
        toasts,
        summary,
        chartData,
        addInteraction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return context;
}
