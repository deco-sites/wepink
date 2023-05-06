import { useId } from "preact/hooks";
import AddToCartButton from "deco-sites/fashion/islands/AddToCartButton.tsx";
import ShippingSimulation from "deco-sites/fashion/islands/ShippingSimulation.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Breadcrumb from "deco-sites/fashion/components/ui/Breadcrumb.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import {
  Slider,
  SliderDots,
} from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderJS from "deco-sites/fashion/components/ui/SliderJS.tsx";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import ViewSendEvent from "deco-sites/fashion/components/ViewSendEvent.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";

import ProductSelector from "./ProductVariantSelector.tsx";
import ProductImageZoom from "deco-sites/fashion/islands/ProductImageZoom.tsx";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import ZoomableImage from "deco-sites/fashion/islands/ZoomableImage.tsx";

export type Variant = "front-back" | "slider" | "auto";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  /**
   * @title Product view
   * @description Ask for the developer to remove this option since this is here to help development only and should not be used in production
   */
  variant?: Variant;
}

const WIDTH = 600;
const HEIGHT = 600;

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <Text variant="heading-2">Página não encontrada</Text>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function ProductInfo({ page }: { page: ProductDetailsPage }) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    name,
    gtin,
    isVariantOf,
  } = product;
  const { price, listPrice, seller, installments } = useOffer(offers);

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
      />
      {/* Code and name */}
      <div class="mt-4 sm:mt-8">
        <div>
          <Text tone="base-300" variant="caption">
            Cod. {gtin}
          </Text>
        </div>
        <h1>
          <Text variant="heading-3">{name}</Text>
        </h1>
      </div>
      {/* Prices */}
      <div class="mt-4">
        <div class="flex flex-row gap-2 items-center">
          <Text
            class="line-through"
            tone="base-300"
            variant="list-price"
          >
            {formatPrice(listPrice, offers!.priceCurrency!)}
          </Text>
          <Text tone="secondary" variant="heading-3">
            {formatPrice(price, offers!.priceCurrency!)}
          </Text>
        </div>
        <Text tone="base-300" variant="caption">
          {installments}
        </Text>
      </div>
      {/* Sku Selector */}
      <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} />
      </div>
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {seller && (
          <AddToCartButton
            skuId={productID}
            sellerId={seller}
            price={price ?? 0}
            discount={price && listPrice ? listPrice - price : 0}
            name={product.name ?? ""}
            productGroupId={product.isVariantOf?.productGroupID ?? ""}
          />
        )}
        <WishlistButton
          variant="full"
          productId={isVariantOf?.productGroupID}
          sku={productID}
          title={name}
        />
      </div>
      {/* Shipping Simulation */}
      <div class="mt-8">
        <ShippingSimulation
          items={[{
            id: Number(product.sku),
            quantity: 1,
            seller: seller ?? "1",
          }]}
        />
      </div>
      {/* Description card */}
      <div class="mt-4 sm:mt-6">
        <Text variant="caption">
          {description && (
            <details>
              <summary class="cursor-pointer">Descrição</summary>
              <div class="ml-2 mt-2">{description}</div>
            </details>
          )}
        </Text>
      </div>
      <ViewSendEvent
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </>
  );
}

function Details({
  page,
}: { page: ProductDetailsPage }) {
  const id = `product-image-gallery:${useId()}`;
  const { product: { image: images = [] } } = page;

  return (
    <>
      <div
        id={id}
        class="grid grid-cols-1 md:grid-cols-[55%_45%] gap-4 md:gap-8"
      >
        <div class="flex gap-4">
          {/* Dots */}
          <SliderDots class="gap-2 sm:justify-start overflow-auto sm:px-0 flex-col">
            {images.map((img, _) => (
              <Image
                class="rounded-xl w-[calc(100vw*177/1920)] aspect-square border border-red-500"
                width={177}
                src={img.url!}
                alt={img.alternateName}
              />
            ))}
          </SliderDots>

          {/* Image Slider */}
          <div class="relative md:w-[calc(100vw*692/1920)] flex-grow-1">
            <Slider class="gap-6 ">
              {images.map((img, index) => (
                <ZoomableImage
                  factor={2}
                  type="hover"
                  src={img.url!}
                  class="snap-center md:w-[calc(100vw*692/1920)] border border-red-500 aspect-square"
                  alt={img.alternateName}
                  width={WIDTH}
                  height={HEIGHT}
                  // Preload LCP image for better web vitals
                  preload={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              ))}
            </Slider>
          </div>

          <div class="absolute top-2 right-2 bg-base-100 rounded-full">
            <ProductImageZoom
              images={images}
              width={1280}
              height={1280 * HEIGHT / WIDTH}
            />
          </div>
        </div>

        {/* Product Info */}
        <div class="px-4 sm:px-0">
          <ProductInfo page={page} />
        </div>
      </div>
      <SliderJS rootId={id}></SliderJS>
    </>
  );
}

function ProductDetails({ page, variant: maybeVar = "auto" }: Props) {
  return (
    <Container class="py-0 sm:py-10">
      {page ? <Details page={page} /> : <NotFound />}
    </Container>
  );
}

export default ProductDetails;
