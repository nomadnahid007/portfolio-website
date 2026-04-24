"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { ThemeToggle } from "@/components/ThemeToggle";
import { sectionNavigation } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function scrollToSection(id: string) {
  const target = id === "home" ? document.body : document.getElementById(id);

  if (!target) {
    return;
  }

  const top = id === "home" ? 0 : target.getBoundingClientRect().top + window.scrollY - 112;
  window.scrollTo({ top, behavior: "smooth" });
  window.history.replaceState(null, "", id === "home" ? "/" : `/#${id}`);
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const hash = window.location.hash.replace("#", "");

    if (hash) {
      window.setTimeout(() => scrollToSection(hash), 120);
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const getSections = () =>
      sectionNavigation
        .map((item) => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[];

    const updateActiveSection = () => {
      const sections = getSections();

      if (!sections.length) {
        return;
      }

      const scrollAnchor = window.scrollY + 148;
      let currentSection = "home";

      for (const section of sections) {
        if (section.offsetTop <= scrollAnchor) {
          currentSection = section.id;
        }
      }

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [pathname]);

  const handleNavigate = (id: string) => {
    setOpen(false);

    if (pathname !== "/") {
      router.push(id === "home" ? "/" : `/#${id}`);
      return;
    }

    scrollToSection(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <Container className="pt-3 sm:pt-4">
        <div className="surface flex items-center justify-between rounded-[1.75rem] border border-line/80 px-3 py-2.5 shadow-soft sm:rounded-full sm:px-6 sm:py-3">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-line/80 bg-card/75 transition hover:scale-[1.03] hover:border-accent/35 sm:h-10 sm:w-10"
            data-cursor="interactive"
            onClick={() => handleNavigate("home")}
            aria-label="Back to home"
          >
            <Image
              src="/images/nahid-hassan-avatar.jpg"
              alt="Nahid Hassan"
              width={36}
              height={36}
              className="h-full w-full object-cover"
              sizes="(max-width: 640px) 36px, 40px"
              priority
            />
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {sectionNavigation.map((item) => {
              const active = pathname === "/" && activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm transition",
                    active ? "bg-foreground text-background" : "text-muted hover:bg-card hover:text-foreground"
                  )}
                  data-cursor="interactive"
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-line px-3 text-sm sm:h-11 sm:min-w-11 sm:px-0"
              aria-label="Toggle navigation"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              data-cursor="interactive"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        <nav
          className={cn(
            "surface mt-3 overflow-hidden rounded-[1.8rem] border border-line/80 shadow-soft transition-[opacity,transform,max-height,margin] duration-300 lg:hidden",
            open ? "max-h-[520px] translate-y-0 opacity-100" : "pointer-events-none -mt-1 max-h-0 -translate-y-2 opacity-0"
          )}
          aria-hidden={!open}
        >
          <div className="p-3">
            {sectionNavigation.map((item) => {
              const active = pathname === "/" && activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={cn(
                    "block w-full rounded-2xl px-4 py-3 text-left text-sm transition",
                    active ? "bg-foreground text-background" : "text-muted hover:bg-card hover:text-foreground"
                  )}
                  data-cursor="interactive"
                >
                  {item.label}
                </button>
              );
            })}
            <div className="mt-3 border-t border-line/80 pt-3 text-sm text-muted">
              <Link href="/projects" className="block rounded-2xl px-4 py-3 hover:bg-card hover:text-foreground" onClick={() => setOpen(false)}>
                Full project archive
              </Link>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
