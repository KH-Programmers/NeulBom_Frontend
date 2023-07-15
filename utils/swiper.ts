import type { ReactNode, RefObject } from "react";
import type Swiper from "swiper";
import type { SwiperOptions } from "swiper/types";
import type { SwiperSlideProps } from "swiper/react";
import { register } from "swiper/element/bundle";

export const registerSwiper = () => {
  if (typeof window !== "undefined") {
    const win = window as unknown as { swiperInitialized: boolean };
    if (win.swiperInitialized) return;
    register();
    win.swiperInitialized = true;
  }
};

//? ref:  https://github.com/nolimits4web/swiper/issues/6466#issuecomment-1464979762
type Kebab<
  T extends string,
  A extends string = "",
> = T extends `${infer F}${infer R}`
  ? Kebab<R, `${A}${F extends Lowercase<F> ? "" : "-"}${Lowercase<F>}`>
  : A;

/**
 * Helper for converting object keys to kebab case because Swiper web components parameters are available as kebab-case attributes.
 * @link https://swiperjs.com/element#parameters-as-attributes
 */
type KebabObjectKeys<T> = {
  [key in keyof T as Kebab<key & string>]: T[key] extends Object
    ? KebabObjectKeys<T[key]>
    : T[key];
};

/**
 * Swiper 9 doesn't support Typescript yet, we are watching the following issue:
 * @link https://github.com/nolimits4web/swiper/issues/6466
 *
 * All parameters can be found on the following page:
 * @link https://swiperjs.com/swiper-api#parameters
 */
type SwiperRef = HTMLElement & { swiper: Swiper; initialize: () => void };

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "swiper-container": SwiperContainerAttributes;
      "swiper-slide": SwiperSlideAttributes;
    }

    interface SwiperContainerAttributes extends KebabObjectKeys<SwiperOptions> {
      ref?: RefObject<SwiperRef>;
      children?: ReactNode;
    }
    interface SwiperSlideAttributes extends KebabObjectKeys<SwiperSlideProps> {}
  }
}
