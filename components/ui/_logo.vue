<template>
    <h1 class="maintitle"><nuxt-link to="/">コトノハ</nuxt-link></h1>
</template>

<style lang="scss" scoped>
    .maintitle {	
        font-family: 'Noto Serif JP', sans-serif;
        font-size:24px;
        letter-spacing: -0.05em;
        line-height: calc(82 / 48);
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        
        a {
            text-decoration: none;
        }
        a:visited {
            color:black;
        }
    }
</style>

<script>
    export default {
        name:'Logo'
    }
</script>