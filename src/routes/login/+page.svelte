<script lang="ts">
  import { setContext } from "svelte";
  import { goto } from "$app/navigation";
  import Alert from "$lib/components/common/Alert.svelte";
  import Button from "$lib/components/common/Button.svelte";
  import Card from "$lib/components/common/Card.svelte";
  import FormField from "$lib/components/common/form/FormField.svelte";
  import Input from "$lib/components/common/form/Input.svelte";
  import type { Credentials } from "$lib/entities/auth";
  import { authApiEndpoints } from "$lib/stores/features/auth/auth.api";
  import {
    isLoading,
    loginFailed,
    validationErrors,
  } from "$lib/stores/features/auth/auth.derived-stores";
  import { dispatch } from "$lib/stores/redux-store";
  import { MEMBER_DASHBOARD } from "$lib/constants/routes";
  import { onFirstAction } from "$lib/utils/on-first-action";

  const credentials: Credentials = {};

  setContext("errorMessages", validationErrors);

  async function login() {
    dispatch(authApiEndpoints.login.initiate(credentials));

    onFirstAction("authApi/executeMutation/fulfilled", ({ payload: { token } }) => {
      localStorage.setItem("token", token);
      goto(MEMBER_DASHBOARD);
    });
  }
</script>

<form on:submit|preventDefault={login}>
  <div class="min-h-screen flex justify-center items-center">
    <Card class="w-full sm:w-[24rem] p-8 flex flex-col justify-center items-center gap-4">
      <h3>Login to FinSense</h3>
      {#if $loginFailed}
        <Alert type="danger">Login failed</Alert>
      {/if}
      <FormField
        class="w-full"
        label="Email"
        name="email"
      >
        <Input
          autocomplete="email"
          bind:value={credentials.email}
        />
      </FormField>
      <FormField
        class="w-full"
        label="Password"
        name="password"
      >
        <Input
          autocomplete="current-password"
          type="password"
          bind:value={credentials.password}
        />
      </FormField>
      <Button
        class="btn-primary w-full"
        disabled={$isLoading}>Login</Button
      >
    </Card>
  </div>
</form>
