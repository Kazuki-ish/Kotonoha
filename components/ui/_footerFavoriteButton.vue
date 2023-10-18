<template>
    <div class="fav" :class="{'-favorited': $store.state.novels.isFavorite == true }">
        <button @click="favNovel" class="fav__btn">
            ♡
        </button>
    </div>
</template>

<style lang="scss" scoped>
    .fav {
        @include absolute(50%, 50%);
        color: black;
        display: flex;
        justify-content: center;
        transform: translate(-50%, -50%);

        button {
            @include cubic_ease(box-shadow, $time: .2s);
            @include NM_convex_anim;
            border-radius: calc(21 / 780 * 100vw);
            padding: 0.5rem .75rem;

            &:nth-child(n + 2) {
                margin-left: calc(94 / 780 * 100vw);
            }
        }
        &.-favorited {
            background-color: pink;
        }
    }
</style>

<script>
    export default {
        methods: {
            async favNovel() {
                await this.$store.dispatch("novels/addFavorite")
                // console.log(this.$store.state.novels.readingNovel)
            }
        },
    }
</script>