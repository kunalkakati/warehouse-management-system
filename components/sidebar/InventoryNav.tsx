import React from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import { ChevronRight, ArrowRightLeft } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { inventoryItems, goodsMovment } from "./sidebar-data";
import { NavItem, NavSubItem } from "../NavItem";

const InventoryNav = ({ pathname }: { pathname: string }) => {
  return (
    <div>
      <SidebarGroup>
        <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
          Inventory
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="gap-1">
            {/* Optional: Keep flat items if you still need them */}
            {inventoryItems.map((item) => (
              <NavItem
                key={item.title}
                item={item}
                pathname={pathname}
                activeClassName="..."
                inactiveClassName="..."
              />
            ))}

            {/* NEW DROPDOWN IN INVENTORY */}
            <Collapsible
              defaultOpen={pathname.startsWith("/dashboard/inventory/products")}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger
                  render={
                    <SidebarMenuButton className="group rounded-lg transition-all duration-200 hover:bg-muted text-foreground hover:text-muted-foreground" />
                  }
                >
                  <ArrowRightLeft className="size-4 transition-transform duration-200 group-hover:scale-110" />
                  <span>Good Movments</span>
                  <ChevronRight className="ml-auto size-4 text-muted-foreground/50 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {goodsMovment.map((item) => (
                      <NavSubItem
                        key={item.title}
                        item={item}
                        pathname={pathname}
                      />
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </div>
  );
};

export default InventoryNav;
