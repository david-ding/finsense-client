<script lang="ts">
  import { authActions } from "$lib/stores/features/auth/auth.store";
  import { dispatch } from "$lib/stores/redux-store";

  dispatch(authActions.logout());
</script>
