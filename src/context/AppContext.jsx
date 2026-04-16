import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext(null);

const TIMELINE_STORAGE_KEY = "keenkeeper.timeline";

function sortByNewest(a, b) {
  return new Date(b.createdAt) - new Date(a.createdAt);
}

function isLegacySeedEntry(entry) {
  return typeof entry?.id === "string" && /^t\d+$/.test(entry.id);
}

function getStoredTimeline() {
  const raw = localStorage.getItem(TIMELINE_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Remove old seeded data so timeline only reflects user actions.
    return parsed.filter((entry) => !isLegacySeedEntry(entry)).sort(sortByNewest);
  } catch {
    return [];
  }
}

export function AppProvider({ children }) {
  const [friends, setFriends] = useState([]);
  const [isFriendsLoading, setIsFriendsLoading] = useState(true);
  const [timeline, setTimeline] = useState(getStoredTimeline);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    let isActive = true;
    let timerId;

    async function loadFriends() {
      try {
        const module = await import("../data/friends.json");
        const loadedFriends = module.default ?? [];

        timerId = setTimeout(() => {
          if (!isActive) return;
          setFriends(loadedFriends);
          setIsFriendsLoading(false);
        }, 550);
      } catch {
        if (!isActive) return;
        setFriends([]);
        setIsFriendsLoading(false);
      }
    }

    loadFriends();

    return () => {
      isActive = false;
      if (timerId) clearTimeout(timerId);
    };
  }, []);

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
  }, [friends, timeline]);

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
        isFriendsLoading,
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
