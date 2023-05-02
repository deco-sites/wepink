import type { LoaderReturnType } from "$live/types.ts";
import ProductGallery, {
  Columns,
} from "deco-sites/fashion/components/product/ProductGallery.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import ShowMoreProducts from "deco-sites/fashion/islands/ShowMoreProducts.tsx";
import SectionTitle from "deco-sites/fashion/components/ui/SectionTitle.tsx";

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

  return (
    <>
      <Container class="px-4 sm:py-10">
        <SectionTitle title="uma linha completa pra você" />

        <ProductGallery products={products} />

        <ShowMoreProducts
          initialPage={page}
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
