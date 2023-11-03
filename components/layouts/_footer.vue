<template>
    <footer :class="{
        '-write-novel': $route.name == 'writeNovel',
        '-wirte': $route.name == 'write',
        '-novel-list': $route.name == 'myNovels',
        '-profile': $route.name == 'profile',
        '-novel-page': $store.state.common.isNovelPage == true,
    }">
        <UiFooterButton />
        <UiMassage />
        <UiToggleMode />
        <UiButtonWrapper v-if="$store.state.common.isNovelPage" >
            <UiFooterBookmarkArrow :isFirst = true v-if="$store.state.novels.beAbleBookmark" />
            <UiFooterBookmarkButton v-if="$store.state.novels.beAbleBookmark" />
            <UiFooterBookmarkArrow v-if="$store.state.novels.beAbleBookmark" />
            <UiFooterFavoriteButton />
        </UiButtonWrapper>
    </footer>
</template>

<style lang="scss" scoped>
footer {
    bottom: 0;
    min-height: 60px;
    position: absolute;
    pointer-events: auto;
    width: 100%;

    &.-write {
        pointer-events: visible;
    }

    &.-profile {
        pointer-events: visible;
    }
}

</style>

<script>

export default {
    name: 'Footer',
    mounted(){
    },
}
</script>