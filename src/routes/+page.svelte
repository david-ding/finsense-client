<script lang="ts">
  import { goto } from "$app/navigation";
  import { MEMBER_DASHBOARD } from "$lib/constants/routes";
  import { onMount } from "svelte";

  // goto can only be called onMount since it runs on client side
  onMount(() => goto(MEMBER_DASHBOARD));
</script>
