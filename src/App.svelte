<script>
  import BoardOptions from "./components/BoardOptions.svelte";
  import GameStatus from "./components/GameStatus.svelte";
  import Board from "./components/Board.svelte";
  import { Status } from "./constants/field-status.js";
  import { createBoard } from "./utils/board-creator.js";
  import { BEGINNER_WIDTH, BEGINNER_HEIGHT, BEGINNER_MINES_COUNT } from './constants/default-board-options.js';

  let width = BEGINNER_WIDTH;
  let height = BEGINNER_HEIGHT;
  let minesCount = BEGINNER_MINES_COUNT;

  let runGameMinesCount = minesCount;

  let fields = Array(height)
    .fill()
    .map(() => Array(width).fill(0));
  let statuses = Array(height)
    .fill()
    .map(() => Array(width).fill(Status.CLOSED));
  let isRunning = false;
  let timer = 0;

  const startNewGame = () => {
    fields = Array(height)
      .fill()
      .map(() => Array(width).fill(0));
    let i = minesCount;
    for (let y = 0; y < fields.length; y++)
      for (let x = 0; x < fields[y].length; x++) 
        if (i-- > 0) fields[y][x] = -1;
    statuses = Array(height)
      .fill()
      .map(() => Array(width).fill(Status.CLOSED));
    timer = 0;
    isRunning = false;
    runGameMinesCount = minesCount;
  };

  startNewGame();

  let startTimer = Date.now();

  const runTimer = () => {
    startTimer = Date.now();
    function incTimer() {
      setTimeout(() => {
        if (isRunning) {
          timer = Math.floor((Date.now() - startTimer) / 1000);
          incTimer();
        }
      }, 200);
    }
    incTimer();
  };

  const runGame = (x, y) => {
    if (isRunning || timer > 0) {
      throw new Error("New game was not started");
    }

    fields = createBoard(
      fields[0].length,
      fields.length,
      runGameMinesCount,
      x,
      y
    );
    isRunning = true;
    runTimer();
  };

  const openAdjancent = (x, y) => {
    let flagsAround = 0;
    for (let curY = y - 1; curY < y + 2; curY++) {
      if (curY < 0 || curY >= fields.length) continue;
      for (let curX = x - 1; curX < x + 2; curX++) {
        if (curX < 0 || curX >= fields[0].length) continue;
        if (curX === x && curY === y) continue;
        if (statuses[curY][curX] === Status.MARKED) flagsAround++;
      }
    }
    if (fields[y][x] === 0 || fields[y][x] === flagsAround) {
      for (let curY = y - 1; curY < y + 2; curY++) {
        if (curY < 0 || curY >= fields.length) continue;
        for (let curX = x - 1; curX < x + 2; curX++) {
          if (curX < 0 || curX >= (fields[0] || []).length) continue;
          if (curX === x && curY === y) continue;
          open(curX, curY);
        }
      }
    }
  };

  const open = (x, y) => {
    if (statuses[y][x] !== Status.CLOSED) return;
    if (!isRunning) {
      runGame(x, y);
    }
    statuses[y][x] = Status.OPENED;
    if (fields[y][x] === 0) {
      openAdjancent(x, y);
    }
  };

  const mark = (x, y) => {
    if (win || fail) return;
    statuses[y][x] = Status.MARKED;
  };

  const unmark = (x, y) => {
    if (win || fail) return;
    statuses[y][x] = Status.CLOSED;
  };

  $: minesLeft =
    fields.flat().filter((f) => f === -1).length -
    statuses.flat().filter((s) => s === Status.MARKED).length;

  $: fail = (() => {
    for (let y = 0; y < fields.length; y++)
      for (let x = 0; x < fields[y].length; x++)
        if (fields[y][x] === -1 && statuses[y][x] === Status.OPENED)
          return true;
    return false;
  })();

  $: win = (() => {
    for (let y = 0; y < fields.length; y++)
      for (let x = 0; x < fields[y].length; x++)
        if (fields[y][x] !== -1 && statuses[y][x] !== Status.OPENED)
          return false;
    return true;
  })();

  $: if (win || fail) {
    isRunning = false;
    timer = (Date.now() - startTimer) / 1000;
  }

  $: if (win) markAllMines();

  const markAllMines = () => {
    for (let y = 0; y < fields.length; y++)
      for (let x = 0; x < fields[y].length; x++)
        if (fields[y][x] === -1 && statuses[y][x] !== Status.MARKED)
          statuses[y][x] = Status.MARKED;
  };

  $: if (fail) openAllMines();

  const openAllMines = () => {
    for (let y = 0; y < fields.length; y++)
      for (let x = 0; x < fields[y].length; x++)
        if (fields[y][x] === -1 && statuses[y][x] !== Status.MARKED)
          statuses[y][x] = Status.OPENED;
  };

  let showOptions = false;
</script>

<svelte:head>
  <title>Сапëр</title>
</svelte:head>

<main>
  <h1>Сапëр</h1>
  {#if showOptions}
    <BoardOptions bind:width bind:height bind:minesCount />
  {/if}
  <div>
    <label>
      <input type="checkbox" hidden bind:checked={showOptions}>
      <a name>
        {#if showOptions}
          ↑↑ Скрыть параметры игры ↑↑
        {:else}
          ↓↓ Показать параметры игры ↓↓
        {/if}
      </a>
    </label>
  </div>
  <hr />
  <GameStatus
    {win}
    {fail}
    {minesLeft}
    {timer}
    on:start-new-game={startNewGame}
  />
  <Board
    {fields}
    {statuses}
    on:open={(e) => open(e.detail.x, e.detail.y)}
    on:open-adjacent={(e) => openAdjancent(e.detail.x, e.detail.y)}
    on:mark={(e) => mark(e.detail.x, e.detail.y)}
    on:unmark={(e) => unmark(e.detail.x, e.detail.y)}
  />
</main>

<style>
  main {
    margin: 0 auto;
    max-width: 1000px;
  }
</style>
