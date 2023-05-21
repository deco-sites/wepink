import Text from "deco-sites/wepink/components/ui/Text.tsx";
import { JSX } from "preact";

interface Props
  extends Omit<JSX.HTMLAttributes<HTMLUListElement>, "class" | "className"> {
  terms: { term: string }[];
  searchTerm: string;
}

export default function SuggestionsTermList(
  { terms, searchTerm, title, ...ulProps }: Props,
) {
  return (
    <div class="flex flex-col w-full md:px-2">
      <h3 class="hidden lg:block uppercase font-bold text-sm text-neutral-700 px-2.5 mb-2">
        Sugestões
      </h3>
      <ul {...ulProps} class="flex flex-col">
        {terms.map(({ term }) => {
          const splittedTerm = term.split(searchTerm);
          const preTerm = splittedTerm[0];
          const postTerm = splittedTerm[1];

          return (
            <li>
              <a
                href={`/s?q=${term}`}
                class="items-center px-3 py-1 block hover:pl-4 transition-all"
              >
                <span class="block text-[13px] text-neutral-700">
                  {preTerm}
                  <strong>{searchTerm}</strong>
                  {postTerm}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
