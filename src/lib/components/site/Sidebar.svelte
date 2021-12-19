<script lang="ts">
  import mergeClassNames from "../../utils/merge-class-names";
  import type { MenuItem } from "../../entities/menu-item";

  import { page } from "$app/stores";

  export let menuItems: Array<MenuItem> = [];
</script>

<div class="p-4 -mb-8">
  <div class="mb-8">
    <a href="/">Finsense</a>
  </div>
  <nav>
    {#each menuItems as menuItem}
      <div class="mb-8">
        <div class="uppercase text-sm font-bold mb-2">
          {menuItem.label}
        </div>
        <ul>
          {#each menuItem.subItems as subItem}
            <a href={subItem.path}>
              <li
                class={mergeClassNames([
                  "-mx-4",
                  "px-4",
                  "py-1",
                  "hover:bg-secondary",
                  { "bg-secondary": subItem.path === $page.path },
                ])}
              >
                {subItem.label}
              </li>
            </a>
          {/each}
        </ul>
      </div>
    {/each}
  </nav>
</div>
