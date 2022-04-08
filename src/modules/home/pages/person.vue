<template>
  <div>
    <Form inline label-position="right" :label-width="70">
      <FormItem label="客户姓名">
        <Input v-model="search.name" class="form-input" placeholder="请输入客户姓名" />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="getCustomerInfo">查询</Button>
      </FormItem>
    </Form>
    <Table
      ref="persontable"
      :columns="tableColumns"
      :data="customerInfo"
      :loading="tableLoading"
      not-found-text="暂无数据"
      border>
      <template slot-scope="{ row }" slot="sex">
        {{row.sex === 0 ? '男' : '女'}}
      </template>
      <template slot-scope="{ row }" slot="start_time">
        <Time :time="row.start_time" type="datetime"></Time>
      </template>
      <template slot-scope="{ row }" slot="end_time">
        <Time :time="row.end_time" type="datetime"></Time>
      </template>
      <template slot-scope="{ row }" slot="rna_test">
        <Time :time="row.rna_test" type="datetime"></Time>
      </template>
    </Table>
    <Page
      :current="search.page"
      :total="search.total"
      @on-change="pageChange"
      :page-size="search.limit"
      prev-text="上一页"
      next-text="下一页"
      show-total
      class="page-change"
    />
  </div>
</template>

<script>
import { commonApiRequest } from '../../../services/api';

export default {
  data() {
    return {
      search: {
        name: '',
        page: 1,
        limit: 50,
        total: 0,
      },
      customerInfo: [],
      tableLoading: false,
      tableColumns: [
        {
          title: '房间号',
          key: 'room_num',
          align: 'center',
        },
        {
          title: '客户姓名',
          key: 'user_name',
          align: 'center',
        },
        {
          title: '性别',
          slot: 'sex',
          align: 'center',
        },
        {
          title: '证件号',
          key: 'license_num',
          align: 'center',
        },
        {
          title: '电话',
          key: 'phone_num',
          align: 'center',
        },
        {
          title: '入住日期',
          slot: 'start_time',
          align: 'center',
        },
        {
          title: '预计离店日期',
          slot: 'end_time',
          align: 'center',
        },
        {
          title: '核酸检测时间',
          slot: 'rna_test',
          align: 'center',
        },
      ],
    };
  },
  mounted() {
    this.getCustomerInfo();
  },
  methods: {
    // 获取顾客信息
    getCustomerInfo() {
      this.tableLoading = true;
      commonApiRequest('/api/getcustomerinfo', { name: this.search.name }, 'GET')
        .then((res) => {
          this.tableLoading = false;
          this.customerInfo = res || [];
          this.search.total = res.length;
          console.log(res, 'success');
        })
        .catch((e) => {
          this.tableLoading = false;
          this.customerInfo = [];
          console.log(e, 'error');
        });
    },
    // 分页
    pageChange(index) {
      this.search.page = index;
      this.getCustomerInfo();
    },
  },
};
</script>

<style scoped>
.form-input {
  width: 280px;
}

.page-change {
  margin: 10px;
}
</style>
