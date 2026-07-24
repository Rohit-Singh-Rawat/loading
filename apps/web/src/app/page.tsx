import { InstallCommand } from "@/components/install-command/install-command";
import { SpinnerCard } from "@/components/spinner-card/spinner-card";
import { getSpinner } from "@/components/spinners";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

const FEATURED_SLUGS = ["arc", "classic", "loader", "bouncing-dots"];

export default function Home() {
  const featured = FEATURED_SLUGS.flatMap((slug) => getSpinner(slug) ?? []);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-5">
        <Heading as="h1" className="font-heldane" size={1} weight="regular">
          Spinners.
          <br />
          No more, no less.
        </Heading>
        <Text className="text-text-paragraph" size="sm">
          A collection of loading indicators for interfaces that care about the
          details. Every spinner is a small, dependency-free component — pick
          one, add it to your project with a single command, and ship.
        </Text>
      </header>
      <InstallCommand command="npm install loading-dev" />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {featured.map((item) => (
          <SpinnerCard item={item} key={item.slug} />
        ))}
      </div>
    </div>
  );
}
