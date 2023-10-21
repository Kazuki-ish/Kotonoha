<template>
    <div class="btn-wrapper">
        <slot></slot>
    </div>
</template>

<stlye lang="scss" scoped>
    .btn-wrapper{
        @include absolute(50%, 50%);
        align-items:center;
        color: black;
        display: flex;
        justify-content: center;
        transform: translate(-50%, -50%);

        & div {
            &:nth-of-type(n + 2) {
                margin-left: 1.25rem;
            }
        }
    }
</stlye>

<script></script>