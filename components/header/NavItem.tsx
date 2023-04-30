import Text from "deco-sites/fashion/components/ui/Text.tsx";

export interface INavItem {
  label: string;
  href: string;
  image?: { src: string; alt?: string };
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, image } = item;

  return (
    <li class="group/nav flex items-center">
      <a href={href} class="px-[22px] py-4">
        <Text class="group-hover/nav:text-primary" variant="menu">
          {label}
        </Text>
      </a>
    </li>
  );
}

export default NavItem;
