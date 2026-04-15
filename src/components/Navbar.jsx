import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5.5v-6.5h-5V22H4a1 1 0 0 1-1-1v-10.5Z" />
    </svg>
  );
}

function TimelineIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.9v4.7l3.2 1.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function StatsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 17.5h16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m6.2 14.8 4-4 3 2.4L17.7 9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const navItems = [
  { to: "/dashboard", label: "Home", icon: <HomeIcon />, buttonClass: "nav-home" },
  { to: "/timeline", label: "Timeline", icon: <TimelineIcon />, buttonClass: "nav-timeline" },
  { to: "/stats", label: "Stats", icon: <StatsIcon />, buttonClass: "nav-stats" },
];

function Navbar() {
  return (
    <header className="top-nav">
      <div className="brand-wrap">
        <img src={logo} alt="KeenKeeper" className="brand-wordmark" />
      </div>

      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? `nav-pill nav-pill-active ${item.buttonClass}`
                : `nav-pill ${item.buttonClass}`
            }
          >
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
