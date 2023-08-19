<template>
    <main class="l-main">
        <LayoutsHeader />
        <div class="l-main__content" ref="main">
            <Nuxt  />
        </div>
        <LayoutsFooter />
    </main>
</template>

<script>

export default {
    mounted() {
    },
    destroyed() {
    },
    watch: {
        '$store.state.common.isMounted'(newValue, oldValue) {
            if (newValue === true) {
                this.$refs.main.classList.add('-mounted');
            } else {
                this.$refs.main.classList.remove('-mounted');
            }
        }
    },
 }
</script>

<style lang="scss">
    .l-main {
        @include cubic_ease;
        max-height: 100svh;
        overflow: hidden;
        max-width: 100svw;
    }

    a {
        color:black;
        text-decoration: none;
    }

    //style conponents 
    .c-black-txt {
        color:black;
    }

    .l-main__content {
        @include cubic_ease($time:.2s);
        opacity: 0;

        &.-mounted{
            opacity: 1;
        }
    }
</style>