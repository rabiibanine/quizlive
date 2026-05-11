import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { Logo } from "./Logo";

const Footer = () => {
  const currentYear = (new Date()).getFullYear();

  return (
    <footer className="mt-16 w-full">
      <div
        className="mx-auto w-full rounded-t-[36px] border-t border-white/10 bg-slate-950/90 text-white px-8 py-10 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.8)] backdrop-blur">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-md text-sm text-white/60">
              Generate AI-powered quizzes instantly, import via JSON, or build manually for any subject. Empowering
              students and educators with flexible, precision learning tools.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:items-end">
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/80 transition hover:bg-white/15"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/80 transition hover:bg-white/15"
              >
                <FaXTwitter className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/80 transition hover:bg-white/15"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
            </div>
            <p className="text-xs text-white/50">
              © {currentYear} Quiz Generator Live. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
