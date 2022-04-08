<template>
  <div>
    <Menu
      ref="menu"
      theme="dark"
      width="auto"
      :active-name="activeName"
      :open-names="openedNames"
      accordion
    >
      <template v-if="menuList">
        <Submenu
          v-for="(menu, index) in menuList"
          :key="index"
          :name="menu.name"
        >
          <template slot="title">
            <Icon
              :type="menu.icon || 'ios-navigate'"
              :size="rootIconSize"
            ></Icon>
            {{ menu.title }}
          </template>
          <template v-if="menu.children">
            <Menu-item
              v-for="(item, i) in menu.children"
              :key="i"
              :name="item.name"
              :to="item.href"
            >
              <Icon :type="item.icon || 'ios-navigate'" :size="iconSize"></Icon>
              {{ item.title }}
            </Menu-item>
          </template>
        </Submenu>
      </template>
    </Menu>
  </div>
</template>
<script src="./sider"></script>
