<template>
    <div class="max-w-4xl">
        <Card>
            <CardHeader>
                <CardTitle>Bank Profile</CardTitle>
                <CardDescription>Your financial profile profile
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
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
                            <Input v-model="account_number"
                                disabled
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

<script setup lang='ts'>
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'

const { data, refresh } = await useFetch('/api/bank_profile');

const userData = useUserStore();

const opening_balance = ref('');
const fee_per_transaction = ref('');
const credit_limit = ref('');
const account_number = ref('');
const bank_profile_id = ref('');

if (data.value) {
    opening_balance.value = data.value.bank_profile.opening_balance;
    fee_per_transaction.value = data.value.bank_profile.fee_per_transaction;
    credit_limit.value = data.value.bank_profile.credit_limit;
    account_number.value = data.value.bank_profile.account_number;
    bank_profile_id.value = data.value.bank_profile.id;
}

const save = async () => {

    // @TODO implement properly the saving of data
    // and only allow admins to update in this form

    const response = await $fetch('/api/bank_profile', {
        method: 'POST',
        body: {
            opening_balance: opening_balance.value,
            fee_per_transaction: fee_per_transaction.value,
            credit_limit: credit_limit.value,
            bank_profile_id: bank_profile_id.value
        }
    })

    if (response?.success === true) {
        refresh()
    }

}

</script>