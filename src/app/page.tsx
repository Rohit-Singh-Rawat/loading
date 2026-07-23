import { InstallCommand } from "@/components/install-command";
import { SpinnerCard } from "@/components/spinner-card";
import { getSpinner } from "@/components/spinners";

const FEATURED_SLUGS = ["arc", "classic", "loader", "bouncing-dots"];

export default function Home() {
  const featured = FEATURED_SLUGS.flatMap((slug) => getSpinner(slug) ?? []);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-5">
        <h1 className="font-heldane text-[24px] leading-8">
          Spinners.
          <br />
          No more, no less.
        </h1>
        <p className="max-w-[480px] text-[13px] leading-5 text-gray-1000">
          A collection of loading indicators for interfaces that care about the
          details. Every spinner is a small, dependency-free component — pick
          one, add it to your project with a single command, and ship.
        </p>
      </header>
      <InstallCommand command="npx shadcn add @loading-ui/ring" />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {featured.map((item) => (
          <SpinnerCard item={item} key={item.slug} />
        ))}
      </div>
    </div>
  );
}
