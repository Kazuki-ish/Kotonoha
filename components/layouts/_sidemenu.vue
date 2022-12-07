<template>
    <div class="sidemenu">
        <div class="l-sidemenu">
            <nav id="MenuList" :class="{open:isOpenMenu}">
                <ul class="sidemenu__list">
                    <li class="sidemenu__item" v-for="menu in menus" v-if="menu.public">
                        <div class="sidemenu__item__link"><nuxt-link :to="menu.href">{{menu.title}}</nuxt-link></div>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<style lang="scss">
    .sidemenu{

        &__list{
            margin-top:60px;
            
        }

        &__item{
            @include NM_convex;
            padding:14px 0 14px 24px;
            margin-left:12px;
            border-radius: 9999px 0 0 9999px;

            &:nth-child(n+2){
                margin-top:8px;
                
            }
            &__link{
                font-size:20px;
                letter-spacing: -0.05em;
                line-height: calc(68 / 40);
            }

            a{
                text-decoration: none;
            }
        }
    }
    .l-sidemenu{
        @include NM_convex;
        position: relative;
        background-color: #f7f6eb;
        height: 100vh;
        width:70vw;
    }
    #MenuList {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 4;
        width: 100%;
        height: 100%;
    }

</style>

<script>
export default {
    data() {
        return {
        flag: false,
        menus: [
            { public: true, href: '/about/', title: 'コトノハについて' },
            { public: true, href: '/search', title: '小説を探す' },
            { public: true, href: '/search', title: '作家を探す' },
            { public: true, href: '/write/', title: '作品を書く' },
            { public: true, href: '/my/', title: '作品を管理する' },
            { public: false, href: '/test/', title: 'テストページ' },
        ],
        }
    },
    props:{
        isOpenMenu: [Boolean],
    },
}

</script>