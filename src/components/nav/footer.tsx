import Link from "next/link";
import SocialLinks from "@/components/social/social-links";
import CopyToClipboard from "@/components/common/copy-to-clipboard";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold">William Astley</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Expert in Generative AI and Agentic AI
            </p>
          </div>

          <SocialLinks />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 border-t pt-8 md:grid-cols-4">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/#projects"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/#experience"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Experience
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Resources
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/pr1m8"
                  className="text-muted-foreground hover:text-foreground"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://pypi.org/user/wrastley/"
                  className="text-muted-foreground hover:text-foreground"
                >
                  PyPI Packages
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Legal
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Contact
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <CopyToClipboard text="wrastley@gmail.com" className="block">
                  <Link
                    href="mailto:wrastley@gmail.com"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    wrastley@gmail.com
                  </Link>
                </CopyToClipboard>
              </li>
              <li>
                <CopyToClipboard text="(518) 902 5805" className="block">
                  <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                    (518) 902 5805
                  </span>
                </CopyToClipboard>
              </li>
              <li>
                <Link
                  href="https://linkedin.com/in/william-astley"
                  className="text-muted-foreground hover:text-foreground"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="https://calendly.com/williamastley/30min"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Schedule a Call
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} William Astley. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
