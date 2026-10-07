<script>
  import "../app.scss";
  import { onMount } from "svelte";

  let { children } = $props();

  onMount(() => {
    if (typeof window !== "undefined" && window.Neutralino) {
      window.Neutralino.init();
    }
  });
</script>

{@render children()}
