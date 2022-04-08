<template>
  <div class="con-header-main">
    <Icon
      @click="handleChange"
      :class="rotateIcon"
      class="sider-icon"
      type="md-menu"
      size="24"
    ></Icon>
    <Breadcrumb class="brand-con" v-if="breadList">
      <BreadcrumbItem
        v-for="item in breadList"
        :to="item.href"
        :key="`bread-crumb-${item.name}`"
      
      >
        <Icon class="bread-icon" :type="item.icon || ''"/>
        {{ item.name }}
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>
<script src="./conheader"></script>
<style src="./conheader.css"></style>
