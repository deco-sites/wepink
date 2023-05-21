import { useEffect, useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";
import type { Suggestion } from "deco-sites/std/commerce/types.ts";
import type { ClientConfigVTEX } from "deco-sites/std/functions/vtexConfig.ts";
import Text from "deco-sites/wepink/components/ui/Text.tsx";
import { useAutocomplete } from "deco-sites/wepink/hooks/useAutocomplete.ts";

import SuggestionsTermList from "deco-sites/wepink/components/search/SuggestionsTermList.tsx";
import SuggestionsProductList from "deco-sites/wepink/components/search/SuggestionsProductList.tsx";
import SearchBarForm, {
  EditableProps as EditableSearchBarFormProps,
} from "deco-sites/wepink/components/search/SearchBarForm.tsx";

export type EditableProps = EditableSearchBarFormProps;

export type Props = EditableProps & {
  /**
   * @title Product suggestions
   * @description Product suggestions displayed on searchs
   */
  suggestions?: Suggestion | null;

  /** used for autocomplete */
  configVTEX?: ClientConfigVTEX;
};

function SearchBar({
  placeholder = "O que você procura?",
  action = "/s",
  name = "q",
  query,
  suggestions: _suggestions,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // const hasFocus = useSignal(false);
  const hasFocus = useSignal(true);
  const { setSearch, suggestions, searchTerm } = useAutocomplete();
  const hasSuggestions = !!suggestions.value;
  const emptySuggestions = suggestions.value?.searches?.length === 0;
  const hasProducts = Boolean(suggestions.value?.products?.length);
  const hasTerms = Boolean(suggestions.value?.searches?.length);
  const notFound = !hasProducts && !hasTerms;

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  function handleClick(e: MouseEvent) {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      hasFocus.value = false;
    } else {
      hasFocus.value = true;
    }
  }

  return (
    <div class="relative flex flex-col flex-1" ref={ref}>
      <div class="flex gap-4">
        <SearchBarForm
          action={action}
          name={name}
          query={query}
          placeholder={placeholder}
          setSearch={setSearch}
        />
      </div>
      <div
        class={`absolute top-10 lg:fixed lg:top-21 lg:max-w-[1248px] lg:group-data-[has-scrolled-past-tres-hold=true]:top-[66px] lg:left-1/2 z-10 bg-info lg:-translate-x-1/2 w-full transition-all shadow-sm ${
          hasFocus.value ? "block" : "hidden"
        }`}
      >
        {hasSuggestions && (
          <div class="flex flex-col py-2 gap-2 w-full ">
            {!emptySuggestions && (
              <div class="lg:grid grid-cols-[30%_70%] lg:py-4">
                <SuggestionsTermList
                  searchTerm={searchTerm.value}
                  terms={suggestions.value?.searches!}
                />
                <SuggestionsProductList
                  products={suggestions.value?.products!}
                  searchTerm={searchTerm.value}
                />
              </div>
            )}
            {notFound && (
              <div class="py-16 md:(py-6!) flex flex-col gap-4 w-full">
                <Text
                  variant="heading-3"
                  class="text-center"
                  role="heading"
                >
                  Nenhum resultado encontrado
                </Text>
                <Text variant="body" class="text-center">
                  Vamos tentar de outro jeito? Verifique a ortografia ou use um
                  termo diferente
                </Text>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
