import TabsControlSetup from "deco-sites/fashion/islands/TabsControlSetup.tsx";
import ProductTags from "deco-sites/fashion/islands/ProductTags.tsx";

interface Props {
  description: string;
}

const tags = [
  {
    name: "Vitamina e",
    description:
      "Age especialmente como calmante, lubrificante, hidratante e regenerador da pele, pois combate a ação do tempo, do sol, da poluição e os radicais livres, que causam as linhas de expressão, rugas e o envelhecimento precoce. Atua também como um estimulante de colágeno, aumentando a firmeza e elasticidade.",
  },
  {
    name: "ácido hialurônico",
    description:
      "Indicado para todos os tipos de pele, o ácido hialurônico ajuda na sustentação e hidratação da pele, evitando a flacidez, as linhas e sinais de expressão, garantindo à pele uma textura mais viçosa e uniforme.",
  },
  {
    name: "niacinamida",
    description:
      "Conhecida como Vitamina B3, a niacinamida age em favor da proteção e revigoramento da pele. Ela tem um alto poder antioxidante, ajudando a combater o envelhecimento precoce, as linhas de expressão e as rugas, contribuindo para uma pele mais viçosa e iluminada. Além disso, hidrata e reduz a oleosidade.",
  },
  {
    name: "esqualano vegetal",
    description:
      "O esqualano à base de plantas tem muitos benefícios para a pele. Entre eles, ajuda a fortalecer a barreira protetora natural, protegendo de agressões externas (poluição, sujidade, etc) e também impede a desidratação da pele, pois atua como emoliente.",
  },
];

function ProductDescription({ description }: Props) {
  return (
    <div id="description" class="mt-4 sm:mt-6">
      <div class="flex gap-x-7 border-b-2 w-fit">
        <button
          data-tab-button
          data-active
          class="text-lg py-1 font-bold border-b-[5px] border-transparent data-[active]:border-primary data-[active]:text-primary"
        >
          Descrição
        </button>
        <button
          data-tab-button
          class="text-lg py-1 font-bold border-b-[5px] border-transparent data-[active]:border-primary data-[active]:text-primary"
        >
          Ativos
        </button>
        <button
          data-tab-button
          class="text-lg py-1 font-bold border-b-[5px] border-transparent data-[active]:border-primary data-[active]:text-primary"
        >
          Como usar
        </button>
      </div>
      <div class="py-6">
        <div
          data-tab-content
          data-active
          class="hidden data-[active]:block"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        >
        </div>
        <div data-tab-content class="hidden data-[active]:block">
          <ProductTags tags={tags} />
        </div>
        <div data-tab-content class="hidden data-[active]:block">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere
            incidunt accusamus harum dicta unde placeat aliquam cumque animi
            eius mollitia, illo voluptates porro ducimus delectus accusantium
            quisquam iure, qui dolor.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia
            accusantium nulla maxime cum deserunt laboriosam odit esse
            consequatur incidunt facilis aliquid, autem corporis, tempora earum
            dolore quasi commodi excepturi temporibus!
          </p>
        </div>
      </div>
      <TabsControlSetup rootId="description" />
    </div>
  );
}

export default ProductDescription;
