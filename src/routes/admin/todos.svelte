<script>
    import { operationStore, query } from '@urql/svelte';
  
    const todos = operationStore(`
      query {
        todos {
          id
          title
        }
      }
    `);
  
    query(todos);
  </script>
  
  {#if $todos.fetching}
  <p>Loading...</p>
  {:else if $todos.error}
  <p>Oh no... {$todos.error.message}</p>
  {:else}
  <ul>
    {#each $todos.data.todos as todo}
    <li>{todo.title}</li>
    {/each}
  </ul>
  {/if}