import type { LoaderReturnType } from "$live/types.ts";
import ViewSendEvent from "deco-sites/fashion/components/ViewSendEvent.tsx";
import ProductCard from "deco-sites/fashion/components/product/ProductCard.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import SectionTitle from "deco-sites/fashion/components/ui/SectionTitle.tsx";
import { Slider } from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderControllerJS from "deco-sites/fashion/islands/SliderJS.tsx";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useId } from "preact/hooks";

export interface Props {
  title: string;
  products: LoaderReturnType<Product[] | null>;
  itemsPerPage?: number;
}

function ProductShelf({
  title,
  products,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Container
      id={id}
      class="a-10 px-0 mb-16"
    >
      <SectionTitle title={title} />
      <div class="flex items-center gap-5 px-2 lg:px-0">
        <div class="hidden relative sm:block">
          <div class="bg-base-100">
            <Button
              class="h-[55px] w-[55px] text-white !rounded-full !bg-primary"
              data-slide="prev"
              aria-label="Previous item"
            >
              <Icon size={35} id="ChevronLeft" strokeWidth={2} />
            </Button>
          </div>
        </div>

        <Slider
          class="gap-4 lg:gap-14 col-span-full row-start-2 row-end-5 scrollbar-none"
          snap="snap-center sm:snap-start block first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-0"
        >
          {products?.map((product) => (
            <div class="min-w-[220px] max-w-[220px] sm:min-w-[300px] sm:max-w-[300px]">
              <ProductCard product={product} itemListName={title} />
            </div>
          ))}
        </Slider>

        <div class="hidden relative sm:block">
          <div class="bg-base-100">
            <Button
              variant="icon"
              class="h-[55px] w-[55px] text-white !rounded-full !bg-primary"
              data-slide="next"
              aria-label="Next item"
            >
              <Icon size={35} id="ChevronRight" strokeWidth={2} />
            </Button>
          </div>
        </div>
      </div>

      <SliderControllerJS rootId={id} />

      <ViewSendEvent
        event={{
          name: "view_item_list",
          params: {
            item_list_name: title,
            items: products.map((product) =>
              mapProductToAnalyticsItem({
                product,
                ...(useOffer(product.offers)),
              })
            ),
          },
        }}
      />
    </Container>
  );
}

export default ProductShelf;
