<template>
    <nav class="navbar">
      <div class="container">
        <div class="d-flex">
          <a class="navbar-brand"><img src="../assets/images/logo.png" alt="logo">Logo</a>
        </div>
        <div class="d-flex">
          <img src="../assets/images/menu.svg" alt="menu" class="menu">
          <div class="lang" >Ru</div>
        </div>
      </div>
    </nav>
</template>

<script>
  export default {
    name: "Navbar"
  }
</script>

<style scoped lang="scss">
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 80px;
    background: linear-gradient(0deg, rgba(24, 90, 78, 0.5), rgba(24, 90, 78, 0.5)), url('../assets/images/navbar-bg.jpg');
    background-size: cover;
    .container {
      background: transparent;
      box-shadow: none;
      .navbar-brand {
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 28px;
        color: #FFFFFF;
        text-transform: uppercase;
        cursor: pointer;
        img {
          margin-right: 3px;
        }
      }
      .menu {
        cursor: pointer
      }
      .lang {
        margin-left: 40px;
        font-family: Roboto;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 26px;
        color: #113A32;
        width: 32px;
        height: 23px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: uppercase;
        cursor: pointer
      }
    }
  }
</style>