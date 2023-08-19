<template>
    <section class="novel c-vertical-inner" id="js-c-scroll" ref="scrollContent">
        <div class="c-vertical" v-if="novel">
            <p class="write__txt -title">タイトル</p>
            <p class="write__input -title c-vertical-input" ref="novelTitle" v-html="novel.title" 
            @input="updateTitle" contenteditable="true">
            </p>
            <p class="write__txt -body">本文</p>
            <p class="write__input -body c-vertical-input" ref="novelText" v-html="novel.body" 
            @input="updateBody" contenteditable="true"></p>
        </div>
        <!-- <div class="c-vertical" v-else>
            <p>小説が見つかりませんでした。</p>
        </div> -->
    </section>
</template>

<style lang="scss" scoped>
.novel__title {
    display: block;
    margin: 0 4rem;
    max-height: 100%;
}

.novel__body {
    margin-right: 24px;
    max-height: 100%;
}

.write__input {
    @include NM_dent_anim;
    border-radius: 12px;
    margin-top: 8px;
    min-height: 50%;
    padding: 8px 8px 8px 80vw;

    &.-title {
        padding-left: 8px;
    }

}

.write__txt {
    display: block;
    margin-left: 0.5rem;

    &.-body {
        margin-right: 2rem;
    }
}
</style>
<script>

export default {
    data() {
        return {
            novel: null,
        };
    },
    created() {
        this.$store.commit("common/inputPageName", '作品を書く')
        this.$store.commit('user/setMode', this.$route.name)
    },
    async fetch() {
        while (!this.$store.state.user.uid) {
            await new Promise(resolve => setTimeout(resolve, 200)); // middlewareで代入されるまで200ミリ秒待つ
        }
        // console.log(this.$store.state.user.uid)
        const slug = this.$route.params.slug;
        const uid = this.$store.state.user.uid;
        const obj = { uid, slug };

        // const { uid, slug } = this.$route.params;
        this.novel = await this.$store.dispatch('novels/fetchSingleNovel', { uid, slug });
        // console.log(this.novel)

        this.$store.commit('novels/setSlug', slug);
    },
    mounted() {
    },
    updated() {
        this.$scrollSet(this.$refs.scrollContent)
        this.$store.commit("novels/setTitle", this.novel.title);
    },
    methods: {
        addBr(txt) {
            const rawTxt = txt;
            const escapedTxt = rawTxt
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
            let formattedTxt = escapedTxt.replace(/(?:\r\n|\r|\n)/g, "<br>");

            // 最後の <br> タグを削除
            if (formattedTxt.endsWith("<br>")) {
                formattedTxt = formattedTxt.slice(0, -4);
            }

            return formattedTxt;
        },
        updateTitle() {
            const fmTxt = this.addBr(this.$refs.novelTitle.innerText);
            // console.log(fmTxt);
            this.$store.commit("novels/setTitle", fmTxt);
        },
        updateBody() {
            const fmTxt = this.addBr(this.$refs.novelText.innerText);
            // console.log(fmTxt);
            this.$store.commit("novels/setBody", fmTxt);
        },
    },
};
</script>