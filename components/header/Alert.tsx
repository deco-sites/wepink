import type { HTML } from "deco-sites/std/components/types.ts";

import Text from "deco-sites/fashion/components/ui/Text.tsx";
import SliderControllerJS from "deco-sites/fashion/islands/SliderJS.tsx";
import { Slider } from "deco-sites/fashion/components/ui/Slider.tsx";
import { useId } from "preact/hooks";

export interface Props {
  alerts: HTML[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div id={id}>
      <Slider class="bg-primary gap-6 scrollbar-none">
        {alerts.map((alert) => (
          <Text
            class="flex justify-center items-center w-screen h-11 [&_a]:underline"
            variant="caption"
            tone="primary-content"
            dangerouslySetInnerHTML={{ __html: alert }}
          />
        ))}
      </Slider>

      <SliderControllerJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
