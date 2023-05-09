import Container from "deco-sites/wepink/components/ui/Container.tsx";
import {
  Slider,
  SliderDots,
} from "deco-sites/fashion/components/ui/Slider.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import SectionTitle from "deco-sites/wepink/components/ui/SectionTitle.tsx";
import SliderControllerJS from "deco-sites/fashion/islands/SliderJS.tsx";

export type BlogPost = {
  image: LiveImage;
  category: string;
  title: string;
  description: string;
  link: string;
};

export interface Props {
  posts: BlogPost[];
}

function BlogPosts({ posts }: Props) {
  return (
    <Container
      id="blog-posts"
      class="bg-[#f4f4f4] pt-11 px-[40px] sm:px-[74px] pb-4 sm:pb-6 mb-16"
    >
      <SectionTitle title="blog" />
      <Slider class="!items-start justify-between mt-[62px] pb-6 sm:pb-0">
        {posts.map(({ image, title, description, category, link }) => (
          <div class="w-[calc(100vw-80px)] sm:w-[404px]">
            <Image
              src={image}
              alt={title}
              width={404}
              height={269}
              class="mb-5 sm:mb-7 rounded-3xl aspect w-full"
            />
            <div class="border rounded-full w-fit px-2 py-1 mb-5 sm:mb-7 border-base-300 text-[10px]">
              {category}
            </div>
            <h3 class="text-2xl text-primary mb-5 sm:mb-7 font-bold">
              {title}
            </h3>
            <p class="leading-6 mb-4">
              {description}
            </p>
            <a href={link} class="text-white underline text-[11px]">
              Leia mais &gt;
            </a>
          </div>
        ))}
      </Slider>
      <SliderDots class="sm:hidden">
        {posts.map(() => (
          <div class="p-1">
            <div class="bg-[#cacbcc] w-2.5 h-2.5 rounded group-disabled:bg-primary" />
          </div>
        ))}
      </SliderDots>
      <SliderControllerJS rootId="blog-posts" />
    </Container>
  );
}

export default BlogPosts;
