<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  function clickMessage() {
    dispatch('message')
  }
</script>

<button on:click={clickMessage} class="wrapper"><span /></button>

<style>
  .wrapper {
    position: absolute;
    background: none;
    border: none;
    padding: 0;
    top: 0.5rem;
    right: 1rem;
    cursor: pointer;
  }
  span {
    display: inline-block;
    width: 25px;
    height: 4px;
    background-color: var(--clr-700);
    position: relative;
  }
  span::before,
  span::after {
    content: '';
    width: 25px;
    height: 4px;
    background-color: var(--clr-700);
    position: absolute;
    left: 0;
  }
  span::before {
    top: -8px;
  }
  span::after {
    top: 8px;
  }
</style>
