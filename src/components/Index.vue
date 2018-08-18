<template>
  <div class="index-wrapper">
    <div class="count-wrapper">
      <CountDown :startTime="startTime" :endTime="endTime"></CountDown>
    </div>
    <button class="toast-btn" @click="showModal">modal</button>
    <Modal ref="modal" content="您还未参与线下预约，请联系案场专员。"></Modal>
    <!--下拉框组件-->
    <div class="select-wrapper">
      <SelectComp :optionList="optionList" class="selectItem"></SelectComp>
      <SelectComp :optionList="optionList" class="selectItem"></SelectComp>
      <SelectComp :optionList="optionList" class="selectItem"></SelectComp>
    </div>
    fafafaf
  </div>
</template>

<script>
import Modal from './modal/Modal'
import CountDown from './countDown/CountDown'
import SelectComp from './select/selectComp'
export default {
  name: 'index',
  components: {Modal, CountDown, SelectComp},
  data () {
    return {
      startTime: '',
      endTime: '',
      optionList: [
        {value: 1, label: '选项1'},
        {value: 2, label: '选项2'},
        {value: 3, label: '选项3'}
      ]
    }
  },
  created () {
    this.startTime = new Date('2018-08-13 00:00:00')
    this.endTime = new Date('2018-08-13 00:00:10')
  },
  methods: {
    showModal () {
      this.$refs.modal.modalVisible = true
    }
  }
}
</script>

<style scoped lang="stylus">
  .index-wrapper{
    height: 100%;
    .toast-btn{
      width: 50px;
      height: 25px;
      border: 1px solid #00ff00;
      margin: 10px;
    }
    .count-wrapper{
      margin: 10px;
      border: 1px solid #ccc;
      border-radius: 10px;
      padding: 20px;
    }
    .select-wrapper{
      display: flex;
      .selectItem{
        flex: 1;
      }
    }
  }
</style>
