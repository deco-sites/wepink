import Text from "deco-sites/wepink/components/ui/Text.tsx";
import { JSX } from "preact";
import type { Product } from "deco-sites/std/commerce/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import ProductCard from "deco-sites/wepink/components/product/ProductCard.tsx";

interface Props
  extends Omit<JSX.HTMLAttributes<HTMLUListElement>, "class" | "className"> {
  products: Product[];
  searchTerm: string;
}

export default function SuggestionsProductList(
  { products, searchTerm, ...ulProps }: Props,
) {
  return (
    <div class="flex flex-col w-full">
      {/* mobile */}
      <ul {...ulProps} class="flex md:hidden flex-col">
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
      {/* Desktop */}
      <div class="hidden md:block border-l px-2">
        <h3 class="block uppercase font-bold text-sm text-neutral-700 px-2.5">
          Produtos para {searchTerm}
        </h3>
        <ul {...ulProps} class="grid grid-cols-3 gap-x-2">
          {products.slice(0, 3).map((product) => (
            <li>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
