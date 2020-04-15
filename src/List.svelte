<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let data;
  let selected = ''

  function message(e) {
    dispatch('option-select', e.target.value);
  }
</script>

{#if data}
   <div class="elevation-3 rounded px-2 py-4 mt-0">
      {#each data as item}
         <div>
        <input type="radio" id="{item}" name="drone" value="{item}"
              bind:group={selected} on:change={message}>
        <label for="{item}">{item}</label>
      </div>
      {/each}
  </div>
{/if}
    
