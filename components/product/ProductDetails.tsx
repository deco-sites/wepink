import type { LoaderReturnType } from "$live/types.ts";
import ViewSendEvent from "deco-sites/fashion/components/ViewSendEvent.tsx";
import Breadcrumb from "deco-sites/fashion/components/ui/Breadcrumb.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import {
  Slider,
  SliderDots,
} from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderJS from "deco-sites/fashion/components/ui/SliderJS.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import AddToCartWithQuantity from "deco-sites/fashion/islands/AddToCartWithQuantity.tsx";
import TabsControlSetup from "deco-sites/fashion/islands/TabsControlSetup.tsx";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import Image from "deco-sites/std/components/Image.tsx";
import { useId } from "preact/hooks";
import ProductDescription from "deco-sites/fashion/components/product/ProductDescription.tsx";

import ProductImageZoom from "deco-sites/fashion/islands/ProductImageZoom.tsx";
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
        productName={name}
      />
      {/* Code and name */}
      <div class="mt-4 sm:mt-3 mb-3">
        <h1>
          <span class="text-primary text-2xl font-bold">{name}</span>
        </h1>
      </div>
      {/* Code and name */}
      <div class="mb-3">
        <span class="text-sm">
          {description}
        </span>
      </div>
      {/* Ratings */}
      <div class="text-xs flex items-center gap-1 mb-2">
        <strong>4.8 de 5</strong>
        <Image
          src="https://rate.trustvox.com.br/images/sprite.png"
          width={100}
          height={40}
          class="h-5 object-cover object-bottom"
        />
        <strong>(57)</strong>
      </div>
      {/* Prices */}
      <div class="mt-4 mb-9">
        <div class="flex flex-col">
          <span class="line-through font-bold text-[#8d8d8d]">
            {formatPrice(listPrice, offers!.priceCurrency!)}
          </span>
          <div class="flex items-center gap-2">
            <span class="text-2xl font-bold">
              {formatPrice(price, offers!.priceCurrency!)}
            </span>
            <span class="text-sm">
              {installments}
            </span>
          </div>
        </div>
      </div>
      {/* Add to Cart and quantity selector */}
      {seller && (
        <div class="mb-[54px]">
          <AddToCartWithQuantity
            skuId={productID}
            sellerId={seller}
            price={price ?? 0}
            discount={price && listPrice ? listPrice - price : 0}
            name={product.name ?? ""}
            productGroupId={product.isVariantOf?.productGroupID ?? ""}
          />
        </div>
      )}
      {/* Benefits */}
      <div class="bg-secondary py-[34px] px-6 rounded-xl">
        <h3 class="text-primary text-2xl font-bold">Benefícios</h3>
        <ul class="text-white text-sm font-bold list-disc py-5 px-4 leading-[26px]">
          <li>Estimula a renovação celular</li>
          <li>Atua no controle da oleosidade</li>
          <li>Auxilia na uniformização do tom da pele</li>
          <li>Clareia manchas</li>
          <li>Hidrata profundamente</li>
          <li>Estimula a produção de colágeno</li>
          <li>Anti-aging, previne o envelhecimento e formação de rugas</li>
        </ul>
      </div>
      {/* Description card */}
      {description && <ProductDescription description={description} />}

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
                class="rounded-xl w-[calc(100vw*177/1920)] aspect-square"
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
                  type="click"
                  src={img.url!}
                  class="snap-center md:w-[calc(100vw*692/1920)] aspect-square cursor-zoom-in"
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
        <div class="px-4 sm:px-8">
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
