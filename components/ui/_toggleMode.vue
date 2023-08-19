<template>
    <div class="toggleMode">
        <div class="mode" v-if="$route.name == 'profile' || $route.name == 'myNovels'">
            <p class="mode__txt -view" :class="{ '-active': !this.$store.state.user.editProfile }">表示</p>
            <button class="mode__btn" :class="{ '-off': !this.$store.state.user.editProfile }" @click="changeMode">
                <div class="mode__btn__cir"></div>
            </button>
            <p class="mode__txt -edit" :class="{ '-active': this.$store.state.user.editProfile }">編集</p>
        </div>

        <!-- <div class="mode" v-if="$route.params.slug && $route.params.slug.startsWith('-') || $route.name == 'preview'">
            <p class="mode__txt -view" :class="{ '-active': !this.$store.state.user.editNovel }">プレビュー</p>
            <button class="mode__btn" :class="{ '-off': !this.$store.state.user.editNovel }" @click="changeNovelMode">
                <div class="mode__btn__cir"></div>
            </button>
            <p class="mode__txt -edit" :class="{ '-active': this.$store.state.user.editNovel }">書く</p>
        </div> -->
    </div>
</template>
<style lang="scss">
// toggleボタンは共通化して引数で指定できるようにする
$btn: 32px;

.toggleMode {
    position: relative;
    top: 16px;
}
.mode {
    display: flex;
    position: relative;
    margin: 0 24px;
}

.mode__txt {
    @include cubic_ease;
    text-align: center;
    opacity: .2;
    width: 50%;

    &.-view {
        margin-right: $btn;
    }

    &.-edit {
        margin-left: $btn;
    }

    &.-active {
        opacity: 1;
    }
}

.mode__btn {
    @include cubic_ease;
    @include NM_dent_op;
    background-color: #A3C612;
    border-radius: 9999px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc($btn * 2);

    &.-off {
        background-color: transparent;
    }
}

.mode__btn__cir {
    @include cubic_ease;
    @include NM_convex_op;
    background-color: $base-color;
    border-radius: 9999px;
    transform: translateX(100%);
    width: $btn;
    height: $btn;

    .-off & {
        transform: translate(0);
    }
}
</style>

<script>
export default {
    computed: {

        watchMode() {
            return this.$store.state.user.editProfile

        },
        returnRoute(name) {
            $route.name == name;
        }
    },

    methods: {
        changeMode() {
        this.$store.commit('common/setIsMounted', false); 
        setTimeout(() => {
            this.$store.commit('user/toggleMode')
        }, 200)
            // console.log(this.$store.state.user.editProfile)
        },
        changeNovelMode() {
            this.$store.commit('user/toggleNovelMode')
            // console.log(this.$store.state.user.editNovel)
        },
    },
    watch: {
        watchMode(beforeToggle, afterToggle) {
            if (this.$route.name =='profile' || this.$route.name =='myNovels') {
                if (afterToggle == true) {
                    this.$router.push('/myNovels');
                    this.$store.commit("common/inputPageName", '書いた作品')
                }
                else {
                    this.$router.push('/profile');
                    this.$store.commit("common/inputPageName", 'プロフィール')
                }
            }
        },
    },
}

</script>