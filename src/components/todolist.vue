<template>
  <div>
    <p>欢迎：{{name}}! 您的待办事项是：</p>
    <group>
      <x-input title="" v-model="todoItem" :show-clear="false" placeholder="请输入代办事项">
         <x-button slot="right" class= "btn" type="primary" mini @click.native="addTodoItem">添加</x-button>
      </x-input>
    </group>
    <checker v-model="done" default-item-class="check-list" selected-item-class="selected-check-item" type="radio">
      <checker-item :value="item.key" v-for="(item, index) in checkList" :key="index" @on-item-click="onItemClick">{{item.value}}</checker-item>
    </checker>
    <ul v-if="done === 0">
      <li class="list-item" v-for="(item, index) in todoList">
        <p>{{item.content}}</p>
        <div class="btn-group">
          <x-button type="default" :mini="true" class="btn" action-type="button" @click.native="completeItem(item.id)">完成</x-button>
          <x-button type="default" :mini="true" action-type="button" @click.native="delTodoItem(item.id)">删除</x-button>
        </div>
      </li>
    </ul>
    <ul v-if="done === 1">
      <li class="list-item" v-for="(item, index) in doneList">
        <p>{{item.content}}</p>
        <div class="btn-group">
          <x-button type="default" :mini="true" class="btn" action-type="button" @click.native="reduceItem(item.id)">还原</x-button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import { Group, XInput, Checker, CheckerItem, XButton } from 'vux';
  import axios from 'axios';

  export default {
    components:{
      Group,
      XInput,
      Checker,
      CheckerItem,
      XButton
    },
    data () {
      return {
        checkList: [
          {
            key: 0,
            value: '待办事项'
          },
          {
            key: 1,
            value: '已完成事项'
          }
        ],
        name: '',
        id: '',
        todoItem: '',
        list: [],
        done:0
      }
    },
    computed: {
      todoList() {
        return this.list.filter((item) => {
          return item.status === 0;
        })
      },
      doneList() {
        return this.list.filter((item) => {
          return item.status === 1;
        })
      }
    },
    methods: {
      onItemClick(value, disabled) {
        if(value === 0) {
          //待办
          this.done = 0;
          return;
        }
        this.done =1;
      },
      addTodoItem(event) {
        if(this.todoItem === ''){
          return;
        }
        axios.post('addTodoList', {
          id: this.id,
          content: this.todoItem
        }).then((respones)=>{
          if(respones.data.code){
            //重新获取数据，可以考虑todoItem.push
            this.getList();
          }
        })
        // this.todoList.push(this.todoItem);
        this.todoItem = '';
      },
      completeItem(id) {
        axios.post('/updataList', {
          userId: this.id,
          id: id,
          status: 1
        }).then((respones) => {
          if (respones.data.code) {
            this.getList();
          }
        });
        // this.doneList.push(this.todoList[index]);
        // this.todoList.splice(index, 1);
      },
      delTodoItem(id) {
        axios.post('/deleteTodo', {
          userId: this.id,
          id: id
        }).then((respones) => {
          if (respones.data.code) {
            this.getList();
          }
        });
        // this.todoList.splice(index, 1);
      },
      reduceItem(id) {
        axios.post('/updataList', {
          userId: this.id,
          id: id,
          status: 0
        }).then((respones) => {
          if (respones.data.code) {
            this.getList();
          }
        });
        // this.todoList.push(this.doneList[index]);
        // this.doneList.splice(index, 1);
      },
      getUserName() {
        return sessionStorage.getItem("name");
      },
      getUserId() {
        return sessionStorage.getItem("id");
      },
      getList() {
        axios.get('/todolist?id=' + this.id).then((respones) => {
          this.list = respones.data;
        });
      }
    },
    created() {
      this.name = this.getUserName();
      this.id = this.getUserId();
      this.getList();
    }
  }
</script>
<style lang="less" scope>
@import './normalize.css';
  .check-list {
    margin-top: 1em;
    padding: 5px 15px;
  }
  .selected-check-item {
    color: #50BFFE;
    border-bottom: 1px solid #50BFFE;
  }
  .btn {
    background: #50BFFE;
    color: #FFFFFF;
  }
  .list-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 2em;
    padding: 0.5em 1em;
    // border-bottom: 1px solid rgb(44, 62, 80);

    .weui-btn + .weui-btn{
      margin-top: 0;
    }
  }
</style>
