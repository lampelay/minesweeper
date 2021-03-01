<script>
  import { createEventDispatcher } from "svelte";
  import BoardActionSelector from "./BoardActionSelector.svelte";
  import { Status } from "./field-status.js";
  const emit = createEventDispatcher();

  export let fields = [];
  export let statuses = [];

  const open = (x, y) => {
    if (statuses[y][x] === Status.CLOSED) {
      emit("open", { x, y });
    }
  };

  const flagOrOpenAdjacent = (x, y) => {
    switch (statuses[y][x]) {
      case Status.CLOSED: {
        return emit("mark", { x, y });
      }
      case Status.MARKED:
        return emit("unmark", { x, y });
      case Status.OPENED:
        return emit("open-adjacent", { x, y });
      default:
        throw new Error(`Unexpected field status: ${statuses[y][x]}`);
    }
  };

  let tableWidth = "0px";

  let flagOnTap = false;

  $: leftClick = flagOnTap ? flagOrOpenAdjacent : open;
  $: rightClick = flagOnTap ? open : flagOrOpenAdjacent;
</script>

<div>
  <BoardActionSelector bind:flagOnTap />
  <div class="window" style="max-width: {tableWidth}px">
    <div class="container" style="width: {tableWidth + 100}px">
      <table bind:offsetWidth={tableWidth}>
        <tbody>
          {#each fields as fieldsRow, y}
            <tr>
              {#each fieldsRow as field, x}
                <td
                  on:click={() => leftClick(x, y)}
                  on:contextmenu|preventDefault={() => rightClick(x, y)}
                  class="c{field}"
                >
                  {#if statuses[y][x] === Status.OPENED}
                    {#if field > 0}
                      {field}
                    {:else if field === -1}
                      💣
                    {/if}
                  {:else}
                    <button>
                      {#if statuses[y][x] === Status.MARKED}
                        🚩
                      {/if}
                    </button>
                  {/if}
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  &nbsp;
</div>

<style>
  * {
    user-select: none;
  }

  td {
    width: 2em;
    height: 2em;
    padding: 0;
    margin: 0;
    vertical-align: middle;
    text-align: center;
    border: solid 1px rgb(241, 241, 241);
    font-weight: bold;
    background-color: white;
  }

  .window {
    overflow: auto;
    border: solid 2pt gray;
    margin-bottom: 0.5em;
  }

  .container {
    background-color: gray;
  }

  table {
    border-collapse: collapse;
  }

  table button {
    width: 100%;
    height: 100%;
    display: block;
    margin: 0;
    padding: 0;
    border-radius: 0.3em;
  }

  .c1 {
    color: blue;
  }
  .c2 {
    color: green;
  }
  .c3 {
    color: red;
  }
  .c4 {
    color: darkblue;
  }
  .c5 {
    color: brown;
  }
  .c6 {
    color: lightblue;
  }
  .c7 {
    color: gray;
  }
  .c8 {
    color: black;
  }
</style>
