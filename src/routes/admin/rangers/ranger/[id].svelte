<script context="module">
	export async function preload(page, session) {
		const { id } = page.params;

		return {id};
	}
</script>
<script lang="ts">
    import UserDetails from "../../../../components/UserDetails.svelte"
    export let id:string;
  </script>
  
  <div>
    <UserDetails id={id} />
  </div>
  