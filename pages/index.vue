<template>
    <div>
        Hello
    </div>

    <div>
        <div v-if="loggedIn">
            <p>Welcome back, {{ user.name }}!</p>
            <button @click="clear">Log out</button>
        </div>
        <div v-else>
            <p>You are not logged in.</p>
            <nuxt-link to="/login">Log in</nuxt-link>
        </div>
    </div>
    

</template>

<script setup>
const { loggedIn, user, session, fetch, clear } = useUserSession()
</script>