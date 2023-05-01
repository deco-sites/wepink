import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";

export interface Props {
  products: LoaderReturnType<Product[] | null>;
}

function FeaturedProduct({ products }: Props) {
  const product = products?.[0];

  if (!product) return <div></div>;

  const { offers, name, description, image, url } = product;
  const { price } = useOffer(offers);

  return (
    <Container class="px-3 lg:px-0">
      <div class="flex flex-col lg:flex-row justify-center gap-x-3 gap-y-1.5 rounded-md overflow-hidden border lg:rounded-none lg:overflow-visible lg:border-none">
        <Image
          src={image?.[0].url!}
          alt={image?.[0].alternateName!}
          width={480}
          height={480}
          class="lg:shadow-xl lg:rounded-l-md"
        />
        <div class="flex flex-col justify-center p-10 bg-primary h-auto w-full max-w-[480px] lg:shadow-xl lg:rounded-r-md">
          <Text class="mb-6 text-primary-content text-xl !font-bold">
            #destaques do mês
          </Text>
          <Text class="mb-[26px] text-primary-content !text-[22px] !font-bold">
            {name}
          </Text>
          <Text class="mb-9 text-primary-content">
            {description}
          </Text>
          <Text class="mb-6 text-primary-content text-[17px] !font-bold">
            {formatPrice(price, offers!.priceCurrency!)}
          </Text>
          <Button
            as="a"
            href={url}
            class="!border-white w-[180px] !border !font-normal !text-base"
          >
            eu quero!
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default FeaturedProduct;
