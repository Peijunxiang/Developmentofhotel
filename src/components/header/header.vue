<template>
  <Header>
    <div class="logo">
      <img alt="Logo" :src="logoSrc" />
    </div>
    <div class="header-title">
      酒店管理系统
    </div>
    <div class="header-user">
      <ul class="user-con">
        <li class="user-item">
          <Avatar
            icon="ios-person"
            :src="`http://dayu.oa.com/avatars/${engName}/profile.jpg?0`"
          />
        </li>
        <li class="user-item">
          {{ userName }}
        </li>
      </ul>
    </div>
  </Header>
</template>
<script src="./header"></script>
<style  src="./header.css"></style>
