<template>
  <div id="app">
    <layout-main>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </layout-main>
  </div>
</template>

<script>
  import LayoutMain from '@/layouts/Main'

  export default {
    components: {
      LayoutMain
    }
  }
</script>

<style lang="sass">

  @import 'sass/main.sass'

</style>
