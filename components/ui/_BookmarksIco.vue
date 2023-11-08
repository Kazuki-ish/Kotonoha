<template>
    <li class="bookmarkIco" :class="index" ref="absContent">
        <img class="bookmark__ico" src="~/assets/imgs/ico/bookmarked.png">
    </li>
</template>

<style lang="scss">
.bookmarkIco {
    position: absolute;
    top: 0;
    width: 1rem;
    min-height: 1rem;

    img {}
}
</style>

<script>
export default {

    props: {
        index: Number,
    },
    mounted() {
        this.setIcoPosition()
    },
    computed: {
        icoPosition() {
            return this.$store.state.novels.bookmarks[this.index]
        }
    },
    methods: {
        setIcoPosition() {
            const position = this.IcoPosition
            // this.$refs.absContent.style.right = position
        }
    },
}
</script>