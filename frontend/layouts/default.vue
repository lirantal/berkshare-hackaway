<template>
<div class="flex min-h-screen max-w-7xl flex-col justify-center mx-auto">
<header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
  <div>
    <p class="whitespace-nowrap font-bold">
      Berkshare Hackaway
    </p>
  </div>
      <nav class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <a
          href="#"
          class="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 class="h-6 w-6" />
          <span class="sr-only">Acme Inc</span>
        </a>
        <a
          href="/"
          class="text-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </a>
        <a
          href="/memos"
          class="text-muted-foreground transition-colors hover:text-foreground"
        >
          Memos
        </a>
        <a
          href="/bank_profile"
          class="text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
        >
          Bank Profile
        </a>
        <a
          href="/chat"
          class="text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
        >
          Chat ✨
        </a>
      </nav>
      <Sheet>
        <SheetTrigger as-child>
          <Button
            variant="outline"
            size="icon"
            class="shrink-0 md:hidden"
          >
            <Menu class="h-5 w-5" />
            <span class="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav class="grid gap-6 text-lg font-medium">
            <a
              href="#"
              class="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 class="h-6 w-6" />
              <span class="sr-only">Acme Inc</span>
            </a>
            <a
              href="/"
              class="text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </a>
            <a
              href="/memos"
              class="text-muted-foreground hover:text-foreground"
            >
              Memos
            </a>
            <a
              href="/bank_profile"
              class="text-muted-foreground hover:text-foreground"
            >
              Bank Profile
            </a>
            <a
              href="/chat"
              class="text-muted-foreground hover:text-foreground"
            >
              Chat ✨
            </a>
          </nav>
        </SheetContent>
      </Sheet>
      <div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form class="ml-auto flex-1 sm:flex-initial">
          <div class="relative">
            <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              class="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <div class="">
            Welcome, {{ userData.full_name }}
          </div>
          <DropdownMenuTrigger as-child>
            <Button variant="secondary" size="icon" class="rounded-full">
              <CircleUser class="h-5 w-5" />
              <span class="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="logout">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
     
    </header>
    <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <slot />
    </main>
</div>
</template>

<script setup lang="ts">
import { Activity, ArrowUpRight, CircleUser, CreditCard, DollarSign, Menu, Package2, Search, Users } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { Input } from '~/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet'

const userData = useUserStore()

async function logout() {
  await $fetch('/api/logout', {
    method: 'POST',
  })

  window.location.href = '/login'
}

</script>