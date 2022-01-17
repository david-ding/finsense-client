<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { MEMBER_DASHBOARD } from "$lib/constants/routes";

  // goto can only be called onMount since it runs on client side
  onMount(() => goto(MEMBER_DASHBOARD));
</script>
