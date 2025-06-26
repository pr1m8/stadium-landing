"use client";
import Link from "next/link";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";

export function SimpleCenteredContactForm() {
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    console.log(target);
  };

  const socials = [
    {
      title: "twitter",
      href: "https://twitter.com/mannupaaji",
      icon: (
        <IconBrandX className="h-5 w-5 text-muted-foreground hover:text-foreground" />
      ),
    },
    {
      title: "github",
      href: "https://github.com/manuarora700",
      icon: (
        <IconBrandGithub className="h-5 w-5 text-muted-foreground hover:text-foreground" />
      ),
    },
    {
      title: "linkedin",
      href: "https://linkedin.com/manuarora28",
      icon: (
        <IconBrandLinkedin className="h-5 w-5 text-muted-foreground hover:text-foreground" />
      ),
    },
  ];

  return (
    <div className="bg-muted/30 w-full flex items-center justify-center">
      <div className="flex relative px-4 z-20 items-center w-full justify-center py-10">
        <div className="mx-auto w-full max-w-lg bg-card px-4 md:px-10 py-8 shadow-input rounded-3xl">
          <div>
            <h1 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-foreground">
              Contact Us
            </h1>
            <p className="mt-4 text-muted-foreground text-sm max-w-sm">
              Please reach out to us and we will get back to you at the speed of
              light.
            </p>
          </div>

          <div className="py-10">
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-muted-foreground"
                >
                  Full Name
                </label>

                <div className="mt-2">
                  <input
                    id="name"
                    type="name"
                    placeholder="Manu Arora"
                    className="block w-full bg-background px-4 rounded-md border-0 py-1.5  shadow-input text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none sm:text-sm sm:leading-6"
                  />
                </div>

                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-muted-foreground"
                >
                  Email address
                </label>

                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    placeholder="hello@johndoe.com"
                    className="block w-full bg-background px-4 rounded-md border-0 py-1.5  shadow-input text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none sm:text-sm sm:leading-6"
                  />
                </div>

                <label
                  htmlFor="company"
                  className="block text-sm font-medium leading-6 text-muted-foreground"
                >
                  Company
                </label>

                <div className="mt-2">
                  <input
                    id="company"
                    type="company"
                    placeholder="Aceternity Labs, LLC"
                    className="block w-full bg-background px-4 rounded-md border-0 py-1.5  shadow-input text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none sm:text-sm sm:leading-6"
                  />
                </div>

                <label
                  htmlFor="message"
                  className="block text-sm font-medium leading-6 text-muted-foreground"
                >
                  message
                </label>

                <div className="mt-2">
                  <textarea
                    rows={5}
                    id="message"
                    placeholder="Enter your message here"
                    className="block w-full bg-background px-4 rounded-md border-0 py-1.5  shadow-input text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none sm:text-sm sm:leading-6"
                  />
                </div>

                <div>
                  <button className="bg-primary relative z-10 hover:bg-primary/90 text-primary-foreground text-sm md:text-sm transition font-medium duration-200  rounded-full px-4 py-2  flex items-center justify-center w-full hover:shadow-xl">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4 py-4">
            {socials.map((social) => (
              <Link href={social.href} key={social.title}>
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
