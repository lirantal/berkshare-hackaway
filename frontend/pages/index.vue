<script setup lang="ts">

definePageMeta({
  layout: 'default'
})

import { Activity, ArrowUpRight, CircleUser, CreditCard, DollarSign, Menu, Package2, Search, Users } from 'lucide-vue-next'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'

const userData = useUserStore();
</script>

<template>
  <!-- begin dashboard widgets -->
  <div v-if="userData.role === 'admin'"
    class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
    <Card>
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">
          Total Managed Accounts Balance
        </CardTitle>
        <DollarSign class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          $45,231.89
        </div>
        <p class="text-xs text-muted-foreground">
          +20.1% from last month
        </p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">
          New Customers This Month
        </CardTitle>
        <Users class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          +2350
        </div>
        <p class="text-xs text-muted-foreground">
          +180.1% from last month
        </p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">
          New Transactions This Month
        </CardTitle>
        <CreditCard class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          +12,234
        </div>
        <p class="text-xs text-muted-foreground">
          +19% from last month
        </p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">
          Active Now
        </CardTitle>
        <Activity class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          +573
        </div>
        <p class="text-xs text-muted-foreground">
          +201 since last hour
        </p>
      </CardContent>
    </Card>
  </div>
  <!-- end dashboard widgets -->

  <div v-if="userData.role === 'user'"
    class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
    <Card class="xl:col-span-2">
      <CardHeader class="flex flex-row items-center">
        <div class="grid gap-2">
          <CardTitle>Checking Account</CardTitle>
          <CardDescription>
            Recent transactions in your checking account
          </CardDescription>
        </div>
        <Button as-child size="sm" class="ml-auto gap-1">
          <a href="#">
            View All
            <ArrowUpRight class="h-4 w-4" />
          </a>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction</TableHead>
              <TableHead class="hidden xl:table-column">
                Type
              </TableHead>
              <TableHead class="hidden xl:table-column">
                Status
              </TableHead>
              <TableHead class="hidden xl:table-column">
                Date
              </TableHead>
              <TableHead class="text-right">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div class="font-medium">
                  Electro Power Bill
                </div>
                <div class="hidden text-sm text-muted-foreground md:inline">
                  PO Box 12345
                </div>
              </TableCell>
              <TableCell class="hidden xl:table-column">
                Sale
              </TableCell>
              <TableCell class="hidden xl:table-column">
                <Badge class="text-xs" variant="outline">
                  Approved
                </Badge>
              </TableCell>
              <TableCell class="hidden md:table-cell lg:hidden xl:table-column">
                2023-06-23
              </TableCell>
              <TableCell class="text-right text-red-600">
                -$250.00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div class="font-medium">
                  Mortgage Loan 30yr fixed
                </div>
                <div class="hidden text-sm text-muted-foreground md:inline">
                  Lehman Brother Bank LLC
                </div>
              </TableCell>
              <TableCell class="hidden xl:table-column">
                Refund
              </TableCell>
              <TableCell class="hidden xl:table-column">
                <Badge class="text-xs" variant="outline">
                  Declined
                </Badge>
              </TableCell>
              <TableCell class="hidden md:table-cell lg:hidden xl:table-column">
                2023-06-24
              </TableCell>
              <TableCell class="text-right text-red-600">
                -$2150.00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div class="font-medium">
                  Visa Credit Card
                </div>
                <div class="hidden text-sm text-muted-foreground md:inline">
                  Visa 8916 card issued to Dade Murphy
                </div>
              </TableCell>
              <TableCell class="hidden xl:table-column">
                Subscription
              </TableCell>
              <TableCell class="hidden xl:table-column">
                <Badge class="text-xs" variant="outline">
                  Approved
                </Badge>
              </TableCell>
              <TableCell class="hidden md:table-cell lg:hidden xl:table-column">
                2023-06-25
              </TableCell>
              <TableCell class="text-right text-red-600">
                -$920.00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div class="font-medium">
                  NVIDIA Corp
                </div>
                <div class="hidden text-sm text-muted-foreground md:inline">
                  Recurring Payment
                </div>
              </TableCell>
              <TableCell class="hidden xl:table-column">
                Sale
              </TableCell>
              <TableCell class="hidden xl:table-column">
                <Badge class="text-xs" variant="outline">
                  Approved
                </Badge>
              </TableCell>
              <TableCell class="hidden md:table-cell lg:hidden xl:table-column">
                2023-06-26
              </TableCell>
              <TableCell class="text-right text-green-600">
                +$1250.00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div class="font-medium">
                  Insurance Premium
                </div>
                <div class="hidden text-sm text-muted-foreground md:inline">
                  Life insurance +45 plan
                </div>
              </TableCell>
              <TableCell class="hidden xl:table-column">
                Sale
              </TableCell>
              <TableCell class="hidden xl:table-column">
                <Badge class="text-xs" variant="outline">
                  Approved
                </Badge>
              </TableCell>
              <TableCell class="hidden md:table-cell lg:hidden xl:table-column">
                2023-06-27
              </TableCell>
              <TableCell class="text-right text-red-600">
                -$550.00
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
      </CardHeader>
      <CardContent class="grid gap-8">
        <div class="flex items-center gap-4">
          <Avatar class="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div class="grid gap-1">
            <p class="text-sm font-medium leading-none">
              Olivia Martin
            </p>
            <p class="text-sm text-muted-foreground">
              olivia.martin@email.com
            </p>
          </div>
          <div class="ml-auto font-medium">
            +$1,999.00
          </div>
        </div>
        <div class="flex items-center gap-4">
          <Avatar class="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/02.png" alt="Avatar" />
            <AvatarFallback>JL</AvatarFallback>
          </Avatar>
          <div class="grid gap-1">
            <p class="text-sm font-medium leading-none">
              Jackson Lee
            </p>
            <p class="text-sm text-muted-foreground">
              jackson.lee@email.com
            </p>
          </div>
          <div class="ml-auto font-medium">
            +$39.00
          </div>
        </div>
        <div class="flex items-center gap-4">
          <Avatar class="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/03.png" alt="Avatar" />
            <AvatarFallback>IN</AvatarFallback>
          </Avatar>
          <div class="grid gap-1">
            <p class="text-sm font-medium leading-none">
              Isabella Nguyen
            </p>
            <p class="text-sm text-muted-foreground">
              isabella.nguyen@email.com
            </p>
          </div>
          <div class="ml-auto font-medium">
            +$299.00
          </div>
        </div>
        <div class="flex items-center gap-4">
          <Avatar class="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/04.png" alt="Avatar" />
            <AvatarFallback>WK</AvatarFallback>
          </Avatar>
          <div class="grid gap-1">
            <p class="text-sm font-medium leading-none">
              William Kim
            </p>
            <p class="text-sm text-muted-foreground">
              will@email.com
            </p>
          </div>
          <div class="ml-auto font-medium">
            +$99.00
          </div>
        </div>
        <div class="flex items-center gap-4">
          <Avatar class="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/05.png" alt="Avatar" />
            <AvatarFallback>SD</AvatarFallback>
          </Avatar>
          <div class="grid gap-1">
            <p class="text-sm font-medium leading-none">
              Sofia Davis
            </p>
            <p class="text-sm text-muted-foreground">
              sofia.davis@email.com
            </p>
          </div>
          <div class="ml-auto font-medium">
            +$39.00
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>