<script>
export default {
  name: "NavBar",
};
</script>

<template>
  <header class="header">
    <nav class="nav container">
      <a href="" class="nav__logo">POKEMON</a>

      <div class="nav__menu">
        <ul class="nav__list grid">
          <li class="nav__item">
            <a href="" class="nav__link">
            <fa icon="compass"/>
            </a>
          </li>

          <li class="nav__item">
            <a href="" class="nav__link">
            <fa icon="suitcase"/>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.grid {
  display: grid;
  gap: 1.5rem;
}
</style>
