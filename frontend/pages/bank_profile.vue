<template>
    <div class="max-w-4xl">
        <Card>
            <CardHeader>
                <CardTitle>Bank Profile</CardTitle>
                <CardDescription>Your financial profile profile
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div class="flex flex-col py-6" v-if="userData.role === 'admin'">
                    <Label class="py-2" for="customers">Select customer</Label>
                    <Select v-model="userId">
                        <SelectTrigger id="customers">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectGroup v-for="user in usersList"
                                :key="user.id">
                                <SelectItem :value="user.id">
                                    {{ user.full_name }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <form v-if="bank_profile_id" class="">
                    <div class="grid items-center w-full gap-4">
                        <div class="flex flex-col space-y-1.5">
                            <Label for="Opening Balance">Opening balance</Label>
                            <Input v-model="opening_balance"
                                :disabled="userData.role !== 'admin'"
                                id="opening_balance" />
                        </div>

                        <div class="flex flex-col space-y-1.5">
                            <Label for="Fee Per Transaction">Fee Per
                                Transaction</Label>
                            <Input v-model="fee_per_transaction"
                                :disabled="userData.role !== 'admin'"
                                id="fee_per_transaction" />
                        </div>

                        <div class="flex flex-col space-y-1.5">
                            <Label for="Credit Limit">Credit Limit</Label>
                            <Input v-model="credit_limit"
                                :disabled="userData.role !== 'admin'"
                                id="credit_limit" />
                        </div>

                        <div class="flex flex-col space-y-1.5">
                            <Label for="Account Number">Account Number</Label>
                            <Input v-model="account_number" disabled
                                id="account_number" />
                        </div>

                        <input type="hidden" :value="bank_profile_id" />
                    </div>
                </form>
            </CardContent>
            <CardFooter v-if="userData.role === 'admin'"
                class="flex justify-end px-6 pb-6">
                <Button @click="save">Save</Button>
            </CardFooter>
        </Card>
    </div>
</template>

<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";

const userData = useUserStore();

const userId = ref();
const usersList = ref([]);

const opening_balance = ref("");
const fee_per_transaction = ref("");
const credit_limit = ref("");
const account_number = ref("");
const bank_profile_id = ref("");


onMounted(async () => {
    
    if (userData.role === 'admin') {
        const response = await $fetch("/api/users");
        usersList.value = response.users
    } else {
        userId.value = userData.user_id
    }
    
})

watch(userId, async () => {
    if (userId.value) {
        const data = await $fetch(`/api/bank_profile/${userId.value}`);

        opening_balance.value = data.bank_profile.opening_balance;
        fee_per_transaction.value = data.bank_profile.fee_per_transaction;
        credit_limit.value = data.bank_profile.credit_limit;
        account_number.value = data.bank_profile.account_number;
        bank_profile_id.value = data.bank_profile.id;
    }
});

const save = async () => {

    await $fetch('/api/bank_profile', {
        method: 'POST',
        body: {
            opening_balance: opening_balance.value,
            fee_per_transaction: fee_per_transaction.value,
            credit_limit: credit_limit.value,
            user_id: userId.value
        }
    })

}
</script>
