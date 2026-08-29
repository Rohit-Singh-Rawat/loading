import Image from "next/image";
import { Text } from "@/components/ui/text";

const AUTHORS = {
  jakub: {
    avatar:
      "https://ru2qm1zsj1gavqlm.public.blob.vercel-storage.com/jakub.avif",
    href: "https://x.com/jakubkrehel",
    name: "Jakub",
  },
  paul: {
    avatar: "https://ru2qm1zsj1gavqlm.public.blob.vercel-storage.com/paul.jpg",
    href: "https://x.com/paulfaivret",
    name: "Paul",
  },
};

function Nametag({
  avatar,
  href,
  name,
}: {
  avatar: string;
  href: string;
  name: string;
}) {
  return (
    <a
      className="link-outline group whitespace-nowrap transition-colors hover:text-content"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <Image
        alt=""
        className="mr-1 mb-0.5 inline-block size-4 rounded-full opacity-50 transition-opacity group-hover:opacity-100"
        height={32}
        src={avatar}
        width={32}
      />
      {name}
    </a>
  );
}

export function SidebarFooter() {
  return (
    <div className="border-border border-t pt-6">
      <Text className="text-content-subtle" size="sm">
        Crafted with care by <Nametag {...AUTHORS.jakub} /> and{" "}
        <Nametag {...AUTHORS.paul} />
      </Text>
    </div>
  );
}
