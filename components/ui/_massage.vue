<template>
    <div class="message" :class="{'-reveal': $store.state.user.hasMessage }">
        <p class="massage__txt">
            {{ $store.state.user.messageText }}
        </p>
    </div>

</template>

<style lang="scss">
.message {
    @include cubic_ease;
    background-color: #A3C612;
    bottom: 0;
    color: black;
    transform: translateX(-200%);
    position: fixed;
    padding: 8px;

    &.-reveal {
        transform: translateX(0);
    }
}

.message__txt {
    
}
</style>

<script>
    export default {
    }
</script>