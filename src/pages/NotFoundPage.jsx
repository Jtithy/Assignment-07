import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="page-section not-found">
      <h2>404 - Page Not Found</h2>
      <p>The route you requested does not exist.</p>
      <Link to="/dashboard" className="primary-btn btn btn-primary">
        Go to Dashboard
      </Link>
    </section>
  );
}

export default NotFoundPage;
