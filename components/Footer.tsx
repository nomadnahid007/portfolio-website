import { Container } from "@/components/Container";
import { sectionNavigation, siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-line/80 py-10">
      <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent">Nahid Hassan</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">{siteConfig.title}</h2>
          <p className="mt-4 max-w-xl text-base text-muted">
            A portfolio centered on product execution, student-facing systems, applied NLP work, and writing with clear intent.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-foreground">Navigate</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {sectionNavigation.map((item) => (
                <li key={item.id}>
                  <a href={item.id === "home" ? "/" : `/#${item.id}`} className="hover:text-foreground" data-cursor="interactive">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Reach out</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground" data-cursor="interactive">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={siteConfig.social.github} target="_blank" rel="noreferrer" className="hover:text-foreground" data-cursor="interactive">
                  GitHub
                </a>
              </li>
              <li>
                <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground" data-cursor="interactive">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" className="hover:text-foreground" data-cursor="interactive">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
