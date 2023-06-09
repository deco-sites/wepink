import type { LoaderReturnType } from "$live/types.ts";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import type { ProductListingPage } from "deco-sites/wepink/types/types.ts";

export interface Banner {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /** @description text to be rendered on top of the image */
  title?: string;
  /** @description text to be rendered on top of the image */
  subtitle?: string;
  image: {
    /** @description Image for big screens */
    desktop: LiveImage;
    /** @description Image for small screens */
    mobile: LiveImage;
    /** @description image alt text */
    alt?: string;
  };
}

export interface Props {
  page?: LoaderReturnType<ProductListingPage | null>;
  banners?: Banner[];
}

function BannerUI({ banner }: { banner: Banner }) {
  const { title, subtitle, image } = banner;

  return (
    <div class="grid grid-cols-1 grid-rows-1 md:py-4">
      <Picture preload class="col-start-1 col-span-1 row-start-1 row-span-1">
        <Source
          src={image.mobile}
          width={375}
          height={96}
          media="(max-width: 767px)"
        />
        <Source
          src={image.desktop}
          width={1440}
          height={130}
          media="(min-width: 767px)"
        />
        <img class="w-full" src={image.desktop} alt={image.alt ?? title} />
      </Picture>

      <div class="flex flex-col items-center justify-center  col-start-1 col-span-1 row-start-1 row-span-1 w-full">
        <h1>
          <span class="text-5xl md:text-3xl text-primary md:text-white font-bold font-title">
            {title}
          </span>
        </h1>
      </div>
    </div>
  );
}

/**
 * TODO: run the matcher agains the true URL instead on the breadcrumb.
 * This way we can remove the need for a loader. This can be done on live@1.x
 */
function Banner({ page, banners = [] }: Props) {
  if (!page) {
    return null;
  }

  const matching = banners.find(({ matcher }) =>
    new RegExp(matcher).test(page.pathName)
  );

  if (!matching) {
    return null;
  }

  return <BannerUI banner={matching} />;
}

export default Banner;
