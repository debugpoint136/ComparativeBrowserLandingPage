<script>
  import Tree from "./Tree.svelte";
  import "smelte/src/tailwind.css";
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #495692;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<div class="flex">
  <div class="h-screen top-0 sticky p-2 shadow bg-gray-200">
    <!-- Note: add overflow-y-scroll if sidebar content is longer than page -->
    <button
      class="p-1 border-2 border-transparent text-gray-400 rounded-full
      hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
      aria-label="Notifications">
      <svg
        class="h-6 w-6"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0
          00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0
          .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    </button>
  </div>
  <main>

    <h1>Tree View</h1>

		<div>
    	<Tree />
		</div>
  </main>
</div>
