<template>
    <div class="logo">
        <h1 class="maintitle"><nuxt-link to="/">コトノハ</nuxt-link></h1><span class="prefix">アルファ</span>
    </div>
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
    .prefix {
            font-size: 10px;
            margin-left: 4px;
            opacity: .6;
        }
</style>

<script>
    export default {
        name:'Logo'
    }
</script>