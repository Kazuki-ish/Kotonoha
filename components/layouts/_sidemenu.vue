<template>
    <div class="sidemenu">
        <div class="l-sidemenu">
            <UiLoginButton />
            <nav id="MenuList" :class="{ open:this.$store.state.common.isOpenMenu }">
                <ul class="sidemenu__list">
                    <li class="sidemenu__item" v-for="menu in menus" v-if="menu.public" >
                        <nuxt-link :to="menu.href">
                            <p class="sidemenu__item__link" >{{menu.title}}</p>
                        </nuxt-link>
                    </li>
                </ul>
                <!-- <UiAd /> -->
            </nav>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .sidemenu{

        &__list{
            margin-top:60px;
            
        }

        &__item{
            @include NM_convex;
            margin-left:12px;
            border-radius: 9999px 0 0 9999px;

            &:nth-child(n+2){
                margin-top:8px;
                
            }
            &__link{
                padding:14px 0 14px 24px;
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
        @include NM_convex_side;
        background-color: $base-color;
        height: 110vh;
        width:70vw;
        margin-top: -5vh;
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
            menus: [
                { public: true, href: '/', title: 'トップに戻る' },
                { public: true, href: '/about/', title: 'コトノハについて' },
                { public: false, href: '/search/', title: '作品を探す' },
                { public: false, href: '/search/', title: '作家を探す' },
                { public: true, href: '/writeNovel/', title: '作品を書く' },
                { public: false, href: '/${uid}/', title: '書いた作品' },
                { public: true, href: '/profile/', title: 'プロフィール' },
                { public: false, href: '/test/', title: 'テストページ' },
            ],
        }
        
    },
    methods: {
        closeMenu(){
            this.$store.commit('common/close')
        },
        toggleOpen() {
            this.$store.commit("common/toggle");
        }
    }
}

</script>