import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import { asset } from "$fresh/runtime.ts";
import Image from "deco-sites/std/components/Image.tsx";

export interface Item {
  title: string;
  href: string;
}

export interface Props {
  items: Item[];
}

function Footer({ items = [] }: Props) {
  return (
    <footer class="bg-primary lg:pb-40 pb-12">
      <Container class="px-[24px] lg:px-[100px] pt-[60px] lg:pt-[80px] pb-[50px] lg:pb-[85px] flex flex-col lg:flex-row justify-between">
        <div class="flex-1 mb-5 lg:mb-0">
          <Icon
            id="Logo"
            class="text-white mb-7 lg:mb-12 h-[32px] w-[120px] lg:h-[48px] lg:w-[180px]"
          />
          <ul>
            {items.map(({ title, href }) => (
              <li>
                <a href={href} class="flex items-center gap-x-2.5">
                  <span class="text-sm leading-[34px] text-primary-content">
                    {title}
                  </span>
                  <Icon
                    id="ArrowRight"
                    height={9}
                    width={9}
                    class="text-primary-content"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div class="flex flex-col flex-1 items-center gap-10">
          <div class="flex gap-x-5">
            <a href="#">
              <Icon
                id="FooterInstagram"
                height={51}
                width={51}
              />
            </a>
            <a href="#">
              <Icon
                id="FooterFacebook"
                height={51}
                width={51}
              />
            </a>
          </div>
          <div class="flex items-center gap-x-3 ">
            <a
              id="seloEbit"
              href="http://www.ebit.com.br/116625/selo"
              target="_blank"
            >
              <Image
                src="https://newimgebit-a.akamaihd.net/ebitBR/selo/img_116625.png"
                style="border: 0px;"
                width={50}
              />
            </a>
            <a
              href="https://www.reclameaqui.com.br/empresa/wepink/?utm_source=referral&utm_medium=embbed&utm_campaign=reputacao&utm_term=horizontal"
              target="_blank"
            >
              <Image
                src={"https://iili.io/HShPMe2.md.png"}
                alt="Reclame aqui"
                width={136}
                class="rounded-sm"
              />
            </a>
          </div>
          <a href="#header" class="hidden lg:flex items-center gap-3">
            <Icon id="ArrowTop" height={24} width={24} />
            <span class="text-white">
              voltar ao topo
            </span>
          </a>
        </div>
        <div class="flex flex-col flex-1 items-center gap-5 lg:gap-7 mt-20">
          <div class="flex gap-3 lg:gap-5">
            <Image
              src="https://wepink.vtexassets.com/assets/vtex/assets-builder/wepink.store-theme/0.0.1009/svg/visa___e411afdf7f4f5a87e368bb90951f8e21.svg"
              width={50}
              class="w-[35px] lg:w-[50px]"
            />
            <Image
              src="https://wepink.vtexassets.com/assets/vtex/assets-builder/wepink.store-theme/0.0.1009/svg/mastercard___bef22abd904b16a89535383905436dd7.svg"
              width={44}
              class="w-[30px] lg:w-[44px]"
            />
            <Image
              src="https://wepink.vtexassets.com/assets/vtex/assets-builder/wepink.store-theme/0.0.1009/svg/diners-club___d5f0c1f692b4080d769cf5f1502612b4.svg"
              width={50}
              class="w-[35px] lg:w-[50px]"
            />
            <Image
              src="https://wepink.vtexassets.com/assets/vtex/assets-builder/wepink.store-theme/0.0.1009/svg/amex___045d938b33e402cfa188a879eb063008.svg"
              width={50}
              class="w-[35px] lg:w-[50px]"
            />
          </div>
          <div class="flex gap-3 lg:gap-5">
            <Image
              src="https://wepink.vtexassets.com/assets/vtex/assets-builder/wepink.store-theme/0.0.1009/svg/picpay___b49ce7fb6b81ca97c545131b12a2d2bd.svg"
              width={50}
              class="h-8 lg:h-11 w-auto"
            />
            <Image
              src="https://wepink.vtexassets.com/assets/vtex/assets-builder/wepink.store-theme/0.0.1009/svg/boleto___cdd876a1d31c662ed837adb5a5824799.svg"
              width={50}
              class="h-8 lg:h-11 w-auto"
            />
            <Image
              src="https://wepink.vtexassets.com/assets/vtex/assets-builder/wepink.store-theme/0.0.1009/svg/pix___01c4699613640d38300e9f0e7f2a621d.svg"
              width={50}
              class="h-8 lg:h-11 w-auto"
            />
          </div>
          <a href="#header" class="flex lg:hidden items-center gap-3 mt-3">
            <Icon id="ArrowTop" height={24} width={24} />
            <span class="text-white text-xs">
              voltar ao topo
            </span>
          </a>
        </div>
      </Container>
      <Container class="flex gap-1 justify-center text-white text-xs lg:text-sm mb-10">
        <a href="">Politica de privacidade</a>
        |
        <a href="">Termos de uso</a>
      </Container>
      <Container class="flex lg:hidden gap-1 justify-center text-white text-xs px-6 text-center">
        Todos os direitos reservados © 2022 | SAVI COSMÉTICOS LTDA | CNPJ:
        42.422.967/0001-01
      </Container>
    </footer>
  );
}

export default Footer;
