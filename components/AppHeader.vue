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
    <el-button plain v-else @click="signProcess()">Sign In</el-button>
  </el-header>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { ethers, utils } from 'ethers'
import { v4 as uuidv4 } from 'uuid'

const userAddress = ref('')
const credential = ref<Credential | null>(null)

const createWallet = (str: string) => {
  return new ethers.Wallet(utils.sha256(utils.toUtf8Bytes(str)))
}

async function registerUser() {
  const now = new Date()
  const name = `${navigator.platform}-${navigator.appCodeName}-${now.getMonth() + 1}-${now.getDate()}`
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
      id: process.env.NUXT_PUBLIC_DOMAIN,
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

    const wallet = createWallet(_credential.id)
    const address = wallet.address
    const message = await wallet.signMessage('sign-hares.ai#login' + address)
    userAddress.value = address
    credential.value = _credential
    localStorage.setItem('not-newbie', '1')
    localStorage.setItem(process.env.NUXT_PUBLIC_USER_TOKEN as string, `${address}:${message}`)
  } catch (e) {
    console.log(e)
  }
}

async function UserSignIn() {
  const options = {
    challenge: Uint8Array.from(uuidv4(), (c: any) => c.charCodeAt(0)),
    rpId: process.env.NUXT_PUBLIC_DOMAIN,
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

  const wallet = createWallet(_credential.id)
  const address = wallet.address
  const message = await wallet.signMessage('sign-hares.ai#login' + address)
  userAddress.value = address
  credential.value = _credential
  localStorage.setItem('not-newbie', '1')
  localStorage.setItem(process.env.NUXT_PUBLIC_USER_TOKEN as string, `${address}:${message}`)
}

const signProcess = () => {
  if (!!localStorage.getItem('not-newbie')) {
    UserSignIn()
  } else {
    registerUser()
  }
}

onMounted(() => {
  const sig = localStorage.getItem(process.env.NUXT_PUBLIC_USER_TOKEN as string)
  if (!sig) {
    return
  }
  const [address, signature] = sig.split(':')
  if (!address || !signature) {
    localStorage.removeItem(process.env.NUXT_PUBLIC_USER_TOKEN as string)
    return
  }
  const recoveredAddr = utils.verifyMessage('sign-hares.ai#login' + address, signature)
  if (recoveredAddr.toLocaleLowerCase() !== address.toLocaleLowerCase()) {
    localStorage.removeItem(process.env.NUXT_PUBLIC_USER_TOKEN as string)
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
</style>