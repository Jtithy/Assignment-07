import { Navigate, useParams } from "react-router-dom";
import callIcon from "../../assets/call.png";
import textIcon from "../../assets/text.png";
import videoIcon from "../../assets/video.png";
import { useAppContext } from "../context/AppContext";

const statusLabelClass = {
  overdue: "status-pill status-overdue",
  "almost due": "status-pill status-almost-due",
  "on-track": "status-pill status-on-track",
};

function formatStatus(status) {
  return status
    .split(" ")
    .map((word) =>
      word
        .split("-")
        .map((part) => part[0].toUpperCase() + part.slice(1))
        .join("-")
    )
    .join(" ");
}

function FriendDetailsPage() {
  const { friendId } = useParams();
  const { friends, addInteraction, isFriendsLoading } = useAppContext();

  if (isFriendsLoading) {
    return (
      <section className="details-page">
        <div className="details-loader" role="status" aria-live="polite">
          <span className="friends-spinner" aria-hidden="true" />
          <p>Loading friend details...</p>
        </div>
      </section>
    );
  }

  const friend = friends.find((item) => String(item.id) === String(friendId));

  if (!friend) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="details-page">
      <div className="details-header-row">
        <h2>Friend Details</h2>
      </div>

      <div className="details-grid">
        <aside className="details-left-card card bg-base-100 shadow-sm">
          <img src={friend.picture} alt={friend.name} className="friend-avatar details-avatar" />

          <h3>{friend.name}</h3>

          <div className="details-status-row">
            <span className={statusLabelClass[friend.status]}>{formatStatus(friend.status)}</span>
          </div>

          <div className="tag-row">
            {friend.tags.map((tag) => (
              <span className="tag-chip" key={`${friend.id}-${tag}`}>
                {tag}
              </span>
            ))}
          </div>

          <p className="details-bio">"{friend.bio}"</p>
          <p className="details-email">{friend.email}</p>

          <div className="details-actions">
            <button type="button" className="details-action-btn btn btn-sm btn-outline">
              Snooze 2 Weeks
            </button>
            <button type="button" className="details-action-btn btn btn-sm btn-outline">
              Archive
            </button>
            <button type="button" className="details-action-btn details-danger-btn btn btn-sm btn-outline btn-error">
              Delete
            </button>
          </div>
        </aside>

        <div className="details-right-card card bg-base-100 shadow-sm">
          <div className="details-stats-row">
            <article className="details-stat-card">
              <h4>{friend.days_since_contact}</h4>
              <p>Days Since Contact</p>
            </article>
            <article className="details-stat-card">
              <h4>{friend.goal}</h4>
              <p>Goal (Days)</p>
            </article>
            <article className="details-stat-card">
              <h4>{new Date(friend.next_due_date).toLocaleDateString()}</h4>
              <p>Next Due</p>
            </article>
          </div>

          <article className="details-goal-card">
            <div className="details-card-head">
              <h5>Relationship Goal</h5>
              <button type="button" className="btn btn-xs btn-outline">Edit</button>
            </div>
            <p>
              Connect every <span className="details-goal-highlight">{friend.goal} days</span>
            </p>
          </article>

          <article className="details-quick-card">
            <h5>Quick Check-In</h5>
            <div className="details-quick-row">
              <button
                type="button"
                className="details-quick-btn btn btn-outline btn-sm"
                onClick={() => addInteraction("call", friend.name)}
              >
                <img src={callIcon} alt="Call" />
                <span>Call</span>
              </button>
              <button
                type="button"
                className="details-quick-btn btn btn-outline btn-sm"
                onClick={() => addInteraction("text", friend.name)}
              >
                <img src={textIcon} alt="Text" />
                <span>Text</span>
              </button>
              <button
                type="button"
                className="details-quick-btn btn btn-outline btn-sm"
                onClick={() => addInteraction("video", friend.name)}
              >
                <img src={videoIcon} alt="Video" />
                <span>Video</span>
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default FriendDetailsPage;
