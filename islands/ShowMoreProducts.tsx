import ProductGallery from "deco-sites/fashion/components/product/ProductGallery.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import { useMoreProducts } from "deco-sites/fashion/sdk/useMoreProducts.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

interface Props {
  initialPage: ProductListingPage;
}

function ShowMoreProducts({ initialPage }: Props) {
  const { fetchMore, page } = useMoreProducts();
  const products = page.value?.products ?? [];

  console.log(initialPage.pageInfo);
  const nextPage = initialPage.pageInfo?.currentPage + 1;

  return (
    <div class="flex flex-col items-center">
      <ProductGallery products={products} />
      {initialPage?.pageInfo?.nextPage && (
        <Button
          class="!h-10 w-32 mt-3"
          onClick={() => fetchMore(nextPage)}
        >
          mostrar mais
        </Button>
      )}
    </div>
  );
}

export default ShowMoreProducts;
