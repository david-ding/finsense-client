<script lang="ts">
  import "../app.postcss";

  import Header from "$lib/components/site/Header.svelte";
  import type { MenuItem } from "../lib/entities/menu-item";

  const menuItems: Array<MenuItem> = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Orders",
      path: "/stocks/orders",
    },
  ];
</script>

<Header {menuItems} />

<main class="flex justify-center">
  <div class="w-screen max-w-full sm:max-w-screen-sm lg:max-w-screen-lg px-4 py-8 relative">
    <slot />
  </div>
</main>
