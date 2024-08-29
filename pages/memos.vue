<template>
  <div class="max-w-4xl">
    <Card>
        <CardHeader>
        <CardTitle>Memo to bank teller</CardTitle>
        <CardDescription>Caution: do not share personally identifying information.</CardDescription>
        </CardHeader>
        <CardContent>
        <form>
            <div class="grid items-center w-full gap-4">
            <div class="flex flex-col space-y-1.5">
                <Label for="name">Memo</Label>
                <Textarea
                    id="memo"
                    default-value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                    class="min-h-24"
                />
            </div>
            <div class="flex flex-col space-y-1.5">
                <Label for="urgency">Urgency</Label>
                <Select>
                <SelectTrigger id="urgency">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                    <SelectItem value="low">
                    Low
                    </SelectItem>
                    

                </SelectContent>
                </Select>
            </div>
            </div>
        </form>
        </CardContent>
        <CardFooter class="flex justify-between px-6 pb-6">
        <Button>Send</Button>
        </CardFooter>
    </Card>

    <hr class="m-10"/>

    <Card class="max-w-4xl mt-4">
    <CardContent>
        <div class="flex items-center gap-4 mt-4">
              <Avatar class="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div class="grid gap-1">
                <p class="text-sm">
                  My message for doing something about something is this and lorem ipsumim My message for doing something about something is this and lorem ipsumim My message for doing something about something is this and lorem ipsumim My message for doing something about something is this and lorem ipsumim 
                  My message for doing something about something is this and lorem ipsumim My message for doing something about something is this and lorem ipsumim
                </p>
            </div>
        </div>
    </CardContent>
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
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
</script>
