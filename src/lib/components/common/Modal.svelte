<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Lazy from "./Lazy.svelte";

  let shouldRender: boolean = false;

  const dispatch = createEventDispatcher();

  export function open(): void {
    shouldRender = true;
  }

  export function close(): void {
    shouldRender = false;
    dispatch("close");
  };
</script>

<Lazy componentResolver={() => import("./_internal/Modal.svelte")} {shouldRender}>
  <svelte:fragment let:Component>
    <Component {...$$props} on:close={close}>
      <svelte:fragment slot="title"><slot name="title" /></svelte:fragment>
      <svelte:fragment slot="body"><slot name="body" /></svelte:fragment>
      <svelte:fragment slot="actionButtons"><slot name="actionButtons" /></svelte:fragment>
    </Component>
  </svelte:fragment>
</Lazy>
