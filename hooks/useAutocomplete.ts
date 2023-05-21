import { signal } from "@preact/signals";
import { debounce } from "std/async/debounce.ts";

import { Suggestion } from "deco-sites/std/commerce/types.ts";
import { Runtime } from "deco-sites/std/commerce/sdk/runtime.ts";

const suggestions = signal<Suggestion | null>(null);
const searchTerm = signal<string>("");

const fetchSuggestions = async (query: string) => {
  try {
    return await Runtime.invoke({
      key: "deco-sites/std/functions/vtexSuggestions.ts",
      props: { count: 4, query },
    });
  } catch (error) {
    console.error("Something went wrong with the suggestion \n", error);
    return null;
  }
};

const setSearch = debounce(async (search: string) => {
  if (search === "") {
    suggestions.value = null;
    return;
  }

  const _suggestion = await fetchSuggestions(
    search,
  );

  suggestions.value = _suggestion;
  searchTerm.value = search;
}, 250);

const state = {
  setSearch,
  suggestions,
  searchTerm,
};

/**
 * This hook only works if the vtex intelligent search app is installed at VTEX Account.
 */
export const useAutocomplete = () => state;
