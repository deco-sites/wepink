import Filters from "deco-sites/fashion/components/search/Filters.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import SearchControls from "deco-sites/fashion/islands/SearchControls.tsx";
import ViewSendEvent from "deco-sites/fashion/components/ViewSendEvent.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import ProductGallery, {
  Columns,
} from "deco-sites/fashion/components/product/ProductGallery.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import { useMoreProducts } from "deco-sites/fashion/sdk/useMoreProducts.ts";
import ShowMoreProducts from "../../islands/ShowMoreProducts.tsx";

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns: Columns;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <Text>Not Found!</Text>
    </div>
  );
}

function Result({
  page,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, pageInfo } = page;
  const { fetchMore, page: _page } = useMoreProducts();

  return (
    <>
      <Container class="px-4 sm:py-10">
        <ProductGallery products={products} />
        <ShowMoreProducts
          initialPage={pageInfo.currentPage ?? 0}
        />
      </Container>
    </>
  );
}

function SearchResult({ page, ...props }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
