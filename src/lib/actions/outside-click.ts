import type { SvelteAction } from "$lib/entities/svelte-action";

const IGNORED_SELECTORS = [
  ".svelte-selectbox-dropdown", // hack to ignore dropdown clicks
];

const clickOutside: SvelteAction<() => void> = (node, callback) => {
  const handleClick = (event: MouseEvent) => {
    const eventTarget = event.target as HTMLElement;
    if (
      !node.contains(eventTarget)
      && !IGNORED_SELECTORS.some(selector => document.querySelector(selector)?.contains(eventTarget))
    ) {
      callback();
    }
  };

  document.addEventListener("click", handleClick, true);

  return {
    destroy(): void {
      document.removeEventListener("click", handleClick, true);
    },
  };
};

export default clickOutside;
