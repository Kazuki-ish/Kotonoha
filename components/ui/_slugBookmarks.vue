<template>
    <div class="bookmarks" ref="bookmarks">
        <ul class="bookmarks__list" v-for="(bookmark, index) in bookmarks">
            <UiBookmarksIco :index="index"/>
        </ul>
    </div>
</template>

<style lang="scss">
    .bookmarks {
        position: absolute;
    }
</style>

<script>
export default {
    mounted(){
        this.setBookmarksArea()
    },
    computed: {        
        bookmarks() {
            return this.$store.state.novels.bookmarks
        },
    },
    methods: {
        setBookmarksArea(){
            const ref = this.$refs.bookmarks
            const areaWidth = ref.previousElementSibling.clientWidth
            // console.log(ref.previousElementSibling.clientWidth)
            this.$refs.bookmarks.style.width = areaWidth
        }
    },
    // watch: {
    //     IcoPosition() {
    //         setIcoPosition()
    //     },
    // }
}
</script>