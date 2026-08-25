// components/sidebar/SidebarProfile.tsx
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, LogOut, ChevronsUpDown } from "lucide-react";

export function SidebarProfile() {
  const router = useRouter();

  const logOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login");
        },
      },
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="group data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-xl transition-all duration-200 hover:bg-muted"
              />
            }
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border shadow-sm">
              <Settings className="size-4 text-slate-600 dark:text-slate-300 group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Admin User</span>
              <span className="truncate text-xs text-muted-foreground">
                admin@store.com
              </span>
            </div>
            <ChevronsUpDown className="ml-auto size-4 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 rounded-xl shadow-lg border-border/50 backdrop-blur-md"
            side="right"
            align="end"
          >
            <DropdownMenuItem
              onSelect={() => router.push("/settings")}
              className="cursor-pointer rounded-lg hover:bg-primary/5 focus:bg-primary/5"
            >
              <Settings className="mr-2 size-4 text-muted-foreground" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => logOut()}
              className="cursor-pointer rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-600 focus:bg-rose-50 focus:text-rose-600 dark:hover:bg-rose-950/50 dark:focus:bg-rose-950/50 mt-1"
            >
              <LogOut className="mr-2 size-4" />
              log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
