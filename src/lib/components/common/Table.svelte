<script
  lang="ts"
  context="module"
>
  export type TableColumn = {
    name?: string;
    prop?: string;
  };
</script>

<script lang="ts">
  import { upperCase } from "lodash-es";
  import type { ClassNames } from "$lib/entities/class-names";
  import type { Identifiable } from "$lib/entities/identifiable";
  import mergeClassNames from "$lib/utils/merge-class-names";

  type T = $$Generic<Identifiable>;

  let classNames: ClassNames = null;
  export { classNames as class };
  export let columns: Array<TableColumn>;
  export let isLoading: boolean = false;
  export let rows: Array<T>;
  export let rowIdentifier: (row: T) => unknown = (row) => row.id;
</script>

<div class={mergeClassNames(["flex", "flex-col", classNames])}>
  <div class="-my-2 overflow-x-auto sm:-mx-2">
    <div class="py-2 align-middle inline-block min-w-full sm:px-2">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="table-auto min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              {#each columns as column}
                <th
                  scope="col"
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.name || upperCase(column.prop)}
                </th>
              {/each}

              {#if rows.length && $$slots.actions}
                <th
                  scope="col"
                  class="relative px-4 py-2"
                >
                  &nbsp;
                </th>
              {/if}
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#if isLoading}
              {#each Array(3) as _i}
                <tr>
                  {#each columns as _column}
                    <td class="px-4 py-2 whitespace-nowrap text-sm">
                      <div class="animate-pulse bg-gray-500">&nbsp;</div>
                    </td>
                  {/each}
                  {#if rows.length && $$slots.actions}
                    <td class="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                      <div class="animate-pulse bg-gray-500">&nbsp;</div>
                    </td>
                  {/if}
                </tr>
              {/each}
            {:else}
              {#if !rows.length}
                <tr>
                  <td
                    colspan={columns.length}
                    class="px-4 py-2 whitespace-nowrap text-sm"
                  >
                    No data to display
                  </td>
                </tr>
              {/if}
              {#each rows as row (rowIdentifier(row))}
                <tr>
                  {#each columns as column}
                    <td class="px-4 py-2 whitespace-nowrap text-sm">
                      <slot
                        name="cell"
                        {column}
                        {row}
                      />
                    </td>
                  {/each}
                  {#if $$slots.actions}
                    <td class="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                      <slot
                        name="actions"
                        {row}
                      />
                    </td>
                  {/if}
                </tr>
              {/each}
            {/if}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- <div class="flex flex-col">
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="">
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      Jane Cooper
                    </div>
                    <div class="text-sm text-gray-500">
                      jane.cooper@example.com
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Regional Paradigm Technician</div>
                <div class="text-sm text-gray-500">Optimization</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Admin
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div> -->
