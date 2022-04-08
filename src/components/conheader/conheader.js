import { mapState } from 'vuex';

export default {
  name: 'HeaderBar',
  props: {
    collapsed: Boolean,
    menuList: Array,
  },
  data() {
    return {
      isCollapsed: true,
    };
  },
  computed: {
    ...mapState(['openedNames', 'activeName']),
    rotateIcon() {
      return ['menu-icon', this.isCollapsed ? 'rotate-icon' : ''];
    },
    breadList() {
      const routeMetched = this.$route.matched;
      const res = routeMetched
        .filter(item => item.meta)
        .map((item) => {
          const meta = { ...item.meta };
          const obj = {
            icon: (item.meta && item.meta.icon) || 'ios-navigate',
            name: (item.meta && item.meta.title) || '',
            href: (item.meta && item.meta.href) || '',
            meta,
          };
          return obj;
        });
      return res;
    },
  },
  methods: {
    handleChange() {
      this.$emit('on-coll-change', !this.collapsed);
    },
  },
};
