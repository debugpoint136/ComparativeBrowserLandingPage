<script>
  import { onMount, onDestroy, afterUpdate, beforeUpdate } from "svelte";
  import { createNewick } from "./scripts/createNewick";
  import Phylogram from "./scripts/phylogram";
  import { Cart } from './stores/Cart.js';
  import List from './List.svelte';
  import ResetButton from './ResetButton.svelte';
  const newick = createNewick();


  let selector;
  let sourceOptions;
  let targetOptions;
  let sourceChecked;
  let targetChecked;
  let selection;

  function message(e) {
    Cart.setSourceChecked(e.detail);
  }
  
  let STATE = { methods: {}, data: {} };

  const unsubscribe = Cart.subscribe(store => {
    const { setSourceOptions, setTargetOptions, setSourceChecked, setTargetChecked  } = Cart;
    
    sourceOptions = $Cart.sourceOptions;
    targetOptions = $Cart.targetOptions;
    sourceChecked = $Cart.sourceChecked;
    targetChecked = $Cart.targetChecked;
    selection = $Cart.selection;

    STATE.methods = { setSourceOptions, setTargetOptions, setSourceChecked, setTargetChecked };
    STATE.data = { 
      sourceOptions,
      targetOptions,
      sourceChecked,
      targetChecked, 
      selection 
    }
  });

  onDestroy(() => {
    unsubscribe();
  });

  
  beforeUpdate(() => {
    console.log('kicking before!')
    const constructedTree = new Phylogram(selector, newick, {
      width: 300,
      height: 400
    }, STATE).build();
  });
  afterUpdate(() => {
    console.log('kicking again!')
    const constructedTree = new Phylogram(selector, newick, {
      width: 300,
      height: 400,
    }, STATE).build();
  });
</script>

<ResetButton/>
<div id="phylogram" bind:this={selector} />
{#if $Cart.sourceChecked === '' && $Cart.sourceOptions.length > 0}
   <List data={sourceOptions} on:option-select={message}/>
{/if}
