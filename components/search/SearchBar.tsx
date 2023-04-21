import { useEffect, useRef, useState } from "preact/hooks";
import type { Suggestion } from "deco-sites/std/commerce/types.ts";
import type { ClientConfigVTEX } from "deco-sites/std/functions/vtexConfig.ts";
import Text from "deco-sites/wepink/components/ui/Text.tsx";
import { useAutocomplete } from "deco-sites/std/commerce/vtex/hooks/useAutocomplete.ts";

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
  configVTEX,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasFocus, setHasFocus] = useState(false);

  const { setSearch, suggestions } = useAutocomplete();
  const hasSuggestions = !!suggestions.value;
  const emptySuggestions = suggestions.value?.searches?.length === 0;

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  function handleClick(e: MouseEvent) {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setHasFocus(false);
    } else {
      setHasFocus(true);
    }
  }

  return (
    <div class="flex flex-col flex-1 relative" ref={ref}>
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
        class={`absolute top-10 left-0 z-10 bg-opacity-95 bg-white w-full transition-all ${
          hasFocus ? "block" : "hidden"
        }`}
      >
        {hasSuggestions && (
          <div class="flex flex-col py-2 gap-2 w-full">
            {!emptySuggestions && (
              <>
                <SuggestionsTermList
                  terms={suggestions.value?.searches!}
                />
                <SuggestionsProductList
                  products={suggestions.value?.products!}
                />
              </>
            )}
            {emptySuggestions && (
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
