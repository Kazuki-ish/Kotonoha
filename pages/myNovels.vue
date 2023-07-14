<template>
    <section class="c-vertical-inner" id="js-c-scroll">
        <UiBooklist :isProfile="isProfile" />
    </section>
</template>

<style lang="scss" scoped></style>
  
<script>
export default {
    data() {
        return {
            isProfile: true,
        }
    },
    computed: {
        watchMode() {
            return this.$store.state.user.editNovel;
        },
    },
    async fetch() {
        this.setPageName()
        // this.setUser()
    },
    created() {
        // console.log(this.$store.state.user.editNovel)
        // console.log(this.displayName)
    },
    watch: {
        uid(newUid, oldUid) {
            if (newUid) {
                // uidが存在し、新しいuidと古いuidが異なる場合にfetchUserNovelsを実行
                if (!oldUid || newUid !== oldUid) {
                    this.fetchUserNovels();
                }
            }
        },
        watchMode(beforeToggle, afterToggle) {
            if (afterToggle == true) {
                this.$scrollSet();
            }
        }
    },
    methods: {
        setPageName() {
            this.$store.commit("common/inputPageName", '書いた小説')
        },
        // async setUser() {
        //     this.$store.dispatch('user/setUserFromAuth')
        // },
    },
};
</script>
  