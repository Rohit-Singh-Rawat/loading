import { InstallCommand } from "@/components/install-command/install-command";
import { SpinnerCard } from "@/components/spinner-card/spinner-card";
import { SPINNER_ITEMS } from "@/components/spinners";
import { PageHeader } from "@/components/ui/page-header";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        className="px-4"
        description="A small, lightweight package full of loading indicators for interfaces that care about details."
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
        {SPINNER_ITEMS.map((item) => (
          <SpinnerCard item={item} key={item.slug} />
        ))}
      </div>
    </div>
  );
}
