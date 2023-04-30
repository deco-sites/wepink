import ButtonSendEvent from "deco-sites/fashion/components/ButtonSendEvent.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import AddToCartButton from "deco-sites/fashion/islands/AddToCartButton.tsx";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import Image from "deco-sites/std/components/Image.tsx";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
}

function ProductCard({ product, preload, itemListName }: Props) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    description,
  } = product;
  const [front, back] = images ?? [];
  const { listPrice, price, seller, installments } = useOffer(offers);

  return (
    <div
      data-deco="view-product"
      id={`product-card-${productID}`}
      class="w-full group"
    >
      <a href={url} aria-label="product link">
        <div class="relative w-full">
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={300}
            height={300}
            class="rounded w-full group-hover:hidden"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            sizes="(max-width: 640px) 50vw, 300px"
          />
          <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={300}
            height={300}
            class="rounded w-full hidden group-hover:block"
            sizes="(max-width: 640px) 50vw, 300px"
          />
        </div>

        <div class="flex flex-col gap-1 py-2">
          <Text
            class="mt-4 pb-1 block h-[72px]"
            variant="heading-3"
          >
            {name}
          </Text>
          <Text variant="caption" class="block pb-2">
            {description}
          </Text>
          <Text
            class="line-through block mb-1 !font-bold"
            variant="list-price"
            tone="base-300"
          >
            {formatPrice(listPrice, offers!.priceCurrency!)}
          </Text>
          <div class="flex items-center gap-1">
            <Text class="text-base lg:text-lg !font-bold">
              {formatPrice(price, offers!.priceCurrency!)}
            </Text>
            <Text variant="caption">
              {installments}
            </Text>
          </div>
          {seller && (
            <div
              class="flex w-full bg-opacity-10 mt-2"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(2px)",
              }}
            >
              <ButtonSendEvent
                as="a"
                href={product.url}
                class="flex-1 mr-2.5"
                event={{
                  name: "select_item",
                  params: {
                    item_list_name: itemListName,
                    items: [
                      mapProductToAnalyticsItem({
                        product,
                        price,
                        listPrice,
                      }),
                    ],
                  },
                }}
              >
                Comprar
              </ButtonSendEvent>
              <AddToCartButton
                variant="shelf"
                skuId={productID}
                sellerId={seller}
                price={price ?? 0}
                discount={price && listPrice ? listPrice - price : 0}
                name={product.name ?? ""}
                productGroupId={product.isVariantOf?.productGroupID ?? ""}
              />
            </div>
          )}
        </div>
      </a>
    </div>
  );
}

export default ProductCard;
