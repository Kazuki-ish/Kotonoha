<template>
    <div class="l-menubutton">
        <button id="OpenMenu" class="menubutton"
            :class="{ 
                '-open': this.$store.state.common.isOpenMenu,
                '-dent': this.$store.state.common.isOpenMenu,
                '-reading': this.$store.state.common.isReading,
                }"
            v-on:click="toggleOpen">
            <div class="l-lines c-reading" :class="{'-reading': this.$store.state.common.isReading}" ><span></span><span></span><span></span></div>
        </button>
        <div class="sidemenu-wrap" :class="{ '-open': this.$store.state.common.isOpenMenu }">
            <LayoutsSidemenu />
        </div>
        <div id="MenuBg" class="menubutton__bg" :class="{ '-open': this.$store.state.common.isOpenMenu }"
            v-on:click="toggleOpen"></div>
    </div>
</template>

<style lang="scss" scoped>
.l-menubutton {
    position: absolute;
    top: 50%;
    right: 6px;
    transform: translateY(-50%);
    z-index: 10;

    .menubutton {
        z-index: 100;
    }
}

.sidemenu-wrap {
    @include cubic_ease;
    position: absolute;
    right: -6px;
    top: -6px;
    z-index: 3;
    transform: translate(100%);
    opacity: 0;

    &.-open {
        transform: translate(0%);
        opacity: 1;
    }
}

.menubutton {
    @include NM_convex_anim;
    @include cubic_ease;
    position: relative;
    /*ボタン内側の基点となるためrelativeを指定*/
    cursor: pointer;
    width: 48px;
    height: 48px;
    margin: auto 0 auto auto;
    border-radius: calc(21 / 768 * 100vw);

    @media screen and (min-width: 768px) {
        border-radius: 12px;
    }

    .l-lines {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    span {
        @include cubic_ease;
        display: block;
        height: 2px;
        border-radius: 2px;
        background: #A3C612;
        width: 26px;
        margin-top: 6px;

    }

    & span:nth-of-type(1) {
        margin-top: 0;

    }

    & span:nth-of-type(2) {
        transform-origin: 50% 50%;

    }

    &.-dent {
        @include NM_dent_anim;
    }

    &.-reading {
        @include NM_normal_anim;
    }

    &.-open span {
        margin: -1px;

        &:nth-of-type(1) {
            transform: rotate(-45deg);

        }

        &:nth-of-type(2) {
            transform: scale(0);

        }

        &:nth-of-type(3) {
            transform: rotate(45deg);

        }
    }
}

.menubutton__bg {
    @include cubic_ease;
    position: fixed;
    top: -6px;
    right: -6px;
    z-index: 2;
    width: 100vw;
    height: 100vh;
    background: black;
    opacity: 0;
    pointer-events: none;

    &.-open {
        // opacity: .15;
        pointer-events: auto;
    }
}
</style>

<script>

export default {
    data() {
        return {};
    },
    methods: {
        toggleOpen() {
            this.$store.commit("common/toggle")
            this.$store.commit('common/setIsReading', false)
        }
    }
}
</script>