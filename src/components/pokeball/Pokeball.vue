<script>
export default {
  name: "Pokeball",
};
</script>

<template>
  <div>
    <div class="image-pokeball" >
      <span class="catch">CATCH</span>
      <img class="ball" src="../../assets/PokeBallSVG.svg" />
    </div>
  </div>
</template>

<style scoped>
.image-pokeball {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgb(109, 109, 109);
  border-radius: 50%;
  position: relative;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
}
.image-pokeball .ball {
  position: absolute;
  height: 70px;
  padding: 0.4em;
}

.image-pokeball .ball:hover {
  height: 80px;
  border-radius: 50%;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
}

.catch {
  margin-top: -32px;
  position: absolute;
  color: whitesmoke;
  z-index: 100;
  font-weight: 900;
}
</style>
