import Container from "deco-sites/wepink/components/ui/Container.tsx";
import Icon from "deco-sites/wepink/components/ui/Icon.tsx";
import SectionTitle from "deco-sites/wepink/components/ui/SectionTitle.tsx";
import { Slider } from "deco-sites/wepink/components/ui/Slider.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

export interface InstagramPost {
  image: LiveImage;
  alt: string;
  href: string;
}

export interface Props {
  posts: InstagramPost[];
}

function Post({ image, alt, href }: InstagramPost) {
  return (
    <a href={href} class="relative group">
      <Image
        class="aspect-square object-cover"
        src={image}
        alt={alt}
        width={404}
      />
      <div class="absolute grid place-items-center bg-primary inset-0 bg-opacity-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity">
        <Icon
          id="Instagram"
          height={100}
          width={100}
          class="hidden md:block text-white"
          strokeWidth={1.5}
        />
        <Icon
          id="Instagram"
          height={45}
          width={45}
          class="block md:hidden text-white"
          strokeWidth={1.5}
        />
      </div>
    </a>
  );
}

function InstagramPosts({ posts }: Props) {
  return (
    <Container class="mb-11 px-[5px] md:px-2.5">
      <SectionTitle title="siga @wepink.br" />
      <div class="hidden md:grid md:grid-rows-2 md:grid-cols-4 md:gap-5">
        {posts.map(({ image, alt, href }) => (
          <Post image={image} alt={alt} href={href} />
        ))}
      </div>
      <Slider class="block md:hidden gap-2.5" snap="snap-start">
        {posts.map(({ image, alt, href }) => (
          <div class="aspect-square object-cover min-w-[calc(50vw-10px)]">
            <Post image={image} alt={alt} href={href} />
          </div>
        ))}
      </Slider>
    </Container>
  );
}

export default InstagramPosts;
