import type { Props as SearchBarProps } from "deco-sites/wepink/components/search/SearchBar.tsx";
import { lazy, Suspense } from "preact/compat";
import SearchBarForm from "deco-sites/wepink/components/search/SearchBarForm.tsx";

const SearchBar = lazy(() =>
  import("deco-sites/wepink/components/search/SearchBar.tsx")
);

interface Props {
  searchBar: SearchBarProps;
}

export default function headerSearchBar({ searchBar }: Props) {
  const shouldRender = self?.location;

  return (
    <div
      class={"w-full"}
    >
      {shouldRender && (
        <Suspense fallback={<SearchBarForm />}>
          <SearchBar {...searchBar} />
        </Suspense>
      )}
    </div>
  );
}
