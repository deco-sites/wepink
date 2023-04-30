import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import type { Props as SearchBarProps } from "deco-sites/wepink/components/search/SearchBar.tsx";
import HeaderSearchBar from "deco-sites/wepink/islands/HeaderSearchBar.tsx";
import type { INavItem } from "./NavItem.tsx";
import Image from "deco-sites/std/components/Image.tsx";

export interface Props {
  items: INavItem[];
  onClose?: () => void;
  searchBar: SearchBarProps;
}

function MenuItem(
  { href, label, image }: INavItem,
) {
  return (
    <li>
      <a class="flex items-center gap-2 w-full py-6" href={href}>
        {image && (
          <Image src={image.src} alt={image.alt} width={30} height={30} />
        )}
        <Text class="flex-grow min-h-[40px] !text-2xl flex items-center justify-start font-medium !text-[#333]">
          {label}
        </Text>
        <Icon
          id="ChevronRight"
          height={28}
          width={28}
          class="text-primary-focus"
          strokeWidth={2}
        />
      </a>
    </li>
  );
}

function Menu({ items, onClose, searchBar }: Props) {
  return (
    <>
      <header class="bg-primary relative">
        <div class="pt-[50px] pb-10 flex justify-center items-center">
          <a
            href="/"
            aria-label="Store logo"
            class=""
          >
            <Icon id="Logo" width={124} height={33} class="text-white" />
          </a>
        </div>
        <div class="flex justify-between items-center px-4 pb-2.5">
          <a href="#" class="flex flex-col min-w-[70px] items-center gap-1">
            <Icon
              id="User"
              height={21}
              width={21}
              class="text-white"
            />
            <Text class="text-center text-xs text-white leading-[15px]">
              Minha<br />
              conta
            </Text>
          </a>
          <a href="#" class="flex flex-col min-w-[70px] items-center gap-1">
            <Icon
              id="Orders"
              height={21}
              width={21}
              class="text-white"
            />
            <Text class="text-center text-xs text-white leading-[15px]">
              Meus<br />
              pedidos
            </Text>
          </a>
          <a href="#" class="flex flex-col min-w-[70px] items-center gap-1">
            <Icon
              id="Chat"
              height={21}
              width={21}
              class="text-white whitespace-pre"
            />
            <Text class="text-center text-xs text-white leading-[15px]">
              Atendimento
            </Text>
          </a>
        </div>
        <div class="px-4 py-3">
          <HeaderSearchBar searchBar={searchBar} />
        </div>
        <Button
          class="!px-[9px] absolute top-[47px] right-0"
          onClick={onClose}
        >
          <Icon
            id="XMark"
            height={30}
            width={30}
            class="text-white"
            strokeWidth={1.5}
          />
        </Button>
      </header>
      <div>
        <a href="#" class="flex items-center justify-end px-4 pt-[21px] pb-0.5">
          <Text class="underline text-xs">
            Ver todos os produtos
          </Text>
          <Icon
            id="ChevronRight"
            height={12}
            width={12}
            strokeWidth={1}
          />
        </a>
      </div>
      <ul class="px-4 py-[26px] flex-grow flex flex-col divide-y divide-base-200">
        {items.map((item) => <MenuItem {...item} />)}
      </ul>
    </>
  );
}

export default Menu;
