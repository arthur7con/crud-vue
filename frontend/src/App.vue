<template>
  <div>
    <nav class="menu">
  <div class="menu-inner">
    <router-link to="/">Home</router-link>
    <router-link to="/usuarios">Usuários</router-link>
    <router-link to="/about">Sobre</router-link>
  </div>
</nav>

    <main class="container">
      <router-view />
    </main>
  </div>
</template>

body {
  margin: 0;
  font-family: Arial, sans-serif;
}

html {
  overflow-y: scroll; /* evita pulo lateral */
}

.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.menu-inner {
  width: 100%;
  max-width: 700px;
  display: flex;
  gap: 30px;
}

.menu a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.menu a.router-link-active {
  color: #4CAF50;
}

.container {
  margin-top: 60px;
  padding: 30px;
  display: flex;
  justify-content: center;
}

.page {
  width: 100%;
  max-width: 700px;
}