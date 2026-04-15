import { useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext";

const interactionIcon = {
  call: "📞",
  text: "💬",
  video: "🎥",
};

function TimelinePage() {
  const { timeline } = useAppContext();
  const [filter, setFilter] = useState("all");

  const filteredTimeline = useMemo(() => {
    if (filter === "all") return timeline;
    return timeline.filter((entry) => entry.type === filter);
  }, [timeline, filter]);

  return (
    <section className="page-section">
      <div className="page-title-row">
        <h2>Timeline</h2>
      </div>

      <div className="filter-row">
        {["all", "call", "text", "video"].map((item) => (
          <button
            key={item}
            type="button"
            className={item === filter ? "chip chip-active" : "chip"}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="timeline-list">
        {filteredTimeline.map((entry) => (
          <article className="timeline-item" key={entry.id}>
            <div className="timeline-icon">{interactionIcon[entry.type]}</div>
            <div>
              <h3>
                {entry.type[0].toUpperCase() + entry.type.slice(1)} with {entry.friendName}
              </h3>
              <p>{new Date(entry.createdAt).toLocaleString()}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TimelinePage;
