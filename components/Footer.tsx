import { footer } from "../content";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
export const Footer = ({
  footer,
  title,
}: {
  footer: footer;
  title: string;
}) => {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-wrapper">
          <div className="copyright-row">
            <p className="copyright-text col text-muted mb-0 py-0">
              {footer.brand} &copy; {new Date().getFullYear()} &#174; - {title}
            </p>
            <div className="socials">
              <a
                href="https://www.facebook.com/pdfequipsfb"
                target="_blank"
                className="facebook"
              >
                <FaFacebook size="25" />
              </a>
              <a
                href="https://twitter.com/PDFEquips"
                target="_blank"
                className="twitter"
              >
                <FaXTwitter size="25" />
              </a>
              <a
                href="https://www.instagram.com/sanusihassan122/"
                target="_blank"
              >
                <svg width="0" height="0">
                  <radialGradient id="rg" r="150%" cx="30%" cy="107%">
                    <stop stopColor="#fdf497" offset="0"></stop>
                    <stop stopColor="#fdf497" offset="0.05"></stop>
                    <stop stopColor="#fd5949" offset="0.45"></stop>
                    <stop stopColor="#d6249f" offset="0.6"></stop>
                    <stop stopColor="#285AEB" offset="0.9"></stop>
                  </radialGradient>
                </svg>

                <FaInstagram size="25" className="instagram" />
              </a>
              <a
                href="https://www.linkedin.com/in/sanusi-hassan-umar-343a6011a/"
                target="_blank"
                className="linkedin"
              >
                <FaLinkedinIn size="25" />
              </a>
            </div>
          </div>
          <div className="col terms-col">
            <ul className="terms-row">
              <li className="privacy-policy">
                <a href="/privacy-policy" className="text-muted">
                  {footer.privacy_policy}
                </a>{" "}
                <a href="/terms" className="text-muted">
                  {footer.terms}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
