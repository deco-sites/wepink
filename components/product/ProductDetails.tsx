import type { LoaderReturnType } from "$live/types.ts";
import ViewSendEvent from "deco-sites/fashion/components/ViewSendEvent.tsx";
import Breadcrumb from "deco-sites/fashion/components/ui/Breadcrumb.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import BuyTogether from "deco-sites/fashion/islands/BuyTogether.tsx";
import {
  Slider,
  SliderDots,
} from "deco-sites/fashion/components/ui/Slider.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";
import ProductDescription from "deco-sites/fashion/components/product/ProductDescription.tsx";
import SliderJS from "deco-sites/fashion/components/ui/SliderJS.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import AddToCartWithQuantity from "deco-sites/fashion/islands/AddToCartWithQuantity.tsx";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import Image from "deco-sites/std/components/Image.tsx";
import { useId } from "preact/hooks";

import ProductImageZoom from "deco-sites/fashion/islands/ProductImageZoom.tsx";
import ZoomableImage from "deco-sites/fashion/islands/ZoomableImage.tsx";

export type Variant = "front-back" | "slider" | "auto";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  /**
   * @title Buy Togheter
   * @description Products to be shown in the buy together section
   */
  buyTogether: LoaderReturnType<Product[] | null>;
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

function ProductInfo(
  { page, buyTogether }: {
    page: ProductDetailsPage;
    buyTogether: Product[] | null;
  },
) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    name,
    isVariantOf,
    additionalProperty,
  } = product;
  const { price, listPrice, seller, installments } = useOffer(offers);

  const shortDescription = isVariantOf?.additionalProperty?.find((property) =>
    property.name === "descricao_curta"
  )?.value;

  return (
    <>
      {/* Breadcrumb */}
      <div class="hidden md:block">
        <Breadcrumb
          itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
          productName={name}
        />
      </div>
      {/* Code and name */}
      <div class="mt-4 sm:mt-3 mb-3">
        <h1>
          <span class="text-primary text-2xl font-bold">{name}</span>
        </h1>
      </div>
      {/* Code and name */}
      <div class="mb-3">
        <span class="text-sm">
          {shortDescription}
        </span>
      </div>

      {/* Mocked Ratings */}
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
        <div class="fixed z-10 bottom-0 left-0 w-full bg-white md:static md:mb-[54px] md:w-auto">
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
      <div class="max-md:w-[100vw] max-md:-ml-6 bg-secondary py-[34px] px-6 md:rounded-xl">
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

      {/* Buy together */}
      {buyTogether && (
        <div class="mt-8 mx-auto w-fit">
          <BuyTogether currentProduct={product} buyTogether={buyTogether} />
        </div>
      )}

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
  buyTogether,
}: { page: ProductDetailsPage; buyTogether: Product[] | null }) {
  const id = `product-image-gallery:${useId()}`;
  const { product: { name, image: images = [], isVariantOf } } = page;

  return (
    <>
      {/* Breadcrumb */}
      <div class="md:hidden px-6 py-4">
        <Breadcrumb
          itemListElement={page.breadcrumbList?.itemListElement.slice(0, -1)}
          productName={name}
        />
      </div>
      <div
        id={id}
        class="flex flex-col md:grid grid-cols-1 md:grid-cols-[55%_45%] gap-4 md:gap-8"
      >
        <div class="md:flex justify-between h-fit md:sticky md:top-[168px]">
          {/* Dots */}
          <div class="relative hidden md:block overflow-auto sm:px-0">
            <SliderDots
              class="gap-2 flex flex-col sm:justify-start h-[calc(100vw*600/1920)] w-[calc(100vw*177/1920)] scrollbar-none pb-[60px]"
              snap="w-[calc(100vw*177/1920)]"
            >
              {images.map((img, _) => (
                <Image
                  class="rounded-xl w-[calc(100vw*177/1920)] aspect-square"
                  width={177}
                  src={img.url!}
                  alt={img.alternateName}
                />
              ))}
            </SliderDots>
            <div class="w-full h-[60px] bg-gradient-to-b from-transparent to-white absolute bottom-0 left-0" />
          </div>

          {/* Image Slider */}
          <div class="relative md:w-[calc(100vw*600/1920)] flex-grow-1 h-fit">
            <Slider
              class="gap-6 scrollbar-none"
              snap="md:w-[calc(100vw*600/1920)] snap-center"
            >
              {images.map((img, index) => (
                <ZoomableImage
                  factor={2}
                  type="click"
                  src={img.url!}
                  class="snap-center md:w-[calc(100vw*600/1920)] aspect-square cursor-zoom-in"
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
        </div>

        {/* Product Info */}
        <div class="px-6 sm:px-8">
          <ProductInfo page={page} buyTogether={buyTogether} />
        </div>
      </div>
      <SliderJS rootId={id}></SliderJS>
    </>
  );
}

function ProductDetails({ page, buyTogether }: Props) {
  return (
    <Container class="pb-10 sm:py-10 sm:pb-12">
      {page ? <Details page={page} buyTogether={buyTogether} /> : <NotFound />}
    </Container>
  );
}

export default ProductDetails;
