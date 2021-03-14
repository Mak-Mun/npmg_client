<svelte:head>
  <title>Login Page</title>
</svelte:head>

<form>
  <div>
    <label for="email"
      >Email
      <input type="email" id="email" />
    </label>
  </div>

  <div>
    <label for="password"
      >Password
      <input type="password" id="password" />
    </label>
  </div>

  <div>
    <label for="remember">
      <input type="checkbox" name="remberme" id="remember" />
    </label>
    <a href="/auth/forgotpassword"> Forgot password? </a>
  </div>

  <input type="submit" value="Login here" class="bg-primaryGreen " />
</form>
