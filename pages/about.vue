<template>
  <section class="c-vertical-inner" id="js-c-scroll" ref="scrollContent">
    <div class="c-vertical">
      <p><span class="big">縦書きの小説サイトが無い。</span><br></p>
      <p>
        小説と名のついたWebサイトのほとんどは横書きでレイアウトされています。日本で最も人気なあのサイトも、大手出版社が鳴り物入りでリリースしたあのサイトも、ギリギリ小説サイトとして使えるブログ形式のあのサイトも。新しいサイトができるたびに、作者はがっかりしました。また横書きかよ、と。それから、またラノベかよ、とも。<br>
      </p>
      <p>
        でも、それは当然なのです。難しいから。Webは英語圏で作られたため、横書きを前提に設計されています。単純に縦横で切り替えられる問題ではないのです。ただでさえ字間の設定すらシビアな中で、書くのも読むのも縦書きに対応するサイトは、これまでありません。<br>
      </p>
      <p>コトノハは、それらを解決すべく生みだされました。機能を順次開発中ですが、縦書きを行うエリアを限定することで「縦書き小説投稿サイト」を実現しています。<br></p>
      <p>異世界ファンタジーのような、ライトな読み物を扱うサイトはあふれています。コトノハでは、インターネットで居場所を失った文学を扱いたいと考えています。
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>

.c-vertical {
  .big {
    font-size: 2rem;
  }
}
</style>

<script>
export default {
  name: 'AboutPage',

  data() {
    return {
      pageName: 'コトノハについて',
      isScroll: true
    };
  },
  created() {
    this.$store.commit("common/inputPageName", 'コトノハについて')
    this.$store.commit("common/inputAuther", "メイテイ")
  },
  mounted() {//DOMマウント後に実行

    //右端までスクロールする
    this.$scrollSet(this.$refs.scrollContent)
  },
  destroyed() {
    this.$store.commit("common/inputAuther", "")
  },
}
</script>
