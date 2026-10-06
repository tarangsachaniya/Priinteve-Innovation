import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <PageHero
      h1="Page not found"
      lead="The page you are looking for does not exist or has moved."
      actions={
        <>
          <Button href="/">Back to Home</Button>
          <Button href="/contact" variant="ghost">
            Get in touch
          </Button>
        </>
      }
    />
  );
}
