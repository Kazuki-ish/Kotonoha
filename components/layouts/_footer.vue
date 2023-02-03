<template>
    <footer :class="{'-write':$route.name == 'write'}">
        <div class="button-list" v-if="$route.name == 'write'">
            <button></button>
            <button @click="emitText"></button>
            <button></button>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
    footer {
        bottom: 0;
        height: calc( 120 / 1686 * 100vh);
        position: absolute;
        pointer-events: auto;
        width: 100%;

        &.-write {
            @include NM_convex;
            pointer-events: visible;
        }
    }
    .button-list {
        display: flex;
        justify-content: center;
        margin-top: calc(12 / 1686 * 100vh);

        button {
            @include NM_convex;
            border-radius: calc(21 / 780 * 100vw);
            height: calc(96 / 780 * 100vw);
            width: calc(96 / 780 * 100vw);

            &:nth-child(n + 2){
                margin-left: calc(94 / 780 * 100vw);
            }
        }
    }
</style>

<script>
    export default {
        name:'Footer',
        methods: {
            emitText() {
                this.$emit('saveText')
            }
        }
    }
</script>