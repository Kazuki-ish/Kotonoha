<template>
    <div class="l-menubutton">
        <div class="openbtn1"><span></span><span></span><span></span></div>
    </div>
</template>

<style lang="scss">
    .l-menubutton {
        width:48px;
        height:48px;
        position: absolute;
        top:50%;
        right:12px;
        transform: translateY(-50%);
    }
    .openbtn1{
    position: relative;/*ボタン内側の基点となるためrelativeを指定*/
    background:#EDEBE1;
    box-shadow:-6px -6px 12px rgba(255, 255, 255, 0.33),
                3px 3px 6px rgba(0, 0, 0, 0.16);
    cursor: pointer;
        width: 50px;
        height:50px;
    margin:auto 0 auto auto;
    border-radius: 5px;
    }

    /*ボタン内側*/
    .openbtn1 span{
        display: inline-block;
        transition: all .4s;/*アニメーションの設定*/
        position: absolute;
        left: 14px;
        height: 3px;
        border-radius: 2px;
        background: #A3C612;
        width: 45%;
    }

    .openbtn1 span:nth-of-type(1) {
    top:15px; 
    }

    .openbtn1 span:nth-of-type(2) {
    top:23px;
    }

    .openbtn1 span:nth-of-type(3) {
    top:31px;
    }

    /*activeクラスが付与されると線が回転して×に*/

    .openbtn1.active span:nth-of-type(1) {
        top: 18px;
        left: 18px;
        transform: translateY(6px) rotate(-45deg);
        width: 30%;
    }

    .openbtn1.active span:nth-of-type(2) {
    opacity: 0;/*真ん中の線は透過*/
    }

    .openbtn1.active span:nth-of-type(3){
        top: 30px;
        left: 18px;
        transform: translateY(-6px) rotate(45deg);
        width: 30%;
    }

</style>

<script>
</script>