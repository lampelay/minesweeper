<script>
  import Selector from "./Selector.svelte";
  export let flagOnTap = false;
</script>

<p>
  <span
    on:click={() => (flagOnTap = false)}
    class="action"
    class:selected={!flagOnTap}
  >
    Копать
  </span>
  <Selector bind:checked={flagOnTap} />
  <span
    on:click={() => (flagOnTap = true)}
    class="action"
    class:selected={flagOnTap}
  >
    Флаг 🚩 / Раскопать вокруг
  </span>
</p>

<style>
  .action {
    font-weight: bold;
    color: gray;
    transition: color 0.2s, border 0.2s;
    cursor: pointer;
  }

  .selected {
    color: black;
    border-bottom: solid 2pt black;
  }
</style>
