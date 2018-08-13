<template>
  <div class="index-wrapper">
    <button class="toast-btn" @click="showModal">modal</button>
    <Modal ref="modal" content="您还未参与线下预约，请联系案场专员。"></Modal>
  </div>
</template>

<script>
import Modal from './modal/Modal'
export default {
  name: 'index',
  components: {Modal},
  data () {
    return {
    }
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
  }
</style>
