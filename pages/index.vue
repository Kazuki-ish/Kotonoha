<template>
  <section class="c-vertical-inner" id ="js-c-scroll">
    <div class="booklist c-vertical">
      <li class="booklist__item" v-for="book in books">
        <h2 class="booklist__item__title">{{ book.title }}</h2>

        <nuxt-link :to="book.link">
          <p class="booklist__item__text">{{ book.text }}</p>
        </nuxt-link>

        <div class="booklist__item__wrapper">
          <h2 class="booklist__item__author">{{ book.author }}</h2>
        </div>
      </li>
    </div>
    <ModulesScroll ref="scroll"/>
  </section>
</template>

<script>
export default {
  name: 'TopPage',

  data() {
    return {
      pageName: 'ホーム',
      isScroll: true,

      books:[
        {
          title:'こころ',
          text: '上 \n 先生と私 \n 私はその人を常に先生と呼んでいた。だからここでもただ先生と書くだけで本名は打ち明けない。これは世間を憚る遠慮というより',
          author: '夏目漱石',
          link:'/my/'
        },
        {
          title:'人間失格',
          text: '私は、その男の写真を三葉、見たことがある。 \n 一葉は、その男の、幼年時代、とでも言うべきであろうか、十歳前後かと推定される頃の写真であって、その子供が大勢の女の人にとりかこまれて',
          author: '太宰治',
          link:'/my/'
        },
        {
          title:'舞姫',
          text: '石炭をば早や積み果てつ。中等室の卓のほとりはいと静にて、熾熱燈の光の晴れがましきも徒なり。今宵は夜毎にこゝに集ひ来る骨牌仲間も「ホテル」に宿りて、舟に残れるは余一人のみなれば。',
          author: '森鴎外',
          link:'/my/'
        },
      ]
    }
  },
  created () {
    this.$store.commit("common/inputPageName", 'ホーム' )
  },
  mounted () {
    this.$refs.scroll.scrollSet()
  },
}
</script>

<style lang="scss" scoped>

.booklist {

  h2 {
    font-size: 1rem;
    font-weight: 300;
    margin: 0;
  }
  p {
    @include NM_convex;
    border-radius: 18px;
    //padding:16px 16px 12px;
    margin: 0;
  }
}

.booklist .booklist__item {
  @include relative;
  height: get_Vh(857);
  //width: get_Vw(373);
  white-space: pre-wrap;
  list-style:none;
  //padding:0 1.4rem;

  &:nth-child(n + 2) {
    margin-right: 0.4rem;
  }
}
.booklist .booklist__item:nth-child(even) {
  margin-top: get_Vh(301);
}

.booklist .booklist__item__wrapper {
  display: flex;
  justify-content: flex-end;
}
.booklist .booklist__item__title {
  line-height: 1;
}
.booklist .booklist__item__author {
  left: 0;
  line-height: 1;
  bottom:0;
}

.booklist .booklist__item__text {
  padding:1rem;
  margin: 0 0.2rem;
}
</style>