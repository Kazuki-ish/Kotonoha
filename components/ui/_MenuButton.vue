<template>
    <div class="l-menubutton">
        <button id="OpenMenu" class="menubutton" :class="{ '-open': isOpenMenu, '-dent': isOpenMenu }"
            v-on:click="isOpenMenu = !isOpenMenu">
            <div class="l-lines"><span></span><span></span><span></span></div>
        </button>
        <div class="sidemenu-wrap" :class="{ '-open': isOpenMenu }">
            <LayoutsSidemenu :isOpenMenu="isOpenMenu" />
        </div>
        <div id="MenuBg" :class="{ '-open': isOpenMenu }" v-on:click="isOpenMenu = false"></div>
    </div>
</template>

<style lang="scss" scoped>
.l-menubutton {
    position: absolute;
    top: 50%;
    right: 6px;
    transform: translateY(-50%);

    .menubutton {
        z-index: 100;
    }
}

.sidemenu-wrap {
    position: absolute;
    right: -6px;
    top: -6px;
    z-index: 3;
    transform: translate(100%);
    @include cubic_ease;

    &.-open {
        transform: translate(0%);
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
    border-radius: 9999px;

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

#MenuBg {
    position: fixed;
    top: -6px;
    right: -6px;
    z-index: 2;
    width: 100vw;
    height: 100vh;
    background: black;
    opacity: 0;
    @include cubic_ease;
    pointer-events: none;

    &.-open {
        opacity: .2;
        pointer-events: auto;
    }
}
</style>

<script>
export default {
    data() {
        return {
            isOpenMenu: '',
        }
    }
}
</script>