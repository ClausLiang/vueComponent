<template>
  <div class="select-comp">
    <div class="select-name" @click="showOptionHandle">
      <span v-show="selectItem.label">{{selectItem.label}}</span>
      <span v-show="!selectItem.label">请选择</span>
    </div>
    <div class="option-list" v-show="showOption">
      <div v-for="item in optionList" :class="item.value === selectItem.value ? 'option-item on' : 'option-item'" :key="item.value" @click="selectHandle(item)">{{item.label}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'select-comp',
  data () {
    return {
      showOption: false,
      selectItem: {}
    }
  },
  props: ['optionList'],
  methods: {
    showOptionHandle () {
      this.showOption = !this.showOption
    },
    selectHandle (item) {
      this.selectItem = item
      this.showOption = false
    }
  }
}
</script>

<style scoped lang="stylus">
  .select-comp{
    position: relative;
    .select-name{
      height: 34px;
      line-height: 34px;
      text-align: center;
      span{
        padding: 0 15px;
        background: url("./img/arrow-down.png") no-repeat;
        background-position: right center;
      }
    }
    .option-list{
      position: absolute;
      top: 34px;
      width: 100%;
      left: 0;
      background: #fff;
      .option-item{
        height: 40px;
        line-height: 40px;
        border-top: 1px solid #e7e7e7;
        text-align: center;
        color: #666565;
        font-size: 15px;
        &.on{
          color: #fda90b;
        }
      }
    }
  }
</style>
