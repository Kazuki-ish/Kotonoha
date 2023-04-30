<template>
    <section class="c-vertical-inner" id="js-c-scroll" ref="scrollContent">
        <div class="c-vertical" v-if="novel">
            <h1 v-html="novel.title"></h1>
            <p v-html="novel.body"></p>
            <!-- <div v-else>
      <p>小説が見つかりませんでした。</p>
    </div> -->
        </div>
        <ModulesScroll ref="scroll" />
    </section>
</template>

<script>
import { db } from '~/plugins/firebase';
import { getDoc, doc, collection, query, where } from 'firebase/firestore';

export default {
    data() {
        return {
            novel: null,
        };
    },
    async fetch() {
        const { uid, slug } = this.$route.params;
        const userDocRef = doc(db, 'novels', uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();

            if (userData.novel && userData.novel[slug]) {
                this.novel = {
                    id: slug,
                    ...userData.novel[slug],
                };
            }
        }
    },
    mounted() {//DOMマウント後に実行

        const refs = this.$refs.scrollContent;

        //右端までスクロールする
        this.$refs.scroll.scrollSet(refs)
    },
};
</script>