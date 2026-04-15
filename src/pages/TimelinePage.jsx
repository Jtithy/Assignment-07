import { useMemo, useState } from "react";
import callIcon from "../../assets/call.png";
import textIcon from "../../assets/text.png";
import videoIcon from "../../assets/video.png";
import { useAppContext } from "../context/AppContext";

const interactionMeta = {
  call: { icon: callIcon, label: "Call" },
  text: { icon: textIcon, label: "Text" },
  video: { icon: videoIcon, label: "Video" },
};

const typeFilters = [
  { value: "all", label: "All Types" },
  { value: "call", label: "Call" },
  { value: "text", label: "Text" },
  { value: "video", label: "Video" },
];

const sortFilters = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
];

function TimelinePage() {
  const { timeline } = useAppContext();
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTimeline = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const byFilter = timeline.filter((entry) => {
      if (filter !== "all" && entry.type !== filter) return false;

      if (!normalizedSearch) return true;

      const friendName = entry.friendName.toLowerCase();
      return friendName.includes(normalizedSearch);
    });

    return [...byFilter].sort((a, b) => {
      const first = new Date(a.createdAt).getTime();
      const second = new Date(b.createdAt).getTime();

      return sortOrder === "newest" ? second - first : first - second;
    });
  }, [timeline, filter, searchTerm, sortOrder]);

  return (
    <section className="page-section">
      <div className="page-title-row timeline-shell">
        <h2 className="timeline-title">Timeline</h2>

        <div className="timeline-controls">
          <input
            className="input input-bordered input-sm timeline-search-input"
            type="text"
            placeholder="Search friend name"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            aria-label="Search timeline"
          />

          <div className="timeline-filter-group" role="group" aria-label="Filter timeline by type">
            {typeFilters.map((item) => (
              <button
                key={item.value}
                type="button"
                className={filter === item.value ? "timeline-chip timeline-chip-active" : "timeline-chip"}
                onClick={() => setFilter(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="timeline-sort-group" role="group" aria-label="Sort timeline">
            {sortFilters.map((item) => (
              <button
                key={item.value}
                type="button"
                className={sortOrder === item.value ? "timeline-chip timeline-chip-active" : "timeline-chip"}
                onClick={() => setSortOrder(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="timeline-list">
        {filteredTimeline.map((entry) => {
          const meta = interactionMeta[entry.type];

          return (
            <article className="timeline-row" key={entry.id}>
              <div className="timeline-row-icon">
                <img src={meta.icon} alt={meta.label} />
              </div>

              <div className="timeline-row-content">
                <h3>
                  {meta.label} with {entry.friendName}
                </h3>
                <p>
                  {new Date(entry.createdAt).toLocaleDateString(undefined, {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </article>
          );
        })}

        {!filteredTimeline.length ? (
          <article className="timeline-row timeline-empty-row">
            <p>No timeline entries found for your current filters.</p>
          </article>
        ) : null}
      </div>
    </section>
  );
}

export default TimelinePage;
