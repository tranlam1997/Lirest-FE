<script setup lang="ts">
import { useForm } from 'vee-validate'
import type { IRegisterForm } from '../auth.interface'
import { useUserStore } from '@/modules/users/user.store'
import type { ToastMessageEvent } from '@/common/messages/toast-message/messages.enum'
import { Emitter } from 'mitt';
import { MittEvents } from '@/plugins/mitt';

const emit = defineEmits<{
  (e: ToastMessageEvent.REGISTER_TOAST_MESSAGE, data: { message?: string; messageType?: string; active: boolean }): void
}>()
const inputType = ref('password')
const emitter = <Emitter<MittEvents>>inject('emitter')
const router = useRouter()
const userStore = useUserStore()

const initialValues = {
  firstname: '',
  lastname: '',
  dateOfBirth: '',
  email: '',
  phoneNumber: '',
  username: '',
  password: '',
  confirmPassword: '',
}

const registerSchema = {
  firstname: 'required|min:3|max:20|name',
  lastname: 'required|min:3|max:20|name',
  dateOfBirth: 'required',
  email: 'required|email',
  phoneNumber: 'required|phone',
  username: 'required|min:3|max:30',
  password: 'required|min:3|max:30|password',
  confirmPassword: 'required|passwords_mismatch:@password',
}

const { handleSubmit, values, errors } = useForm<IRegisterForm>({
  validationSchema: registerSchema,
  initialValues,
})

const isFilledOut = () => {
  return Object.keys(values).every(key => values[key as keyof typeof values])
}

emitter.on('changeInputType', (type: string) => {
  inputType.value = type
})

const onSubmit = handleSubmit(async (values) => {
  delete values.confirmPassword
  await userStore.createUser({ ...values }, { emit, router })
})
</script>

<template>
  <form flex-col text-dark dark:text-white items-center @submit="onSubmit">
    <div class="form-element" flex-row justify-between>
      <RegisterInput flex-col justify-items-start class="ct-basis-45" label-content="First Name:" label-name="firstname" :error-detail="errors.firstname || ''">
        <template #input>
          <InputText input-name="firstname" input-style="input-format" />
        </template>
      </RegisterInput>

      <RegisterInput flex-col justify-items-start class="ct-basis-45" label-content="Last Name:" label-name="lastname" :error-detail="errors.lastname || ''">
        <template #input>
          <InputText input-name="lastname" input-style="input-format" />
        </template>
      </RegisterInput>
    </div>

    <div class="form-element" flex-row justify-between>
      <RegisterInput flex-col justify-items-start class="ct-basis-45" label-content="Date Of Birth:" label-name="dateOfBirth" :error-detail="errors.dateOfBirth || ''">
        <template #input>
          <InputDate input-name="dateOfBirth" input-style="border-gray-400 p-1 border-1 dark:text-dark w-full" />
        </template>
      </RegisterInput>

      <RegisterInput flex-col justify-items-start class="ct-basis-45" label-content="Email:" label-name="email" :error-detail="errors.email || ''">
        <template #input>
          <InputText input-name="email" input-style="input-format" />
        </template>
      </RegisterInput>
    </div>

    <div class="form-element" flex-row justify-between>
      <RegisterInput flex-col justify-items-start class="ct-basis-45" label-content="Phone Number:" label-name="phoneNumber" :error-detail="errors.phoneNumber || ''">
        <template #input>
          <InputText input-name="phoneNumber" input-style="input-format" />
        </template>
      </RegisterInput>

      <RegisterInput flex-col justify-items-start class="ct-basis-45" label-content="Username:" label-name="username" :error-detail="errors.username || ''">
        <template #input>
          <InputText input-name="username" input-style="input-format" />
        </template>
      </RegisterInput>
    </div>

    <div class="form-element" flex-row justify-between>
      <RegisterInput relative flex-col justify-items-start class="ct-basis-45" label-content="Password:" label-name="password" :error-detail="errors.password || ''">
        <template #input>
          <BaseInput input-name="password" :input-type="inputType" input-style="input-format" />
        </template>
        <ContentToggler bg-white dark:bg-gray-800 absolute top-0 right-0/>
      </RegisterInput>

      <RegisterInput relative flex-col justify-items-start class="ct-basis-45" label-content="Confirm Password:" label-name="confirmPassword" :error-detail="errors.confirmPassword || ''">
        <template #input>
          <InputPassword input-name="confirmPassword" input-style="input-format" />
        </template>
      </RegisterInput>
    </div>

    <div flex-row justify-between class="w-1/2">
      <p text-sm text-dark dark:text-white self-center>
        Already a member? <router-link underline to="/login">
          Sign in
        </router-link>
      </p>
      <button :disabled="!isFilledOut()" btn-submit>
        Sign up
      </button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
form {
  margin: 1rem 0 1rem;
  width: 75%;
  padding: 2rem 0 1rem;

  &>.form-element {
    width: 100%;
    height: 7rem;
  }
}

.error-message {
  color: #f44336;
  font-size: 0.8rem;
}

label {
  text-align: left;
  align-self: auto;
}

button {
  padding: 0.25rem;
  margin: 1rem 0;
}
</style>
