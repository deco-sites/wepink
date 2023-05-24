import { useSignal } from "@preact/signals";
import Container from "deco-sites/wepink/components/ui/Container.tsx";
import Icon from "deco-sites/wepink/components/ui/Icon.tsx";

export type Rating = {
  name: string;
  title?: string;
  text: string;
  rating: number;
  recommended?: boolean;
  notRecommended?: boolean;
  date: string;
};

export interface Props {
  ratings: Rating[];
}

function Stars({ rating }: { rating: number }) {
  const ratingPercentage = (rating / 5) * 100;

  return (
    <div class="relative h-6 w-[120px]">
      <div class="absolute top-0 left-0 flex">
        {Array.from({ length: 5 }).map(() => (
          <Icon
            id="Star"
            height={24}
            width={24}
            class="text-[#dddddd] flex-shrink-0"
          />
        ))}
      </div>
      <div
        class="absolute top-0 left-0 flex overflow-hidden"
        style={{
          width: `${ratingPercentage}%`,
        }}
      >
        {Array.from({ length: 5 }).map(() => (
          <Icon
            id="Star"
            height={24}
            width={24}
            class="text-primary flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
}

const filterOptions = [
  {
    label: "mais recentes",
    value: "recent",
  },
  {
    label: "positivas",
    value: "positive",
  },
  {
    label: "negativas",
    value: "positive",
  },
];

function Ratings({ ratings }: Props) {
  const selectedFilter = useSignal("recent");
  const selectedFilterLabel = filterOptions.find((filterOption) =>
    filterOption.value === selectedFilter.value
  )?.label;

  const averageRating =
    ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;
  const recommendedPercentage = ratings.reduce(
    (acc, rating) => acc + (rating.recommended ? 1 : 0),
    0,
  ) / ratings.length * 100;

  return (
    <Container>
      <div class="bg-info p-6 rounded-xl flex justify-center items-center gap-12 mb-6">
        <div class="flex flex-col items-center">
          <div>
            <strong class="text-6xl">
              {averageRating.toFixed(1)}
              <span class="text-2xl">
                /5
              </span>
            </strong>
          </div>
          <span class="uppercase text-sm">
            Nota do produto
          </span>
          <Stars rating={averageRating} />
          <span class="text-[13px] font-bold mt-1">
            Baseado em {ratings.length} avaliações
          </span>
        </div>
        <div class="flex items-center gap-2">
          <div
            className="radial-progress h-14 w-14 text-[#ffc400]"
            style={{
              "--value": recommendedPercentage,
              "--size": "56px",
              "--thickness": "5px",
            }}
          >
            <span class="text-black font-bold text-sm">
              {recommendedPercentage.toFixed(0)}%
            </span>
          </div>
          <span class="text-[13px] font-bold leading-4">
            dos clientes recomendam<br />esse produto
          </span>
        </div>
      </div>
      <div class="bg-info rounded-xl flex px-6 py-10 items-center justify-between mb-6">
        <span class="text-2xl font-bold ">
          Avaliações {selectedFilterLabel}
        </span>
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="m-1 border border-black rounded-md flex items-center justify-between w-75 px-3 py-2"
          >
            {selectedFilterLabel}
            <Icon
              id="ChevronDown"
              height={18}
              width={18}
              strokeWidth={2}
              class="text-black"
            />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content p-2 shadow bg-base-100 rounded-box w-52"
          >
            {filterOptions.map(({ label, value }) => (
              <li
                class="cursor-pointer"
                onClick={() => selectedFilter.value = value}
              >
                <a>{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {ratings.map((rating) => (
        <div class="bg-info rounded-xl grid grid-cols-1 lg:grid-cols-[160px_auto] pr-6 py-5 items-center mb-6 gap-y-2">
          <div class="flex flex-col items-center justify-center text-[10px] px-7 col-start-1 row-start-5 lg:row-start-1 lg:row-span-5">
            <span>
              {rating.name}
            </span>
            <span>
              {rating.date}
            </span>
          </div>
          <div class="col-start-1 lg:col-start-2">
            <Stars rating={rating.rating} />
          </div>
          <p class="col-start-1 lg:col-start-2">
            {rating.title}
          </p>
          <p class="col-start-1 lg:col-start-2">
            {rating.text}
          </p>
          {rating.recommended && (
            <p class="col-start-1 lg:col-start-2 mt-2">
              🙂 Sim, eu recomendo este produto
            </p>
          )}
          {rating.notRecommended && (
            <p class="col-start-1 lg:col-start-2 mt--2">
              ☹️ Não, eu não recomendo este produto
            </p>
          )}
        </div>
      ))}
    </Container>
  );
}

export default Ratings;
