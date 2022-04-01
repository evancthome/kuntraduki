<script>
  export let flashMessages
  console.log(flashMessages)
</script>

<form action="/login" method="POST">
  {#if flashMessages}
    <div role="alert">{flashMessages.form}</div>
  {/if}
  <label>
    Username or E-Mail
    <input type="text" name="uid" />
  </label>
  <label>
    Password
    <input type="password" name="password" />
  </label>
  <label>
    Remember Me
    <input type="checkbox" name="remember" />
  </label>
  <button type="submit">Login</button>
</form>
