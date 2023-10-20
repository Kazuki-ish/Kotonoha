<template>
    <div class="fav" :class="{ '-favorited': $store.state.novels.isFavorite == true }">
        <button @click="favHandler" class="fav__btn">
            <img class="fav__ico" src="~/assets/imgs/ico/favorite.png">
        </button>
    </div>
</template>

<style lang="scss" scoped>
.fav {
    @include absolute(50%, 50%);
    color: black;
    display: flex;
    justify-content: center;
    transform: translate(-50%, -50%);

    button {
        @include cubic_ease(box-shadow, $time: .2s);
        @include NM_convex_anim;
        border-radius: calc(21 / 780 * 100vw);
        padding: 0.5rem .75rem;

        &:nth-child(n + 2) {
            margin-left: calc(94 / 780 * 100vw);
        }
    }

    &__ico {
        display: block;
        width: 1.5rem;
    }
}

.-favorited .fav__btn {
    @include NM_normal_anim;
}
</style>

<script>
export default {

    data() {
        return {
            isBtnClickable: true,
        }
    },

    async fetch() {
    },
    methods: {
        async favHandler() {
            this.isBtnClickable = false;

            if (!this.$store.state.user.isLogin) {
                this.$router.push('/signup');
            }
            else {
                await this.$store.dispatch("novels/addFavorite")
                // console.log(this.$store.state.novels.readingNovel)

                // 一定時間後にボタンを再びクリック可能にする
                setTimeout(() => {
                    this.isBtnClickable = true;
                }, 1000); // 1秒のクールタイム
            }
        }
    },
}
</script>