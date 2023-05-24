import TabsControlSetup from "deco-sites/fashion/islands/TabsControlSetup.tsx";
import ProductTags from "deco-sites/fashion/islands/ProductTags.tsx";
import type { ProductInfos } from "deco-sites/fashion/components/product/ProductDetails.tsx";

interface Props {
  description: string;
  productInfos?: ProductInfos;
}

function ProductDescription({ description, productInfos }: Props) {
  return (
    <div id="description" class="mt-4 sm:mt-6">
      <div class="flex gap-x-7 border-b-2 w-fit">
        <button
          data-tab-button
          data-active
          class="text-lg py-1 font-bold border-b-[5px] border-transparent data-[active]:border-primary data-[active]:text-primary"
        >
          Descrição
        </button>
        {productInfos && (
          <>
            <button
              data-tab-button
              class="text-lg py-1 font-bold border-b-[5px] border-transparent data-[active]:border-primary data-[active]:text-primary"
            >
              Ativos
            </button>
            <button
              data-tab-button
              class="text-lg py-1 font-bold border-b-[5px] border-transparent data-[active]:border-primary data-[active]:text-primary"
            >
              Como usar
            </button>
          </>
        )}
      </div>
      <div class="py-6">
        <div
          data-tab-content
          data-active
          class="hidden data-[active]:block"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        >
        </div>
        {productInfos && (
          <>
            <div data-tab-content class="hidden data-[active]:block">
              <ProductTags tags={productInfos.tags} />
            </div>
            <div
              data-tab-content
              class="hidden data-[active]:block"
              dangerouslySetInnerHTML={{
                __html: productInfos.howToUse,
              }}
            >
            </div>
          </>
        )}
      </div>
      <TabsControlSetup rootId="description" />
    </div>
  );
}

export default ProductDescription;
