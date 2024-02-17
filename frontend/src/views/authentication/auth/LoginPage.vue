<script setup>
import Logo from '@/layouts/full/logo/LogoDark.vue';
import AuthLogin from '../authForms/AuthLogin.vue';
</script>

<template>
    <v-row class="h-100vh" no-gutters>
        <!---Left Part-->
        <v-col cols="12" class="d-flex align-center bg-lightprimary">
            <v-container>
                <div class="pa-7 pa-sm-12">
                    <v-row justify="center">
                        <v-col cols="12" lg="10" xl="6" md="7">
                            <v-card elevation="0" class="loginBox">
                                <v-card variant="outlined">
                                    <v-card-text class="pa-9">
                                        <!---Left Part Logo -->
                                        <v-row>
                                            <v-col cols="7" class="text-left">
                                                <h2 class="text-secondary text-h2">
                                                    Hi, Welcome Back
                                                </h2>
                                                <h4 class="text-disabled text-h4">
                                                    Login in to your account
                                                </h4>
                                            </v-col>
                                            <v-col cols="5" class="text-right">
                                                <Logo />
                                            </v-col>
                                        </v-row>
                                        <!---Left Part Logo -->

                                        <!---Left Part Form-->
                                        <AuthLogin />
                                        <!---Left Part Form-->
                                    </v-card-text>
                                </v-card>
                            </v-card>
                        </v-col>
                    </v-row>
                </div>
            </v-container>
        </v-col>
        <!---Left Part-->
    </v-row>
</template>
<style lang="scss">
.loginBox {
    max-width: 475px;
    margin: 0 auto;
}
</style>
