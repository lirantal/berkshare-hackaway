<template>
    <div class="h-screen w-screen flex justify-center items-center">
        
    <div>
        <div v-if="loggedIn">
            <p>Welcome back, {{ user.full_name }}!</p>
            <button @click="clear">Log out</button>
        </div>
        <div v-else>
            <p>You are not logged in.</p>
            <Button>
                <nuxt-link to="/login">Log in</nuxt-link>
            </Button>
        </div>
    </div>
    
</div>

</template>

<script setup>
import { onMounted } from 'vue';

let loggedIn = ref(false)
let user = ref({})

onMounted(async () => {
    const userDetails = await $fetch('/api/user')
    user.value = userDetails
    loggedIn.value = !!userDetails.user_id
})

</script>