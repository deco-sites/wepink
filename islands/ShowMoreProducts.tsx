import ViewSendEvent from "deco-sites/fashion/components/ViewSendEvent.tsx";
import ProductGallery from "deco-sites/fashion/components/product/ProductGallery.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import { useMoreProducts } from "deco-sites/fashion/sdk/useMoreProducts.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";

interface Props {
  initialPage: number;
}

function ShowMoreProducts({ initialPage }: Props) {
  const { fetchMore, page } = useMoreProducts();
  const products = page.value?.products ?? [];
  const pageToFetch = page.value?.pageInfo.currentPage ?? 0;

  return (
    <div>
      {/* <ProductGallery products={products} /> */}

      <ProductGallery products={products} />

      <Button
        onClick={() => fetchMore(pageToFetch + 1)}
      >
        teste
      </Button>
    </div>
  );
}

export default ShowMoreProducts;
