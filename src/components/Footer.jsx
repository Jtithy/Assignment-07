import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import logoXl from "../../assets/logo-xl.png";
import twitter from "../../assets/twitter.png";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-description">
          <img src={logoXl} alt="KeenKeeper" className="footer-logo" />
          <p>
            Your personal shelf of meaningful connections. Browse, tend, and nurture
            the relationships that matter most.
          </p>
        </div>

        <div className="footer-social-wrap">
          <h3>Social Links</h3>
          <div className="social-links" aria-label="social links">
            <button type="button" className="social-btn" aria-label="Instagram">
              <img src={instagram} alt="Instagram" />
            </button>
            <button type="button" className="social-btn" aria-label="Facebook">
              <img src={facebook} alt="Facebook" />
            </button>
            <button type="button" className="social-btn" aria-label="Twitter">
              <img src={twitter} alt="Twitter" />
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 KeenKeeper. All rights reserved.</span>
        <span className="footer-links">Privacy Policy</span>
        <span className="footer-links">Terms of Service</span>
        <span className="footer-links">Cookies</span>
      </div>
    </footer>
  );
}

export default Footer;
