<template>
  <section class="c-vertical-inner -top" id="js-c-scroll">
    <UiBooklist />
  </section>
</template>

<script>
export default {
  name: 'TopPage',

  data() {
    return {
      pageName: 'ホーム',
      isScroll: true,

      // books: [
      //   {
      //     title: 'こころ',
      //     text: '上 \n 先生と私 \n 私はその人を常に先生と呼んでいた。だからここでもただ先生と書くだけで本名は打ち明けない。これは世間を憚る遠慮というより',
      //     author: '夏目漱石',
      //     link: '/my/'
      //   },
      //   {
      //     title: '人間失格',
      //     text: '私は、その男の写真を三葉、見たことがある。 \n 一葉は、その男の、幼年時代、とでも言うべきであろうか、十歳前後かと推定される頃の写真であって、その子供が大勢の女の人にとりかこまれて',
      //     author: '太宰治',
      //     link: '/my/'
      //   },
      //   {
      //     title: '舞姫',
      //     text: '石炭をば早や積み果てつ。中等室の卓のほとりはいと静にて、熾熱燈の光の晴れがましきも徒なり。今宵は夜毎にこゝに集ひ来る骨牌仲間も「ホテル」に宿りて、舟に残れるは余一人のみなれば。',
      //     author: '森鴎外',
      //     link: '/my/'
      //   },
      // ]
    }
  },

}
</script>