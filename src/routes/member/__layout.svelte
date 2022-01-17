<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import Header from "$lib/components/site/Header.svelte";
  import { LOGIN, LOGOUT, MEMBER_DASHBOARD, MEMBER_STOCK_ORDERS } from "$lib/constants/routes";
  import type { MenuItem } from "$lib/entities/menu-item";
  import { onFirstAction } from "$lib/utils/on-first-action";

  const menuItems: Array<MenuItem> = [
    {
      label: "Dashboard",
      path: MEMBER_DASHBOARD,
    },
    {
      label: "Orders",
      path: MEMBER_STOCK_ORDERS,
    },
  ];

  const userMenuItems: Array<MenuItem> = [
    {
      label: "Log out",
      path: LOGOUT,
    },
  ];

  onMount(() => onFirstAction("auth/logout", () => goto(LOGIN)));
</script>

<Header {menuItems} {userMenuItems} />

<main class="flex justify-center">
  <div class="w-screen max-w-full sm:max-w-screen-sm lg:max-w-screen-lg px-4 py-8 relative">
    <slot />
  </div>
</main>
