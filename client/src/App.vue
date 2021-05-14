<template>
    <div id="app">
        <body class="d-flex flex-column min-vh-100">
            <top />
            <router-view />
            <bot />
        </body>
    </div>
</template>
<script>
import top from './components/top';
import bot from './components/bot';
export default {
    components: {
        top,
        bot
    }
};
</script>
