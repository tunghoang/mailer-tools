<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <router-view />
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
export default {
  name: "Layout",
};
</script>

<style scoped>
.fill-height {
    justify-content: center;
}
</style>
