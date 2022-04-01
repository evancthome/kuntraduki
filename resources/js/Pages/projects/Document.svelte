<script>
  import Project from './Project.svelte'
  import Hamburger from '../../components/Hamburger.svelte'
  import { slide } from 'svelte/transition'
  let showMenu = false
  export let projectId
  export let auth
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
  <h2>Add a Document to Project</h2>

  <form action={`/projects/${projectId}/create`} method="POST">
    <label>
      Title
      <input type="text" name="title" />
    </label>
    <label>
      Description
      <textarea type="text" name="description" />
    </label>
    <label>
      Document Text
      <textarea rows="20" type="text" name="text" />
    </label>
    <button type="submit">Create Document</button>
  </form>
</div>

<style>
  form label {
    display: flex;
    flex-direction: column;
    justify-content: start;
    margin-bottom: 0.5rem;
  }

  button {
    display: block;
    margin-inline: auto;
  }
</style>
