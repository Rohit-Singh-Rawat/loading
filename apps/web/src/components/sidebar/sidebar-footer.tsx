import Image from "next/image";
import { Text } from "@/components/ui/text";

function Nametag({ avatar, name }: { avatar: string; name: string }) {
  return (
    <span className="whitespace-nowrap">
      <Image
        alt=""
        className="mr-1 mb-0.5 inline-block size-4 rounded-full opacity-60"
        height={32}
        src={avatar}
        width={32}
      />
      {name}
    </span>
  );
}

export function SidebarFooter() {
  return (
    <div className="border-border border-t pt-6">
      <Text className="text-content-subtle" size="sm">
        Crafted with care by <Nametag avatar="/jakub-krehel.png" name="Jakub" />{" "}
        and <Nametag avatar="/paul-faivret.png" name="Paul" />
      </Text>
    </div>
  );
}
