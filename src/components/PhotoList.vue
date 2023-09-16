<template>
  <div class="container">
    <div class="photos-list">
      <slot></slot>
    </div>
  </div>
</template>
  
<style lang="scss">
.photos-list {
  padding: 45px 20px 43px;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  gap: 16px;
  filter: drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.10));

  // Small devices (landscape phones, 576px and up)
  @media (min-width: 576px) {
    grid-template-rows: auto;
  }

  // Medium devices (tablets, 768px and up)
  @media (min-width: 768px) {
    grid-template-columns: auto auto;
    grid-template-rows: auto;
  }

  // Large devices (desktops, 992px and up)
  @media (min-width: 992px) {
    gap: 30px;
    grid-template-columns: repeat(3, 1fr);
    padding: 107px 20px 71px;
  }

}
</style>
  