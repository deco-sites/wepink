import { useRef } from "preact/compat";

import Icon from "deco-sites/wepink/components/ui/Icon.tsx";

export interface EditableProps {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;
  /**
   * TODO: Receive querystring from parameter in the server-side
   */
  query?: string;
}

type Props = EditableProps & {
  setSearch?: (search: string) => void;
  handleFocus?: () => void;
};

function SearchBarForm(
  { action, name, query, placeholder, setSearch, handleFocus }: Props,
) {
  return (
    <form
      id="searchbar"
      action={action}
      class="flex-grow flex border-default bg-grey-200 rounded-[11px] overflow-hidden flex-1"
    >
      <input
        id="search-input"
        class="flex-grow outline-none bg-transparent px-5 h-10 pb-[2px] text-[12px] text-default placeholder-grey-500"
        name={name}
        defaultValue={query}
        onInput={(e) => {
          const value = e.currentTarget.value;
          setSearch?.(value);
        }}
        onFocus={() => {
          handleFocus?.();
        }}
        placeholder={placeholder}
        autocomplete="off"
      />
      <button
        class="h-full w-14 grid place-items-center focus:outline-none"
        aria-label="Search"
        htmlFor="searchbar"
        tabIndex={-1}
      >
        <Icon
          class="text-primary"
          id="MagnifyingGlass"
          width={22}
          height={22}
          strokeWidth={0.01}
        />
      </button>
    </form>
  );
}

export default SearchBarForm;
