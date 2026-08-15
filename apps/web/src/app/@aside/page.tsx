import { AsideShell } from "@/components/aside/aside-shell";
import { SocialLinks } from "@/components/aside/social-links";

export default function AsideOverview() {
  return (
    <AsideShell sticky={false}>
      <SocialLinks />
    </AsideShell>
  );
}
