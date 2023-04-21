import Text from "deco-sites/wepink/components/ui/Text.tsx";
import { JSX } from "preact";

interface Props
  extends Omit<JSX.HTMLAttributes<HTMLUListElement>, "class" | "className"> {
  terms: { term: string }[];
}

export default function SuggestionsTermList(
  { terms, title, ...ulProps }: Props,
) {
  return (
    <div class="flex flex-col w-full">
      <ul {...ulProps} class="flex flex-col">
        {terms.map(({ term }) => (
          <li>
            <a
              href={`/s?q=${term}`}
              class="items-center px-3 py-1 block hover:pl-4 transition-all"
            >
              <Text variant="body" class="text-[15px] text-black">
                {term}
              </Text>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
