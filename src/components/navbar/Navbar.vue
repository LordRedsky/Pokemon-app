<script>
export default {
  name: "Navbar",
  methods: {
    slide() {
      const menuToggle = document.querySelector(".menu-toggle input");
      const nav = document.querySelector("nav ul");
      nav.classList.toggle("slide");
    },
  },
};
</script>

<template>
  <nav>
    <div class="title">
      <img
        class="logo"
        src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
        alt=""
      />
    </div>

    <ul>
      <li>
        <router-link to="/">
          <fa icon="compass" />
          <span>Explore</span>
        </router-link>
      </li>
      <li>
        <router-link to="/collections">
          <fa icon="briefcase" />
          <span>Collection</span>
        </router-link>
      </li>
    </ul>

    <div class="menu-toggle" @click="slide">
      <input type="checkbox" name="" id="" />
      <span></span>
      <span></span>
      <span></span>
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  background-color: whitesmoke;
  justify-content: space-around;
  padding: 15px;
  height: 50px;
  color: rgb(237, 179, 172);
  align-items: center;
  width: 100%;
  position: fixed;
  top: 0;
  margin-bottom: 50000px;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo {
  width: 150px;
}
nav .title {
  font-family: "Pacifico", cursive;
  letter-spacing: 3px;
}

nav ul {
  display: flex;
  list-style: none;
  width: 40%;
  justify-content: flex-end;
  gap: 30px;
}

nav ul li a {
  /* color: radial-gradient(#156f99, #0a2e50); */
  color: rgb(255, 188, 4);
  text-decoration: none;
  font-size: 25px;
  font-weight: bold;
}

nav ul li a:hover {
  color: #0a2e50;
}

nav ul li a span {
  margin-left: 10px;
}

/* Hamburger Menu*/
.menu-toggle {
  display: none;
  flex-direction: column;
  height: 20px;
  justify-content: space-between;
  position: relative;
}

.menu-toggle input {
  position: absolute;
  width: 40px;
  height: 28px;
  left: -6.5px;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
}

.menu-toggle span {
  display: block;
  width: 28px;
  height: 3px;
  background-color:rgb(255, 188, 4);
}
/*Hamburger Animation*/
.menu-toggle span:nth-child(2) {
  transform-origin: 0 0;
}

.menu-toggle span:nth-child(4) {
  transform-origin: 0 100%;
}

.menu-toggle input:checked ~ span:nth-child(2) {
  background-color:rgb(255, 188, 4);
  transform: rotate(45deg) translate(-1px, -1px);
}

.menu-toggle input:checked ~ span:nth-child(4) {
  background-color: rgb(255, 188, 4);
  transform: rotate(-45deg) translate(-1px, 0px);
}

.menu-toggle input:checked ~ span:nth-child(3) {
  opacity: 0;
  transform: scale(0);
}

/* Responsive Breakpoint*/
/* Tablet size*/

/* Mobile size*/
@media screen and (max-width: 660px) {
  .menu-toggle {
    display: flex;
  }

  nav ul {
    right: 0;
    top: 0;
    height: 100vh;
    width:50%;
    position: absolute;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 100px;
    gap: 10em;
    z-index: -1;
    background-color: whitesmoke;
    transform: translateX(100%);
    transition: all 1s;
    opacity: 0;
  }

  nav ul li a {
  font-size: 40px;
  font-weight: bold;
  margin-right: 70px;
}

  nav ul.slide {
    opacity: 1;
    transform: translateX(0);
    /* z-index: 1; */
  }
}
</style>
