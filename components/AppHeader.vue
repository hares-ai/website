<template>
  <el-header class="app-header">
    <NuxtLink to="/" class="name">
      <img class="logo" src="~/assets/logo.svg" alt="">
      <span>hares.ai</span>
    </NuxtLink>
    <el-dropdown v-if="userAddress">
      <span class="el-dropdown-link">
        <el-avatar :size="36" :src="`https://source.boringavatars.com/beam?name=${userAddress}`" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <LogoutButton></LogoutButton>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div v-else>
      <el-button plain @click="openSignDialog('in')">Sign In</el-button>
      <el-button plain @click="openSignDialog('up')">Sign Up</el-button>
    </div>
  </el-header>
  <client-only>
    <el-dialog
      v-model="dialogVisible"
      title="Sign With Passkey"
      width="30%"
      @on-close="closeSignDialog()"
    >
      <form id="sign-form" action="#">
        <el-input type="text" autocomplete="username" :value="maskDeviceID" required readonly v-if="credential" />
        <el-button type="primary" @click="showPasskey()" v-else>passkey</el-button>
        <el-input type="password" v-model="password" autocomplete="new-password" required />
        <el-button native-type="submit" @click.stop.prevent="connectAccount()">Sign</el-button>
      </form>
    </el-dialog>
  </client-only>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { ethers, utils } from 'ethers'
import { v4 as uuidv4 } from 'uuid'

const runtimeConfig = useRuntimeConfig()
const credential = ref<Credential | null>(null)
const dialogVisible = ref(false)
const signMode = ref('')
const userAddress = ref('')
const password = ref('')

const createWallet = (str: string) => {
  return new ethers.Wallet(utils.sha256(utils.toUtf8Bytes(str)))
}

const openSignDialog = (mode: string) => {
  dialogVisible.value = true
  signMode.value = mode
}

const closeSignDialog = () => {
  credential.value = null
}

async function registerUser() {
  const name = `hares.ai#${(new Date()).toLocaleString()}`
  const publicKeyCredentialCreationOptions = {
    attestation: undefined,
    authenticatorSelection: {
      authenticatorAttachment: "platform",
      residentKey: "required",
      userVerification: "required"
    },
    challenge: Uint8Array.from(uuidv4(), (c: any) => c.charCodeAt(0)),
    excludeCredentials: undefined,
    extensions: undefined,
    pubKeyCredParams: [{ alg: -7, type: "public-key" }],
    rp: {
      name: "hares.id",
      id: runtimeConfig.public.Domain,
    },
    timeout: 60000,
    user: {
      id: Uint8Array.from(uuidv4(), (c: any) => c.charCodeAt(0)),
      name: name,
      displayName: name,
    },
  } as PublicKeyCredentialCreationOptions;

  try {
    const _credential = await navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions
    }) as PublicKeyCredential;

    if (!_credential) {
      window.alert('user register failed')
      return
    }

    credential.value = _credential
  } catch (e) {
    console.log(e)
  }
}

async function UserSignIn() {
  const options = {
    challenge: Uint8Array.from(uuidv4(), (c: any) => c.charCodeAt(0)),
    rpId: runtimeConfig.public.Domain,
    allowCredentials: [],
    timeout: 20000,
    userVerification: "required",
  } as PublicKeyCredentialRequestOptions
  const _credential = await navigator.credentials.get({
    publicKey: options
  });

  if (!_credential) {
    return
  }

  credential.value = _credential
}

const showPasskey = () => {
  if (signMode.value === 'up') {
    registerUser()
  } else {
    UserSignIn()
  }
}

const connectAccount = async () => {
  if (!credential.value || !password.value) {
    return
  }

  const wallet = createWallet(credential.value.id + password.value)
  const address = wallet.address
  const message = await wallet.signMessage(address)
  userAddress.value = address
  localStorage.setItem(runtimeConfig.public.UserToken, `${address}:${message}`)
  window.location.reload()
}

const maskDeviceID = computed(() => {
  if (!credential.value) {
    return ''
  }
  const hash = credential.value.id
  return hash.slice(0, 6) + '...' + hash.slice(-4)
})

onMounted(() => {
  const sig = localStorage.getItem(runtimeConfig.public.UserToken)
  if (!sig) {
    return
  }

  const [address, signature] = sig.split(':')
  if (!address || !signature) {
    localStorage.removeItem(runtimeConfig.public.UserToken)
    return
  }

  const recoveredAddr = utils.verifyMessage(address, signature)
  if (recoveredAddr.toLocaleLowerCase() !== address.toLocaleLowerCase()) {
    localStorage.removeItem(runtimeConfig.public.UserToken)
    return
  }

  userAddress.value = address
})
</script>

<style lang="scss">
.app-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .name {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    img {
      width: 36px;
      height: 36px;
      margin-right: 10px;
    }

    span {
      font-family: 'Sometype Mono';
    }
  }
}

#sign-form {
  input, button {
    width: 100%;
  }

  .el-input {
    margin-bottom: 10px;
    margin-top: 10px;
  }

  button {
    margin-top: 20px;
  }
}
</style>