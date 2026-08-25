import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

export function SidebarLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          render={<Link href="/dashboard" prefetch={false} />}
          className="group transition-all duration-200 hover:bg-transparent"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200 overflow-hidden">
            <Image
              src="/icon.svg"
              width={32}
              height={32}
              alt="Orion WMS Logo"
              className="size-full object-cover"
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-bold tracking-tight">Orion</span>
            <span className="truncate text-xs font-medium text-muted-foreground/80">
              Warehouse Management System
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
