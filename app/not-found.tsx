import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-start justify-center gap-6 pt-28 sm:pt-36">
      <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent">404</p>
      <h1 className="font-serif text-5xl leading-none sm:text-6xl">This page drifted out of view.</h1>
      <p className="max-w-xl text-base leading-8 text-muted sm:text-lg">
        The route you requested does not exist anymore, or it never made it into the published structure.
      </p>
      <Link href="/" className="text-sm font-medium underline decoration-accent/60 underline-offset-4" data-cursor="interactive">
        Return home
      </Link>
    </Container>
  );
}
