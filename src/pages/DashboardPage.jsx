import FriendCard from "../components/FriendCard";
import { useAppContext } from "../context/AppContext";

function DashboardPage() {
  const { friends, summary } = useAppContext();
  const displayFriends = [...friends];

  while (displayFriends.length < 12) {
    displayFriends.push(friends[displayFriends.length % friends.length]);
  }

  return (
    <section className="dashboard-wrap">
      <div className="hero-section">
        <h2>Friends to keep close in your life</h2>
        <p>
          Your personal shelf of meaningful connections. Browse, tend, and nurture
          the relationships that matter most.
        </p>
        <button className="primary-btn" type="button">
          + Add a Friend
        </button>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <h3>{summary.totalFriends}</h3>
          <p>Total Friends</p>
        </article>
        <article className="summary-card">
          <h3>{summary.onTrack}</h3>
          <p>On Track</p>
        </article>
        <article className="summary-card">
          <h3>{summary.needAttention}</h3>
          <p>Need Attention</p>
        </article>
        <article className="summary-card">
          <h3>{summary.interactionsThisMonth}</h3>
          <p>Interactions This Month</p>
        </article>
      </div>

      <hr className="divider" />

      <div className="friends-headline">
        <h3>Your Friends</h3>
      </div>

      <div className="friends-grid">
        {displayFriends.slice(0, 12).map((friend, idx) => (
          <FriendCard key={`${friend.id}-${idx}`} friend={friend} />
        ))}
      </div>
    </section>
  );
}

export default DashboardPage;
