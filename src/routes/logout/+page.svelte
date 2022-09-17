<script lang="ts">
  import { dispatch } from "$lib/stores/redux-store";
  import { logout } from "$lib/utils/auth.utils";
  import { onMount } from "svelte";

  onMount(() => logout(dispatch));
</script>
