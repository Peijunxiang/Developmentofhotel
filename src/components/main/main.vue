<template>
  <div class="layout" style="height:100%">
    <Layout>
      <Sider
        ref="siderBar"
        hide-trigger
        collapsible
        :collapsed-width="78"
        v-model="collapsed"
        :width="210"
        class="content-left"
      >
        <SiderMenu :menu-list="menuList" :collapsed="collapsed" />
      </Sider>
      <Layout class="content-right">
        <div class="con-header">
          <ConHeader
            :menu-list="menuList"
            @on-coll-change="handleCollapsedChange"
          />
        </div>
        <Content class="con-main">
          <router-view v-if="isRouterAlive" />
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script src="./main"></script>
<style src="./main.css"></style>
