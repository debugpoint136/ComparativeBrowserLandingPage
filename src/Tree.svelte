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

  function drawTree() {
    const constructedTree = new Phylogram(selector, newick, {
      width: window.innerWidth * .7,
      height: window.innerHeight * .8,
      skipLabels: true,
      skipTicks: false,
      skipBranchLengthScaling: false
    }, STATE).build();
  }
  
  beforeUpdate(() => {
    console.log('kicking before!')
    drawTree();
  });
  afterUpdate(() => {
    console.log('kicking again!')
    drawTree();
  });
</script>

<!-- <ResetButton/> -->
<div class="flex">
<div class="ml-20">
  <div id="phylogram" bind:this={selector} />
</div>
<div id="tooltip" class="origin-top-right absolute right-0 mr-48 w-128 rounded-md shadow-lg">
  <!-- something -->
</div>
</div>
