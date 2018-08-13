<template>
  <div class="index-wrapper">
    <div class="count-wrapper">
      <CountDown :startTime="startTime" :endTime="endTime"></CountDown>
    </div>
    <button class="toast-btn" @click="showModal">modal</button>
    <Modal ref="modal" content="您还未参与线下预约，请联系案场专员。"></Modal>
  </div>
</template>

<script>
import Modal from './modal/Modal'
import CountDown from './countDown/CountDown'
export default {
  name: 'index',
  components: {Modal, CountDown},
  data () {
    return {
      startTime: '',
      endTime: ''
    }
  },
  created () {
    this.startTime = new Date('2018-08-13 00:00:00')
    this.endTime = new Date('2018-08-13 07:22:24')
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
      display: inline-block;
    }
  }
</style>
