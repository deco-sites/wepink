import { signal } from "@preact/signals";

import { Runtime } from "deco-sites/std/commerce/sdk/runtime.ts";
import { ProductListingPage } from "deco-sites/std/commerce/types.ts";

const page = signal<ProductListingPage | null>(null);

const fetchMoreProducts = async (pageToFetch: number) => {
  try {
    return await Runtime.invoke({
      // @ts-ignore
      key: "deco-sites/wepink/functions/vtexProductListingPage.ts",
      // @ts-ignore
      props: { count: 8, currentPage: pageToFetch },
    });
  } catch (error) {
    console.error("Something went wrong with the search \n", error);
    return null;
  }
};

const fetchMore = async (pageToFetch: number) => {
  const _page = await fetchMoreProducts(pageToFetch);

  // changes url page query param
  const url = new URL(window.location.href);
  url.searchParams.set("page", pageToFetch.toString());
  window.history.replaceState({}, "", url.toString());

  // @ts-ignore
  page.value = {
    ..._page,
    // @ts-ignore
    products: [...page.value?.products ?? [], ..._page?.products ?? []],
  };
};

const state = {
  fetchMore,
  page,
};

/**
 * This hook only works if the vtex intelligent search app is installed at VTEX Account.
 */
export const useMoreProducts = () => state;
