<template>
    <main class="l-main" >
        <LayoutsHeader />
        <div class="l-main__content" :class="{
                '-mounted': this.$store.state.common.isMounted,
                '-ready': this.$store.state.common.isOpenMenu,
            }">
            <Nuxt  />
        </div>
        <LayoutsFooter class="c-menu-op c-reading" :class="{
            '-ready': this.$store.state.common.isOpenMenu,
            '-reading': this.$store.state.common.isReading
        }" />
    </main>
</template>

<script>

export default {
    mounted() {
    },
    destroyed() {
    },
    // watch: {
    //     '$store.state.common.isMounted'(newValue, oldValue) {
    //         if (newValue === true) {
    //             this.$refs.main.classList.add('-mounted');
    //         } else {
    //             this.$refs.main.classList.remove('-mounted');
    //         }
    //     }
    // },
 }
</script>

<style lang="scss">
    .l-main {
        @include cubic_ease($propaty: opacity);
        height: 100svh;
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

    .c-menu-op {
        @include cubic_ease($propaty: opacity, $time:.2s);
        opacity: 1;
        
        &.-ready {
            opacity: .2;
        }
    }

    .c-reading {
        @include cubic_ease($propaty: opacity );
        opacity: 1;

        &.-reading {
            opacity: .1;
        }
    }

    .l-main__content {
        @include cubic_ease($propaty: opacity, $time:.2s);
        opacity: 0;

        &.-mounted{
            opacity: 1;
        }
        &.-ready {
            opacity: .2;
        }
    }
</style>