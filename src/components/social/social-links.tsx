import Link from "next/link";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Package,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialLinksProps {
  className?: string;
  size?: "default" | "sm" | "lg";
}

export default function SocialLinks({
  className = "",
  size = "default",
}: SocialLinksProps) {
  const iconSize =
    size === "lg" ? "h-6 w-6" : size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const buttonSize =
    size === "lg" ? "h-12 w-12" : size === "sm" ? "h-8 w-8" : "h-10 w-10";

  const socialLinks = [
    {
      icon: <Github className={iconSize} />,
      href: "https://github.com/pr1m8",
      label: "GitHub",
    },
    {
      icon: <Linkedin className={iconSize} />,
      href: "https://linkedin.com/in/william-astley",
      label: "LinkedIn",
    },
    {
      icon: <Twitter className={iconSize} />,
      href: "https://twitter.com/william_astley",
      label: "Twitter",
    },
    {
      icon: <Mail className={iconSize} />,
      href: "mailto:wrastley@gmail.com",
      label: "Email",
    },
    {
      icon: <Package className={iconSize} />,
      href: "https://pypi.org/user/wrastley/",
      label: "PyPI",
    },
    {
      icon: <BookOpen className={iconSize} />,
      href: "/docs",
      label: "Documentation",
    },
  ];

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {socialLinks.map((link) => (
        <Button
          key={link.label}
          asChild
          variant="outline"
          size="icon"
          className={`rounded-full ${buttonSize} transition-colors hover:bg-primary/10 hover:text-primary`}
          aria-label={link.label}
        >
          <Link
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
          >
            {link.icon}
          </Link>
        </Button>
      ))}
    </div>
  );
}
