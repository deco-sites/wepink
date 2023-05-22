import type {
  BreadcrumbList,
  Filter,
  Product,
  SortOption,
} from "deco-sites/std/commerce/types.ts";

export interface ProductListingPage {
  "@type": "ProductListingPage";
  breadcrumb: BreadcrumbList;
  filters: Filter[];
  products: Product[];
  pageInfo: {
    currentPage: number;
    nextPage: string | undefined;
    previousPage: string | undefined;
  };
  sortOptions: SortOption[];
  pathName: string;
}
