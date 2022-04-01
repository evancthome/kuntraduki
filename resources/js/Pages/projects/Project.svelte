<script>
  import Hamburger from '../../components/Hamburger.svelte'
  import { slide } from 'svelte/transition'
  let showMenu = false
  export let project
  export let creator
  export let auth
  export let documents

  let show = false
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
      {#if auth.guards.web.user.id === creator.id}
        <a class="menu-item" href={`/projects/${project.id}/create`}
          >Add a document to the project</a
        >
        <a class="menu-item" href={`/projects/${project.id}/delete`}>Delete Project</a>
      {/if}
      {#if auth.guards.web.user}
        <a class="menu-item" href="/logout">Logout</a>
      {:else}
        <a class="menu-item" href="/login">Login</a>
      {/if}
    </div>
  {/if}
  <h2>{project.name}</h2>

  <p class="text-center"><strong>Created By:</strong> {creator.username}</p>
  <div class="card">
    <p>{project.description}</p>
    <button on:click={() => (show = !show)}>Update description</button>
    {#if show}
      <form action={`/projects/${project.id}/update`} method="POST">
        <label>
          Description
          <textarea name="desc" id="" cols="30" rows="10" />
        </label>
        <button type="submit">Update</button>
      </form>
    {/if}
  </div>

  <h2>Documents in this project</h2>
  {#each documents as document}
    <div class="card">
      <h3 class="card-title">
        <a href={`/documents/${document.id}`}>
          {document.title}
        </a>
      </h3>
      <p>{document.description}</p>
    </div>
  {/each}
</div>

<style>
  button {
    display: block;
    margin-inline: auto;
  }
</style>
