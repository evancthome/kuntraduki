<script>
  import { slide } from 'svelte/transition'
  import Hamburger from '../components/Hamburger.svelte'
  export let latestProjects
  export let auth
  let showMenu = false

  console.log(latestProjects)
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
  <h2>Latest projects</h2>
  <div class="card-grid">
    {#each latestProjects as project}
      <div class="card">
        <h3 class="card-title"><a href={`/projects/${project.id}`}>{project.name}</a></h3>
        <p>
          {`${project.description.slice(0, 150)} ${project.description.length > 150 ? '...' : ''}`}
        </p>
      </div>
    {/each}
  </div>
</div>
