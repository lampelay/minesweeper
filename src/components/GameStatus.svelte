<script>
  import { createEventDispatcher as cd } from "svelte";
  const emit = cd();
  export let win = false;
  export let fail = false;
  export let minesLeft = 0;
  export let timer = 0;
</script>

<div>
  <span>Осталось мин: {minesLeft}.</span>
  <button on:click={() => emit("start-new-game")} title="Начать новую игру">
    {#if win}😎{:else if fail}😫{:else}🙂{/if}
  </button>
  <span>Время: {timer} секунд.</span>
</div>

<style>
  button {
    padding: 0;
    width: 1.5em;
    height: 1.5em;
    font-size: 2em;
  }
</style>
