<template>
  <main class="l-main">
  <LayoutsHeader />
  <section class="c-vertical-inner" id ="js-c-scroll">
    <div class="c-vertical"><p><span class="big">このページはトップページらしい。</span><br></p>
      <p>小説と名のついたWebサイトのほとんどは横書きでレイアウトされています。日本で最も人気なあのサイトも、大手出版社が鳴り物入りでリリースしたあのサイトも、ギリギリ小説サイトとして使えるブログ形式のあのサイトも。新しいサイトができるたびに、作者はがっかりしました。また横書きかよ、と。それから、またラノベかよ、とも。<br></p>
      <p>でも、それは当然なのです。なぜなら縦書きにするのは難しいから。Webは英語圏で作られたため、横書きを前提に設計されています。単純に縦横で切り替えられる問題ではないのです。ただでさえ字間の設定すらシビアな中で、縦書きに配慮することは難しいです。<br></p>
      <p>コトノハは、それらを解決すべく生みだされました。縦書きのための機能を順次開発しながら、エリアを限定することで「縦書き小説投稿サイト」を実現しています。<br></p>
      <p>また、今のところ、コトノハではライトノベルをジャンルとして置いていません。今後増えるかもしれませんが、ライトな読み物を扱うサイトはあふれています。そうではなく、純文学を主体とした、もっと硬派なサイトを目指していきます。</p>
      <ModulesScroll ref="scroll"/>
    </div>
  </section>
  </main>
</template>

<script>
export default {
  name: 'TopPage',
  
  data() {
    return {
      isScroll: true
    };
  },
  mounted () {
    this.$refs.scroll.scrollSet()
  },
}
</script>

<style lang="scss" scoped>


</style>