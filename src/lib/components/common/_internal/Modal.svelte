<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "$lib/components/common/Button.svelte";
  import CrossIcon from "$lib/components/common/icons/CrossIcon.svelte";
  import Link from "$lib/components/common/Link.svelte";
  import clickOutside from "$lib/actions/outside-click";

  export let showCloseIcon = true;

  const dispatch = createEventDispatcher();

  function close(): void {
    dispatch("close");
  }
</script>

<div
  class="fixed z-10 inset-0 overflow-y-auto"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
>
  <div
    id="modal-frame"
    class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
  >
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />

    <!-- This element is to trick the browser into centering the modal contents. -->
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
      >&#8203;</span
    >

    <div
      class="inline-block w-full align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      use:clickOutside={close}
    >
      {#if showCloseIcon}
        <div class="absolute right-4 top-4">
          <Link on:click={close}>
            <CrossIcon />
          </Link>
        </div>
      {/if}
      <div class="bg-white p-4 sm:p-6">
        <div class="mt-3 sm:mt-0">
          <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
            <slot name="title" />
          </h3>
          <div class="text-base">
            <slot name="body" />
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:gap-3">
        <slot name="actionButtons" />
        <Button class="btn-secondary-outline mt-2 sm:mt-0" on:click={close}>Close</Button>
      </div>
    </div>
  </div>
</div>
