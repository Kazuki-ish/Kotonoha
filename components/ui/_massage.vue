<template>
    <div class="message" :class="{'-reveal': $store.state.common.hasMessage,  }">
        <p class="massage__txt">
            {{ $store.state.common.messageText }}
        </p>
    </div>

</template>

<style lang="scss">
.message {
    @include cubic_ease(transform);
    border-radius: 4px;
    background-color: #B1D615;
    bottom: 0;
    color: black;
    box-shadow: 4px 4px 4px #D3D2CB;
    transform: translateX(-200%);
    position: fixed;
    padding: 8px;
    margin: 0 0 4px 4px;
    z-index: 9999;
    &.-reveal {
        transform: translateX(0);
    }
}

.message__txt {
    
}
</style>

<script>
    export default {
        computed: {
            hasMessage() {
                return this.$store.state.common.hasMessage
            },
        },
        watch: {
            hasMessage(after, before) {
                if(after == false) {
                    setTimeout(() => {
                        this.$store.commit("common/clearMessage")
                    }, 200);
                }
            }
        }
    }
</script>