<template>
  <b-col cols="12" class="asc__auth-form">
    <b-form>
      <b-form-group :label="$t('auth.email')" :class="{ 'form-group--error': $v.user.email.$error}">
        <b-form-input v-model="user.email" type="email" required :placeholder="$t('auth.email')"></b-form-input>
      </b-form-group>
      <b-form-group :label="$t('auth.password')" :class="{ 'form-group--error': $v.user.password.$error}">
        <b-form-input v-model="user.password" type="password" required :placeholder="$t('auth.password')"></b-form-input>
      </b-form-group>
      <b-row class="text-center">
        <b-col cols="12">
          <b-button id="loginButton" @click="submitForm()" type="button">{{$t('auth.login')}}</b-button>
          <p id="loginLoader" style="display: none" class="mt-3 text-center"><b-spinner label="Spinning"></b-spinner></p>
        </b-col>
        <b-col cols="12">
          <router-link :to="{name: 'ForgotPassword'}">{{$t('auth.forgotPassword')}}</router-link>
        </b-col>
      </b-row>
      <p class="asc__auth-warning" id="loginWarning">{{$t('auth.wrongPassOrUser')}}</p>
    </b-form>
  </b-col>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      email: '',
      user: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    user: {
      email: {required, email},
      password: {required}
    }
  },
  mounted () {},
  methods: {
    submitForm () {
      this.$v.$touch()
      if (this.$v.$error) {
        $bvToast.toast(this.$t('auth.required'), { title: this.$t('general.error'), variant: 'danger' })
      } else {
        this.$store.dispatch('login', {...this.user, isUser: this.isUser})
      }
    },
    resetForm () {
      this.user.email = ''
      this.user.password = ''
    }
  }
}
</script>
