import Modals from "deco-sites/fashion/islands/HeaderModals.tsx";
import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "deco-sites/wepink/components/search/SearchBar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";

import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  image?: {
    src?: Image;
    alt?: string;
  };
}

export interface Props {
  alerts: string[];
  /** @title Search Bar */
  searchBar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: LoaderReturnType<Product[] | null>;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: LoaderReturnType<Suggestion | null>;
}

function Header(
  {
    alerts,
    searchBar: _searchBar,
    products,
    navItems = [],
    suggestions,
  }: Props,
) {
  const searchBar = { ..._searchBar, products, suggestions };
  return (
    <header
      style={{ height: headerHeight }}
      class=""
    >
      <div class="fixed w-full z-50">
        <Alert alerts={alerts} />
        <Navbar items={navItems} searchBar={searchBar} />
      </div>

      <Modals
        menu={{ items: navItems }}
      />
    </header>
  );
}

export default Header;
