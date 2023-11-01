<template>
  <el-header class="app-header">
    <NuxtLink to="/" class="name">
      <img class="logo" src="~/assets/logo.svg" alt="">
      <span>hares.ai</span>
    </NuxtLink>
    <LogoutButton v-if="isLogined"></LogoutButton>
    <el-button plain v-else @click="UserSignIn()">Sign In</el-button>
  </el-header>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { ethers, toUtf8Bytes, sha256 } from 'ethers'
import { v4 as uuidv4 } from 'uuid'
const isLogined = ref(false)
const userAddress = ref('')

const createWallet = (str: string) => {
  const privateKey = sha256(toUtf8Bytes(str))
  const wallet = new ethers.Wallet(privateKey)

  return {
    privateKey: wallet.privateKey,
    address: wallet.address
  }
}

onMounted(() => {
})

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
    const credential = await navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions
    }) as PublicKeyCredential;

    if (!credential) {
      window.alert('user register failed')
      return
    }

    const address = createWallet(credential.id).address
    userAddress.value = address
    localStorage.setItem('user-address', address)
  } catch (e) {
    console.log(e)
  }
}

async function UserSignIn() {
  const options = {
    challenge: Uint8Array.from(uuidv4(), (c: any) => c.charCodeAt(0)),
    rpId: process.env.NUXT_PUBLIC_DOMAIN
  } as PublicKeyCredentialRequestOptions
  const credential = await navigator.credentials.get({
    publicKey: options
  });

  if (!credential) {
    registerUser()
    return
  }

  const address = createWallet(credential.id).address
  userAddress.value = address
  localStorage.setItem('user-address', address)
}
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