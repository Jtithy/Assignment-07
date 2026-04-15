import { Link } from "react-router-dom";

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

function FriendCard({ friend }) {
  return (
    <Link to={`/friends/${friend.id}`} className="friend-card friend-card-link">
      <img src={friend.picture} alt={friend.name} className="friend-avatar" />
      <h3>{friend.name}</h3>
      <p className="friend-days">{friend.days_since_contact}d ago</p>

      <div className="tag-row">
        {friend.tags.map((tag) => (
          <span className="tag-chip" key={`${friend.id}-${tag}`}>
            {tag}
          </span>
        ))}

        <span className={statusLabelClass[friend.status]}>{formatStatus(friend.status)}</span>
      </div>
    </Link>
  );
}

export default FriendCard;
