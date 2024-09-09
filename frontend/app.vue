<template>
    <div>
        <div v-if="loading" class="h-screen w-screen flex justify-center items-center">
            Loading ...
        </div>
        <NuxtLayout v-else>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script setup>
let loading = ref(true)
let loggedIn = ref(false)
let user = ref({})

onMounted(async () => {
    try {
        const userDetails = await $fetch('/api/user')
        user.value = userDetails
        loggedIn.value = !!userDetails.user_id
        loading.value = false
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
})

</script>