<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = ({ status }) => ({
    props: { status },
  });
</script>

<script lang="ts">
  import SadIcon from "$lib/components/common/icons/SadIcon.svelte";
  import Link from "$lib/components/common/Link.svelte";

  export let status: number;

  const STATUS_ERROR_MAP: Record<number, string> = {
    404: "Page not found",
    500: "Lachlan is too annoying",
  };
</script>

<div class="min-h-screen flex justify-center items-center">
  <div class="flex flex-col items-center gap-4">
    <SadIcon size={24} />
    <div class="text-3xl">{status} | {STATUS_ERROR_MAP[status]}</div>
    <Link class="text-md" to="/">Home</Link>
  </div>
</div>
