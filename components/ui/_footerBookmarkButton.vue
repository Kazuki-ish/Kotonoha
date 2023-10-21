<template>
    <div class="bookmark" :class="{ '-bookmarked': $store.state.novels.isBookmark == true }">
        <button class="bookmark__btn">
            <img class="bookmark__ico" src="~/assets/imgs/ico/bookmark.png">
        </button>
    </div>
</template>

<style lang="scss" scoped>
    .bookmark {
        @include cubic_ease(box-shadow, $time: .2s);
        @include NM_convex_anim;
        border-radius: calc(21 / 780 * 100vw);

        button {
            padding: 0.5rem .75rem;

            &:nth-child(n + 2) {
                margin-left: calc(94 / 780 * 100vw);
            }
        }

        &__ico {
            display: block;
            height: 1.5rem;
        }
    }
</style>

<script>

</script>