import { SocialLinks } from "@/components/aside/social-links";

export default function AsideDefault() {
  return (
    <aside className="hidden w-[240px] shrink-0 py-[100px] xl:block">
      <div className="sticky top-[100px] flex flex-col gap-4">
        <SocialLinks />
      </div>
    </aside>
  );
}
