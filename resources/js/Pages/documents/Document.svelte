<script>
  import Hamburger from '../../components/Hamburger.svelte'
  import { slide, fly } from 'svelte/transition'
  import MdDeleteForever from 'svelte-icons/md/MdDeleteForever.svelte'
  let showMenu = false
  let showTranslated = false
  let showSubmitted = false
  let showTranslate = false
  export let document
  export let snippets
  export let auth
  export let project
  let value = ''
  let url = `/documents/${document.id}/createsnippet`

  console.log(snippets)

  function handleMouseUp() {
    let temp = window.getSelection()
    if (document.text.includes(temp)) {
      value = temp
    }
  }
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
  <h2>{document.title}</h2>
  <p class="text-center"><strong>Project:</strong> {project.name}</p>
  <p>{document.description}</p>
  <button class="show" on:click={() => (showTranslated = !showTranslated)}>
    {#if !showTranslated}
      Show translated document
    {/if}
    {#if showTranslated}
      Show untranslated document
    {/if}
  </button>
  {#if !showTranslated}
    <div transition:fly class="card">
      <div on:mouseup={() => (value = window.getSelection())}>
        {document.text}
      </div>
      <h2>Selected Snippet</h2>
      <p>{value}</p>
      <form action={`/documents/${document.id}/createsnippet`} method="POST">
        <input hidden bind:value type="text" name="snippet" />
        <button type="submit">Save selection as snippet</button>
      </form>
    </div>
  {/if}
  {#if showTranslated}
    <div transition:fly class="card">
      <p>{document.t_text}</p>
      {#if auth.guards.web.user.id === project.user_id}
        <a href={`/documents/${document.id}/delete`}>Delete this document</a>
      {/if}
    </div>
  {/if}
  <div class="snippets">
    <h2>Snippets</h2>
    {#each snippets as snippet}
      <div class="card">
        <p>{snippet.snippet}</p>
        <button on:click={() => (showTranslate = !showTranslate)}>Translate snippet</button>
        <button on:click={() => (showSubmitted = !showSubmitted)}
          >Show submitted translations</button
        >

        {#if showTranslate}
          <form action={`/snippets/${snippet.id}/translate`} method="POST">
            <label>
              Translate here
              <textarea rows="3" name="t_snippet" />
            </label>
            <button type="submit">Submit Translation</button>
          </form>
        {/if}

        {#if snippet.t_snippet.length > 0 && showSubmitted}
          <h3>Submited Translations</h3>
          {#each snippet.t_snippet as t_snippet}
            <div class={t_snippet.correct ? 'correct card' : 'card'}>
              <p class="m-0">{t_snippet.t_snippet}</p>
            </div>
            {#if auth.guards.web.user.id === project.user_id}
              <a class="m-0" href={`/tsnippets/${t_snippet.id}/iscorrect`}>Mark as correct</a>
            {/if}
          {/each}
        {/if}
        {#if document.user_id === snippet.user_id}
          <a class="delete" href={`/snippets/${snippet.id}/delete`}
            ><div class="icon">
              <MdDeleteForever />
            </div>
          </a>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .icon {
    height: 32px;
    width: 32px;
  }
  .card * + * {
    margin-top: 1rem;
  }
  .card {
    position: relative;
  }

  .correct {
    border-left: solid 2px green;
    position: relative;
  }
  form label {
    display: flex;
    flex-direction: column;
    justify-content: start;
  }

  button {
    display: block;
    margin-inline: auto;
  }

  .show {
    margin-bottom: 0.5rem;
  }

  .delete {
    color: red;
    position: absolute;
    top: -14px;
    right: 2px;
  }
</style>
