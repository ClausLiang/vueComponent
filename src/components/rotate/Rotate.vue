<template>
  <div class="rotate">
    <div class="awardList">
      查看奖品
      <img src="./img/more.png" alt="" width="20" height="20" class="more-icon">
    </div>
    <div class="turnplate">
      <canvas class="item" id="wheelcanvas" width="422px" height="422px"></canvas>
      <img class="pointer" src="./img/pointer.png" @click="turnHandle"/>
    </div>
    <div class="remain">
      <div class="remain-time">{{remainTime}}</div>
    </div>
    <div class="rule-btn"></div>
  </div>
</template>

<script>
  require('./jquery-1.10.2')
  require('./awardRotate')
  export default {
    name: 'rotate',
    data () {
      return {
        restaraunts: [
          {title: '一等奖', subTitle: '电动自行车', img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539424091109&di=d0dc6605562092c4eb965420adba3d14&imgtype=0&src=http%3A%2F%2Fwww.mux5.com%2Fpicture%2F52071bda0e87aa59e2bd7c0e64fbcc48.jpg'},
          {title: '二等奖', subTitle: '电动自行车', img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539424091109&di=d0dc6605562092c4eb965420adba3d14&imgtype=0&src=http%3A%2F%2Fwww.mux5.com%2Fpicture%2F52071bda0e87aa59e2bd7c0e64fbcc48.jpg'},
          {title: '三等奖', subTitle: '电动自行车', img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539424091109&di=d0dc6605562092c4eb965420adba3d14&imgtype=0&src=http%3A%2F%2Fwww.mux5.com%2Fpicture%2F52071bda0e87aa59e2bd7c0e64fbcc48.jpg'},
          {title: '四等奖', subTitle: '电动自行车', img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539424091109&di=d0dc6605562092c4eb965420adba3d14&imgtype=0&src=http%3A%2F%2Fwww.mux5.com%2Fpicture%2F52071bda0e87aa59e2bd7c0e64fbcc48.jpg'},
          {title: '五等奖', subTitle: '电动自行车', img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539424091109&di=d0dc6605562092c4eb965420adba3d14&imgtype=0&src=http%3A%2F%2Fwww.mux5.com%2Fpicture%2F52071bda0e87aa59e2bd7c0e64fbcc48.jpg'},
          {title: '六等奖', subTitle: '电动自行车', img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539424091109&di=d0dc6605562092c4eb965420adba3d14&imgtype=0&src=http%3A%2F%2Fwww.mux5.com%2Fpicture%2F52071bda0e87aa59e2bd7c0e64fbcc48.jpg'},
        ],
        colors: ["#F4F4FE", "#FFFFFF", "#F4F4FE", "#FFFFFF","#F4F4FE", "#FFFFFF"],
        outsideRadius: 192,		// 大转盘外圆的半径
        textRadius: 160,			// 大转盘奖品位置距离圆心的距离
        insideRadius: 68,			// 大转盘内圆的半径
        startAngle: 0,				// 开始角度
        bRotate: false,			  // false:停止;ture:旋转
        remainTime: 0,
        imgs: [],
      }
    },
    created () {
      this.restaraunts.forEach(item => {
        var img = new Image()
        img.src = item.img
        this.imgs.push(img)
      })
    },
    mounted () {
      setTimeout(() => {
        this.initial()
      }, 100)

    },
    methods: {
      initial () {
        var canvas = document.getElementById("wheelcanvas")
        if (canvas.getContext) {
          // 根据奖品个数计算圆周角度
          var arc = Math.PI / (this.restaraunts.length / 2)
          var ctx = canvas.getContext("2d")
          // 在给定矩形内清空一个矩形
          ctx.clearRect(0,0,422,422)
          // strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
          ctx.strokeStyle = "#F4F4FE"

          for(var i = 0; i < this.restaraunts.length; i++) {
            var angle = this.startAngle + i * arc
            ctx.fillStyle = this.colors[i]
            ctx.beginPath()
            // arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
            ctx.arc(211, 211, this.outsideRadius, angle, angle + arc, false)
            ctx.arc(211, 211, this.insideRadius, angle + arc, angle, true)
            ctx.stroke()
            ctx.fill()
            // 锁画布(为了保存之前的画布状态)
            ctx.save()

            // ----绘制奖品开始----
            ctx.fillStyle = "#0d0728"
            // translate方法重新映射画布上的 (0,0) 位置
            ctx.translate(211 + Math.cos(angle + arc / 2) * this.textRadius, 211 + Math.sin(angle + arc / 2) * this.textRadius)

            // rotate方法旋转当前的绘图
            ctx.rotate(angle + arc / 2 + Math.PI / 2)

            /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
            var text = this.restaraunts[i].title
            var subTitle = this.restaraunts[i].subTitle
            // font 属性设置或返回画布上文本内容的当前字体属性
            ctx.font = '20px Microsoft YaHei'
            // measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0)
            ctx.font = '16px Microsoft YaHei'
            ctx.fillText(subTitle, -ctx.measureText(subTitle).width / 2, 20)

            // 添加对应图标
            ctx.drawImage(this.imgs[i], -40, 30, 80, 50)
            // 把当前画布返回（调整）到上一个save()状态之前
            ctx.restore();
            // ----绘制奖品结束----
          }
        }
      },
      turnHandle () {
        if(this.bRotate){
          return
        }
        this.bRotate = !this.bRotate
        this.rotateFn(1, this.restaraunts[0].title);
      },
      rotateFn (item, txt){
        var angles = item * (360 / this.restaraunts.length) - (360 / (this.restaraunts.length * 2));
        if(angles < 270){
          angles = 270 - angles;
        }else{
          angles = 360 - angles + 270;
        }
        $('#wheelcanvas').stopRotate();
        var _this = this
        $('#wheelcanvas').rotate({
          angle: 0,
          animateTo: angles + 1800,
          duration: 8000,
          callback: function (){
            _this.bRotate = !_this.bRotate;
            alert(txt);
          }
        });
      }
    }
  }
</script>

<style lang="stylus">
  .rotate{
    background: url("./img/bigbg.png")
    background-size: 100% auto;
    padding-bottom: 70px;
    overflow: hidden;
    .awardList{
      position: absolute;
      width: 122px;
      height: 32px;
      line-height: 32px;
      right: 0;
      top: 260px;
      border-top-left-radius: 16px;
      border-bottom-left-radius: 16px;
      background: rgba(255, 255, 255, 0.7);
      color: #1c104f;
      padding-left: 20px;
      font-size: 18px;
      .more-icon{
        position: absolute;
        right: 8px;
        top: 6px;
      }
    }
    .turnplate{
      width: 90%;
      margin: 380px auto auto;
      background-image: url('./img/bg.png');
      background-size: 100% 100%;
      position:relative;
      .item{
        width: 100%
      }
      .pointer{
        position:absolute;
        width:31.5%;
        height:42.5%;
        left:34.4%;
        top:22.4%;
      }
    }
    .remain{
      width: 154px;
      height: 53px;
      margin: 45px auto 0;
      background: url("./img/remain.png") no-repeat;
      background-size: 100% 100%;
      position: relative;
      .remain-time{
        position: absolute;
        top: 19px;
        right: 44px;
        color: #f79c0c;
        font-weight: bold;
      }
    }
    .rule-btn{
      width: 154px;
      height: 53px;
      margin-top: 53px;
      margin-left: 20px;
      background: url("./img/rulebtn.png") no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
