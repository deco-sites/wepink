import HeaderButton from "deco-sites/wepink/islands/HeaderButton.tsx";
import Icon from "deco-sites/wepink/components/ui/Icon.tsx";
import Button from "deco-sites/wepink/components/ui/Button.tsx";
import Container from "deco-sites/wepink/components/ui/Container.tsx";

import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchBarProps } from "deco-sites/wepink/components/search/SearchBar.tsx";
import HeaderSearchBar from "deco-sites/wepink/islands/HeaderSearchBar.tsx";

import HasScrolledPastThresholdDataAttributeSetup from "deco-sites/wepink/islands/HasScrolledPastThresholdDataAttributeSetup.tsx";

function Navbar({ items, searchBar }: {
  items: INavItem[];
  searchBar: SearchBarProps;
}) {
  return (
    <div
      id="nav-bar"
      class="bg-info group data-[has-scrolled-past-tres-hold=true]:bg-opacity-80 backdrop-blur transition-all"
    >
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full px-2 gap-2"
      >
        <HeaderButton variant="menu" />

        <a
          href="/"
          class="flex-grow inline-flex items-center"
          style={{ minHeight: navbarHeight }}
          aria-label="Store logo"
        >
          <Icon id="Logo" width={126} height={16} />
        </a>

        <div class="flex gap-1">
          <HeaderButton variant="search" />
          <HeaderButton variant="cart" />
        </div>
      </div>

      {/* Desktop Version */}
      <Container class="hidden md:flex flex-row justify-between items-center h-[82px] group-data-[has-scrolled-past-tres-hold=true]:h-[66px]  w-full pl-2 pr-3 transition-all">
        <div class="flex-none px-4 pb-[6px]">
          <a
            href="/"
            aria-label="Store logo"
            class="block w-[130px]  text-primary"
          >
            <Icon id="Logo" width={130} height={35} />
          </a>
        </div>
        <div class="flex-auto flex justify-center">
          {items.map((item) => <NavItem item={item} />)}
        </div>
        <div class="flex-none w-75 flex items-center justify-end -mr-[13px]">
          <HeaderSearchBar searchBar={searchBar} />
          <Button
            as="a"
            variant="icon"
            href="/login"
            aria-label="Log in"
            class="ml-4 mr-[19px]"
          >
            <Icon id="User" width={20} height={20} strokeWidth={0.4} />
          </Button>
          <HeaderButton variant="cart" />
        </div>
      </Container>

      <HasScrolledPastThresholdDataAttributeSetup rootId="nav-bar" />
    </div>
  );
}

export default Navbar;
