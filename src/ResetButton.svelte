<script>
    import { onMount, onDestroy, afterUpdate, beforeUpdate } from "svelte";
    import { Cart } from './stores/Cart.js';
    import { Button } from "smelte";

    function handleReset() {
      const { setSourceOptions, setTargetOptions, setSourceChecked, setTargetChecked } = Cart;
      setSourceOptions([]);
      setTargetOptions([]);
      setSourceChecked('');
      setTargetChecked('');
    }

onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="py-2">
  <Button on:click={handleReset} light>Reset</Button>
</div>