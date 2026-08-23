import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

type NavItemData = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
};

export function NavItem({
  item,
  pathname,
  activeClassName,
  inactiveClassName,
}: {
  item: NavItemData;
  pathname: string;
  activeClassName: string;
  inactiveClassName: string;
}) {
  const isActive = pathname === item.url;
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        render={
          <Link
            href={item.url}
            prefetch={false}
            tabIndex={isActive ? -1 : undefined}
          />
        }
        className={`group rounded-lg transition-all duration-200 ${
          isActive ? activeClassName : inactiveClassName
        }`}
      >
        <item.icon
          className={`size-4 transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
        />
        <span>{item.title}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function NavSubItem({
  item,
  pathname,
}: {
  item: { title: string; url: string };
  pathname: string;
}) {
  const isActive = pathname === item.url;
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        isActive={isActive}
        render={
          <Link
            href={item.url}
            prefetch={false}
            tabIndex={isActive ? -1 : undefined}
          />
        }
        className={`transition-all duration-200 ${
          isActive
            ? "text-primary font-medium pointer-events-none"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <span>{item.title}</span>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
