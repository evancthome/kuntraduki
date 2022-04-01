<script>
  import Hamburger from '../../components/Hamburger.svelte'
  import { slide } from 'svelte/transition'
  let showMenu = false
  let showCreate = false
  export let auth
  export let projects

  console.log(projects)
</script>

<div class="container">
  <h1>Kuntraduki</h1>
  <Hamburger on:message={() => (showMenu = true)} />
  {#if showMenu}
    <div transition:slide class="menu">
      <button class="close" on:click={() => (showMenu = false)}>x</button>
      <h1 class="menu-title">Kuntraduki</h1>
      <a class="menu-item" href="/">Home</a>
      <a class="menu-item" href="/projects">Your Projects</a>
      {#if auth.guards.web.user}
        <a class="menu-item" href="/logout">Logout</a>
      {:else}
        <a class="menu-item" href="/login">Login</a>
      {/if}
    </div>
  {/if}
  <h2>List of all projects</h2>
  {#if auth.guards.web.user && showCreate}
    <form class="create-form" action="/projects" method="POST">
      <button on:click={() => (showCreate = false)} class="close">x</button>
      <label>
        Title
        <input type="text" name="name" />
      </label>
      <label>
        Description
        <textarea type="text" name="description" />
      </label>
      <button type="submit">Create Project</button>
    </form>
  {/if}
  <button class="create-button" on:click={() => (showCreate = true)}>Create new project</button>

  {#if projects}
    <div class="card-grid">
      {#each projects as project}
        <div class="card">
          <h3 class="card-title"><a href={`/projects/${project.id}`}>{project.name}</a></h3>
          <p>{project.description}</p>
        </div>
      {/each}
    </div>
  {:else}
    <p>Nothing to display...</p>
  {/if}
</div>

<style>
  .create-form {
    position: relative;
    background-color: var(--clr-900);
    color: var(--clr-100);
    padding: 1rem;
    margin-bottom: 1rem;
  }
  form label {
    display: flex;
    flex-direction: column;
    justify-content: start;
    margin-bottom: 1rem;
  }

  .create-button {
    display: block;
    margin-bottom: 1rem;
    margin-inline: auto;
  }
</style>
