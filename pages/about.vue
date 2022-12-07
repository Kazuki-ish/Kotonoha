<template>
  <div>
    <LayoutsHeader />
    <section class="c-inner">
      <p class="vertical"><span calss="big">縦書きの小説サイトが無い。</span><br>
        　小説と名のついたWebサイトのほとんどは横書きでレイアウトされています。日本で最も人気なあのサイトも、大手出版社が鳴り物入りでリリースしたあのサイトも、ギリギリ小説サイトとして使えるブログ形式のあのサイトも。新しいサイトができるたびに、作者はがっかりしました。また横書きかよ、と。それから、またラノベかよ、とも。<br>
        　でも、それは当然なのです。なぜなら縦書きにするのは難しいから。Webは英語圏で作られたため、横書きを前提に設計されています。単純に縦横で切り替えられる問題ではないのです。ただでさえ字間の設定すらシビアな中で、縦書きに配慮することは難しいです。<br>
        　コトノハは、それらを解決すべく生みだされました。縦書きのための機能を順次開発しながら、エリアを限定することで「縦書き小説投稿サイト」を実現しています。<br>
        　また、今のところ、コトノハではライトノベルをジャンルとして置いていません。今後増えるかもしれませんが、ライトな読み物を扱うサイトはあふれています。そうではなく、純文学を主体とした、もっと硬派なサイトを目指していきます。</p>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  .c-inner{
    height:609px;
    margin: 20px 20px 0 0;
    overflow-y: hidden;
    overflow-x: scroll;
    white-space: pre-wrap;
  }
  .vertical{
    vertical-align: text-top;
    writing-mode: vertical-rl;
    line-height:calc(52 / 32);
    letter-spacing: 0.075em;
    height:100%;
    direction:ltr;
    z-index: -9999;

    .big{
      font-size:2rem;
    }
  }
</style>

<script>
export default {
  name: 'AboutPage'
  
}
</script>
