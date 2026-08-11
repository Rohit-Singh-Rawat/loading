import { InstallCommand } from "@/components/install-command/install-command";
import { SpinnerCard } from "@/components/spinner-card/spinner-card";
import { getSpinner, SPINNER_ITEMS } from "@/components/spinners";
import { PageHeader } from "@/components/ui/page-header";

const FEATURED_SLUGS = ["arc", "classic", "loader", "bouncing-dots"];
const COLUMNS = 3;

export default function Home() {
  const featured = FEATURED_SLUGS.flatMap((slug) => getSpinner(slug) ?? []);
  const placeholders = SPINNER_ITEMS.filter((item) => !item.component).slice(
    0,
    (COLUMNS - (featured.length % COLUMNS)) % COLUMNS
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        description="A collection of loading indicators for interfaces that care about the details. Every spinner is a small, dependency-free component — pick one, add it to your project with a single command, and ship."
        title={
          <>
            Loading,
            <br />
            <span className="opacity-50">made beautiful.</span>
          </>
        }
      />
      <InstallCommand command="npm install loading-dev" />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {[...featured, ...placeholders].map((item) => (
          <SpinnerCard item={item} key={item.slug} />
        ))}
      </div>
    </div>
  );
}
