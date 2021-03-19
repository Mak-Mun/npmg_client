<script context="module">
	export async function preload(page, session) {
		const { id } = page.params;

		return {id};
	}
</script>
<script lang="ts">
    import SingleReport from "../../../../components/SingleReport.svelte"
    export let id:string;
  </script>
  
  <div>
    <SingleReport id={id} />
  </div>
  