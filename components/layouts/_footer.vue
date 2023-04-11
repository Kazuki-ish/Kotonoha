<template>
    <footer :class="{
        '-write':$route.name == 'write', 
        '-profile':$route.name == 'profile'
    }">
        <div class="button-list" v-if="$route.name == 'write'">
            <button></button>
            <button @click="emitText"></button>
            <button></button>
        </div>
        <div class="mode" v-if="$route.name == 'profile'">
            <p class="mode__txt -view" :class="{'-active': !this.$store.state.user.editProfile }">表示</p>
            <button class="mode__btn" :class="{'-off': !this.$store.state.user.editProfile }" @click="changeMode">
                <div class="mode__btn__cir"></div>
            </button>
            <p class="mode__txt -edit" :class="{'-active': this.$store.state.user.editProfile }">編集</p>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
    footer {
        bottom: 0;
        height: calc( 120 / 1686 * 100vh);
        position: absolute;
        pointer-events: auto;
        width: 100%;

        &.-write {
            //@include NM_convex;
            pointer-events: visible;
        }
        &.-profile {
            //@include NM_convex;
            pointer-events: visible;
        }
    }
    .button-list {
        display: flex;
        justify-content: center;
        margin-top: calc(12 / 1686 * 100vh);

        button {
            @include NM_convex;
            border-radius: calc(21 / 780 * 100vw);
            height: calc(96 / 780 * 100vw);
            width: calc(96 / 780 * 100vw);

            &:nth-child(n + 2){
                margin-left: calc(94 / 780 * 100vw);
            }
        }
    }

    $btn: 32px;
    .mode {
        display: flex;
        position: relative;
        margin: 0 24px;
    }
    .mode__txt {
        @include cubic_ease;
        text-align: center;
        opacity: .2;
        width: 50%;

        &.-view {
            padding-right: $btn;
        }
        &.-edit {
            padding-left:  $btn;
        }
        &.-active {
            opacity: 1;
        }
    }
    .mode__btn {
        @include cubic_ease;
        background-color: #A3C612;
        border-radius: 9999px;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        width: calc($btn * 2);

        &.-off {
             background-color: transparent;   
        }
    }
    .mode__btn__cir {
        @include cubic_ease;
        @include NM_convex;
        background-color:$base-color;
        border-radius: 9999px;
        transform: translateX(100%);
        width: $btn;
        height: $btn;

        .-off & {
            transform: translate(0);
        }
    }
</style>

<script>
    export default {
        name:'Footer',
        computed: {
            profileMode(){
              return this.$store.state.user.editProfile;
            }
        },
        methods: {
            emitText() {
                this.$emit('saveText')
            },
            changeMode() {
                this.$store.commit('user/toggleMode')
                // console.log(this.$store.state.user.editProfile)
            }
        }
    }
</script>