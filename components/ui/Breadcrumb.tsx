import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import type { BreadcrumbList } from "deco-sites/std/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
  productName?: string;
}

function Item({ name, item }: { name?: string; item?: string }) {
  if (!name || !item) {
    return null;
  }

  return (
    <li class="whitespace-nowrap overflow-hidden text-ellipsis">
      <a href={item}>
        <span class="text-xs text-[#505050] underline">
          {name.toLowerCase()}
        </span>
      </a>
    </li>
  );
}

function Breadcrumb({ itemListElement = [], productName }: Props) {
  return (
    <ul class="flex flex-row gap-2 items-center w-full">
      {itemListElement.map((item) => (
        <>
          <Item {...item} />
          <li class="mt-0.5">
            <Icon
              id="ChevronRight"
              class="text-base-300"
              width={10}
              height={10}
              strokeWidth={2}
            />
          </li>
        </>
      ))}
      {productName && (
        <li class="whitespace-nowrap overflow-hidden text-ellipsis">
          <span class="text-xs font-bold text-[#505050]">
            {productName.toLocaleLowerCase()}
          </span>
        </li>
      )}
    </ul>
  );
}

export default Breadcrumb;
