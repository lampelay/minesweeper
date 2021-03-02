<script>
    import {
        BEGINNER_WIDTH,	BEGINNER_HEIGHT, BEGINNER_MINES_COUNT,
        AMATEUR_WIDTH, AMATEUR_HEIGHT, AMATEUR_MINES_COUNT,
        PROFESSIONAL_WIDTH, PROFESSIONAL_HEIGHT, PROFESSIONAL_MINES_COUNT
    } from '../constants/default-board-options.js';
    
    export let width = BEGINNER_WIDTH;
    export let height = BEGINNER_HEIGHT;
    export let minesCount = BEGINNER_MINES_COUNT;
    
    $: if (minesCount > width * height - 1)
        minesCount = width * height - 1;
    $: if (minesCount < 1) 
        minesCount = 1;
    
    const setBeginner = () => {
        width = BEGINNER_WIDTH;
        height = BEGINNER_HEIGHT;
        minesCount = BEGINNER_MINES_COUNT;
    }
    
    const setAmateur = () => {
        width = AMATEUR_WIDTH;
        height = AMATEUR_HEIGHT;
        minesCount = AMATEUR_MINES_COUNT;
    }
    
    const setProfessional = () => {
        width = PROFESSIONAL_WIDTH;
        height = PROFESSIONAL_HEIGHT;
        minesCount = PROFESSIONAL_MINES_COUNT;
    }
    
    $: isBeginner =
        width === BEGINNER_WIDTH &&
        height === BEGINNER_HEIGHT &&
        minesCount === BEGINNER_MINES_COUNT;
    $: isAmateur =
        width === AMATEUR_WIDTH &&
        height === AMATEUR_HEIGHT &&
        minesCount === AMATEUR_MINES_COUNT;
    $: isProfessional =
        width === PROFESSIONAL_WIDTH &&
        height === PROFESSIONAL_HEIGHT &&
        minesCount === PROFESSIONAL_MINES_COUNT;
</script>

<style>
    label {
        display: inline;
        padding-right: 1em;
    }
    
    .selected {
        border: solid 1pt;
    }
</style>


<div>
    <div>
        <button on:click={setBeginner} 
                class:selected={isBeginner}>
            Новичок
        </button>
        <button on:click={setAmateur} 
                class:selected={isAmateur}>
            Любитель
        </button>
        <button on:click={setProfessional} 
                class:selected={isProfessional}>
            Профессионал
        </button>
    </div>
    <table>
        <thead>
            <tr>
                <td><label for="board-options-width">Ширина</label></td>
                <td><label for="board-options-height">Высота</label></td>
                <td><label for="board-options-mines">Мины</label></td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <input id="board-options-width"
                           type="number" 
                           min={1} 
                           max={100} 
                           bind:value={width}>
                </td>
                <td>
                    <input id="board-options-width"
                           type="number" 
                           min={1} 
                           max={100} 
                           bind:value={height}>
                </td>
                <td>
                    <input id="board-options-mines"
                           type="number" 
                           min={0} 
                           max={width * height - 1} 
                           bind:value={minesCount}>
                </td>
            </tr>
        </tbody>
    </table>
</div>
