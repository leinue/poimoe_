<template>
   <p>hello im index.vue</p>
</template>
<script>
    export default {
        data() {
            return {
                msg: 'Hello World!!'
            }
        },
        components: {
        }
    };
</script>
<style>
    .nav {
        margin: 10px;
    }
    .nav li {
        display: inline-block;
        font-size: 25px;
    }
    .page {
        margin: 10px;
        background-color: #ccc;
        height: 800px;
        width: 1200px;
    }
</style>