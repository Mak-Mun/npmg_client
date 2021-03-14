<svelte:head>
  <title>Login Page</title>
</svelte:head>

<div class="container">
  <div>NPMG</div>
  <form>
    <div>
      <label for="email">
        <input type="email" id="email" />
      </label>
      <label for="password">
        <input type="password" id="password" />
      </label>

      <div>
        <label for="remember">
          <input type="checkbox" name="remberme" id="remember" />
        </label>
        <a href="/auth/forgotpassword"> Forgot password? </a>
      </div>
    </div>
  </form>
</div>
