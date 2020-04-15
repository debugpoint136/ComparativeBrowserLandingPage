<script>
	import Tree from './Tree.svelte';
	import "smelte/src/tailwind.css" ;

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

<main>
	<h1>WashU Comparative Genome Browser</h1>
	<p>Visit <a href="https://placeholder.com">Documentation</a> to get started.</p>

	<Tree/>
</main>