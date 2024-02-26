<script setup>
import { ref, shallowRef } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

const page = ref({ title: 'Sample Page' });
const breadcrumbs = shallowRef([
    {
        title: 'Others',
        disabled: false,
        href: '#'
    },
    {
        title: 'Sample Page',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <div>
        <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
        <v-row>
            <v-col cols="12" md="12">
                <UiParentCard :title="'Hi there, ' + authUser?.name + '!'">

                    <p>You're logged in with <b>{{ authUser?.email }}</b> + JWT with Refresh Tokens!!</p>

                    <p class="my-4">
                    Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie
                    magna alissa. Ut enif ad
                    minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube
                    grue dolor in
                    reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non
                    president, sunk in culpa qui
                    officiate descent molls anim id est labours.
                    </p>
                </UiParentCard>
            </v-col>
        </v-row>
    </div>
</template>
