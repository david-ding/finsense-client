export type SvelteAction<T> = (
  element: HTMLElement,
  args: T,
) => SvelteActionReturnType<T>;

export type SvelteActionReturnType<T> = {
  update?: (args: T) => void;
  destroy?: () => void;
} | void;
