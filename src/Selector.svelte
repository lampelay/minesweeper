<script>
    export let checked = false;
</script>

<style>
    .container {
        position: relative;
        display: inline-block;
        height: 1em;
        width: 2em;
        cursor: pointer;
    }

    .stripe {
        width: 100%;
        height: 100%;
        position: absolute;
        border-radius: 1em;
        box-sizing: border-box;
        border: solid 1px gray;
        background-color: rgb(240, 240, 240);
    }

    .selector {
        width: 0.8em;
        height: 0.8em;
        top: 0.1em;
        position: absolute;
        border-radius: 50%;
        background-color: rgb(116, 116, 116);
        transition: left 0.2s;
    }
</style>

<div class="container"
     on:click={() => checked = !checked}>
    <div class="stripe"></div>
    <div class="selector" style="left: {+checked + 0.1}em"></div>
</div>