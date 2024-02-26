<script setup>
import { ref, shallowRef, onMounted, watch   } from 'vue';

import { Form, useForm  } from 'vee-validate';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

import { useAuthStore } from '@/stores/auth';
import { useUsersStore } from '@/stores/users';

const authStore = useAuthStore();
const usersStore = useUsersStore();

const { handleSubmit, validate } = useForm();

const page = ref({ title: 'Profile' });
const breadcrumbs = shallowRef([
    {
        title: 'Account',
        disabled: true,
        href: '#'
    },
    {
        title: 'Profile',
        disabled: true,
        href: '#'
    }
]);

const valid = ref(false);
const show1 = ref(false);
const show2 = ref(false);
const password = ref('');
const passwordConfirm = ref('');
const localEmail = ref('');
const localName = ref();
const passwordRules = ref([
    (v) => !!v || 'Password is required',
    (v) => (v && v.length >= 8) || 'Password must be greater than 8 characters'
]);
const confirmPasswordRules = ref([
    (v) => !!v || 'Password confirmation is required',
    (v) => (v && v === password.value) || 'Passwords do not match'
]);
const emailRules = ref([(v) => !!v || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);

const onValidSubmit = (values, { setErrors, isValid  }) => {
    console.log('1 SUBMIT FORM AFTER VALIDATION', values)
    return usersStore.updateProfile(localName.value, localEmail.value, password.value).catch((error) => {
        console.log('ON SUBMIT EROR', error)
        setErrors({ apiError: error })
    });

}

function onInvalidSubmit(errors, { setErrors }) {
    console.log('2 INVALID SUBMIT FORM AFTER VALIDATION', errors)
}

const submitProfile = handleSubmit(onValidSubmit, onInvalidSubmit)

onMounted(() => {
    if (authStore.user && authStore.user.name) {
        localName.value = authStore.user.name;
    }
    if (authStore.user && authStore.user.email) {
        localEmail.value = authStore.user.email;
    }
});

watch(() => authStore.user.name, (newName) => {
    if (localName.value === '') {
        localName.value = newName;
    }
});
watch(() => authStore.user.name, (newEmail) => {
    if (localEmail.value === '') {
        localEmail.value = newEmail;
    }
});

</script>

<template>
    <div>
        <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
        <v-row>
            <v-col cols="12" md="12">
                <UiParentCard >

                    <Form @submit="submitProfile" class="mt-7 loginForm" v-slot="{ errors, isSubmitting }">
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="localName" density="comfortable" hide-details="auto" variant="outlined"
                                    color="primary" label="Your Name">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="localEmail" type="email" :rules="emailRules" label="Email Address" required
                                    density="comfortable" hide-details="auto" variant="outlined" color="primary">
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-text-field v-model="password" :rules="passwordRules" label="New Password" required density="comfortable"
                            variant="outlined" color="primary" hide-details="auto" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" class="pwdInput mb-4 mt-4">
                        </v-text-field>
                        <v-text-field v-model="passwordConfirm" :rules="confirmPasswordRules" label="Confirm Password" required density="comfortable"
                            variant="outlined" color="primary" hide-details="auto" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show2 ? 'text' : 'password'" @click:append="show2 = !show2" class="pwdInput">
                        </v-text-field>


                        <div class="d-flex justify-end mt-5">
                            <v-btn color="secondary" :loading="isSubmitting" class="mt-2" variant="flat" size="large" type="submit" :disabled="false">
                                Update
                            </v-btn>
                        </div>

                        <div v-if="errors.apiError" class="mt-2">
                            <v-alert color="error">
                                {{ errors.apiError }}
                                
                            </v-alert>
                        </div>
                    </Form>


                </UiParentCard>
            </v-col>
        </v-row>
    </div>
</template>
