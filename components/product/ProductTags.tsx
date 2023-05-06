import { useSignal } from "@preact/signals";
import Button from "deco-sites/fashion/components/ui/Button.tsx";

export interface ProductTag {
  name: string;
  description: string;
}

interface Props {
  tags: ProductTag[];
}

function ProductTags({ tags }: Props) {
  const isOpen = useSignal(false);

  return (
    <div class="relative max-w-sm">
      <div class="flex flex-wrap gap-x-3 gap-y-6 max-w-sm mb-6">
        {tags.map((tag) => (
          <div>
            <h4 class="w-fit bg-primary text-white px-2 py-1 rounded-full text-xs font-bold">
              {tag.name}
            </h4>
            {isOpen.value && <p class="text-sm pt-3">{tag.description}</p>}
          </div>
        ))}
      </div>
      <Button
        data-is-open={isOpen}
        class="max-h-8 !text-black underline text-xs data-[is-open=true]:absolute -top-1 right-0"
        onClick={() => isOpen.value = !isOpen.value}
      >
        {isOpen.value ? "fechar detalhes" : "ver detalhes"}
      </Button>
    </div>
  );
}

export default ProductTags;
