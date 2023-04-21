import Text from "deco-sites/wepink/components/ui/Text.tsx";
import { JSX } from "preact";
import type { Product } from "deco-sites/std/commerce/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

interface Props
  extends Omit<JSX.HTMLAttributes<HTMLUListElement>, "class" | "className"> {
  products: Product[];
}

export default function SuggestionsProductList(
  { products, title, ...ulProps }: Props,
) {
  return (
    <div class="flex flex-col w-full">
      <ul {...ulProps} class="flex flex-col">
        {products.map((product) => (
          <li>
            <a
              href={product.url}
              class="items-center px-3 py-1 flex align-middle gap-2.5 hover:pl-4 transition-all"
            >
              <Image
                height={45}
                width={30}
                src={product?.image?.[0]?.url ?? ""}
              />
              <Text variant="body" class="text-[15px] text-black">
                {product.isVariantOf?.name}
              </Text>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
