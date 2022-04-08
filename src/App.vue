<template>
  <div id="app">
    <Layout>
      <Headers v-if="$route.meta.title" />
      <Content>
        <keep-alive>
          <router-view />
        </keep-alive>
      </Content>
    </Layout>
  </div>
</template>
<script>
import Headers from './components/header/header.vue';

export default {
  components: {
    Headers,
  },
};
</script>
<style>
#app, .ivu-layout {
  width: 100%;
  height: 100%;
  position: relative;
  min-width: 1024px;
}

.ivu-layout-content {
  flex: 1;
}

.ivu-table-tip {
  overflow-x: hidden;
}
</style>
