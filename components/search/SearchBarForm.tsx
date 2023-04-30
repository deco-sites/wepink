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
      class="flex-grow flex border-default bg-grey-200 flex-1 bg-white rounded-xl"
    >
      <button
        class="h-full w-10 lg:w-9 grid place-items-center focus:outline-none"
        aria-label="Search"
        htmlFor="searchbar"
        tabIndex={-1}
      >
        <Icon
          class="text-primary"
          id="MagnifyingGlass"
          width={16}
          height={16}
          strokeWidth={0.01}
        />
      </button>
      <input
        id="search-input"
        class="flex-grow outline-none bg-transparent h-[42px] lg:h-10 pb-[2px] text-[12px] text-default placeholder-black text-black w-auto"
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
    </form>
  );
}

export default SearchBarForm;
