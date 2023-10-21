<template>
    <div class="bookmark-arrow">
        <button class="bookmark-arrow__btn" :class="{'-first': isFirst == true}">
            <img class="bookmark-arrow__ico" src="~/assets/imgs/ico/arrow_line.png">
        </button>
    </div>
</template>

<style lang="scss" scoped>

.bookmark-arrow {
    @include cubic_ease(box-shadow, $time: .2s);
    @include NM_convex_anim;
    border-radius: calc(21 / 780 * 100vw);

    button {
        padding: .5rem .5rem .5rem .75rem;
    }
    .-first {
        padding: .5rem .75rem .5rem .5rem;
    }
    .-first &__ico {
        transform: rotate(180deg);
    }
    &__ico {
        display: block;
        height: 1.5rem;
    }
    &.-favorited {
        @include NM_normal_anim;
    }
}
</style>

<script>
export default {
    props: {
        isFirst: Boolean
    }
}

</script>