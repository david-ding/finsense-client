<script lang="ts">
  import Button from "$lib/components/common/Button.svelte";
  import Modal from "$lib/components/common/Modal.svelte";

  type T = $$Generic;
  let modal: Modal;
  let modalData: T = null;

  export let confirmBtnLabel: string = "Confirm";
  export let confirmFn: (data?: T) => void;
  export let messageFn: (data?: T) => string = () => "Are you sure?";
  export let titleFn: (data?: T) => string = () => "Confirmation";

  export const open = (data?: T): void => {
    if (data) {
      modalData = data;
    }
    modal.open();
  };

  export const close = (): void => {
    modal.close();
  };
</script>

<Modal bind:this={modal}>
  <svelte:fragment slot="title">{titleFn(modalData)}</svelte:fragment>
  <svelte:fragment slot="body">{messageFn(modalData)}</svelte:fragment>
  <Button
    class="btn-primary"
    slot="actionButtons"
    on:click={() => confirmFn(modalData)}
  >
    {confirmBtnLabel}
  </Button>
</Modal>
