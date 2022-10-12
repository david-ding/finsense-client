<script lang="ts">
  import Header from "$lib/components/site/Header.svelte";
  import {
    LOGOUT,
    MEMBER_DASHBOARD,
    MEMBER_SETTINGS,
    MEMBER_ORDERS,
    MEMBER_STOCK_SPLITS,
  } from "$lib/constants/routes";
  import type { MenuItem } from "$lib/entities/menu-item";

  const menuItems: Array<MenuItem> = [
    {
      label: "Dashboard",
      path: MEMBER_DASHBOARD,
    },
    {
      label: "Orders",
      path: MEMBER_ORDERS,
    },
    {
      label: "Stock Splits",
      path: MEMBER_STOCK_SPLITS,
    },
    {
      label: "Settings",
      path: MEMBER_SETTINGS,
    },
  ];

  const userMenuItems: Array<MenuItem> = [
    {
      label: "Log out",
      path: LOGOUT,
    },
  ];
</script>

<Header
  {menuItems}
  {userMenuItems}
/>

<main class="flex justify-center">
  <div class="w-screen max-w-full sm:max-w-screen-sm lg:max-w-screen-lg px-4 py-8 relative">
    <slot />
  </div>
</main>
