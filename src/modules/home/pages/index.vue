<template>
  <div>
    <Row class="room-ctr">
      <Col span="11" :offset="index%2 === 0 ? 0 : 2 "
        v-for="(item, index) in roomInfo"
        :key="index"
        >
        <Card :bordered="false" style="margin: 20px;"
          @click.native="handlerInfo(item)"
          >
            <p slot="title">房间号：{{item.room_num}}</p>
          <div class="box-content">
            <p>楼层:{{item.floor_num}}层</p>
            <div class="title">
              <span v-if="item.room_type === 0">高级大床房 {{ item.room_pay }} ¥</span>
              <span v-else>商务套房 {{ item.room_pay }} ¥</span>
            </div>
            <div class="title">
              <span v-if="item.is_valid === 0">未入住</span>
              <span class="valid" v-else>已入住</span>
            </div>
          </div>
          <div class="box-bottom">
            <div>
              <span v-if="item.room_status === 0">已打扫</span>
              <span v-else style="color: red;">未打扫</span>
            </div>
            <div>
              <p v-if="item.is_reserve === 0" style="color: red;">已预定</p>
            </div>
          </div>
        </Card>
        <Modal
          v-model="model"
          title="消费信息录入"
          @on-ok="handleData"
          >
          <Form ref="formInline" :model="formInline">
            <FormItem label="饮料:">
              <Select v-model="formInline.drink" clearable>
                <Option value="0">红茶</Option>
                <Option value="1">可乐</Option>
                <Option value="2">矿泉水</Option>
              </Select>
            </FormItem>
            <FormItem label="香烟:">
              <Select v-model="formInline.cigarette">
                <Option value="0">云烟</Option>
                <Option value="1">中华</Option>
                <Option value="2">红塔山</Option>
              </Select>
            </FormItem>
            <FormItem label="食品:">
              <Select v-model="formInline.food">
                <Option value="0">方便面</Option>
                <Option value="1">火腿肠</Option>
                <Option value="2">瓜子</Option>
              </Select>
            </FormItem>
          </Form>
        </Modal>
      </Col>
    </Row>
  </div>
</template>
<script>
import { commonApiRequest } from '../../../services/api';

export default {
  name: 'index',
  data() {
    return {
      roomInfo: [],
      model: false,
      formInline: {
        drink: '',
        cigarette: '',
        food: '',
      },
    };
  },
  mounted() {
    this.getRoomInfo();
  },
  methods: {
    getRoomInfo() {
      commonApiRequest('/api/getroominfo', {}, 'GET')
        .then((res) => {
          this.roomInfo = res || [];
          console.log(res, 'success');
        })
        .catch((e) => {
          console.log(e, 'error');
        });
    },
    handlerInfo(info) {
      this.model = true;
      console.log(info);
    },
    handleData() {
      console.log('111');
    },
  },
};
</script>
<style scoped>
.room-ctr {
  background: #eee;
  padding: 20px;
}

.box-content {
  display: flex;
  justify-content: space-between;
}
.box-bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
