<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div class="Integral">
    <div id="main" style="width: 850px;height: 300px;"></div>
    <div class="centent">
      <div class="centent-left">
        <h2 class="Title">扣分详情</h2>
        <div class="dynamic">
          <div v-for="(item,index) in integral" :key="index">
              <img v-if="item.coverimage" class="somllicon" :src="item.coverimage.main" alt="">
              <div class="deduction">
                  <div>
                    <span class="large" v-if="item.status==0">扣除{{item.number}}积分</span>
                    <span class="large" v-if="item.status==1">增加{{item.number}}积分</span>
                    <span class="samll">{{item.created_at}}</span>
                  </div>
                  <h2>{{item.content}}</h2>
              </div>
          </div>
          <div class="pagination">
            <el-pagination
              @current-change="handleCurrentChange"
              :page-size="pageSize"
              layout="total, prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="centent-right">
        <h2 class="Title">扣分规则</h2>
        <div class="rule">
            <ul v-for="(item,index) in rule" :key="index">
                <li>{{item.content}}</li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '@/http/api'
  import {pageSize} from '@/util/env' 
export default {
  data () {
    return {
      integral:[],
      rule:[],
      page:1,
      total:0,
      charts: '',
      xdata:[],
      ydata:[],
      pageSize:pageSize
    }
  },
  methods:{
    handleCurrentChange(val) {
      api.getUserIntegralLog({page:val}).then(res =>{
        res.data.data.forEach(function(item,index){
          item.coverimage = JSON.parse(item.coverimage)
        })
        this.integral = res.data.data
        this.total = res.data.total
        this.page = val
      })
    },
    drawPie(id){
      let echarts = require('echarts/lib/echarts')
      // 引入柱状图组件
      require('echarts/lib/chart/line')
      // 引入提示框和title组件
      require('echarts/lib/component/tooltip')
      require('echarts/lib/component/title')
      this.charts = echarts.init(document.getElementById(id))

      this.charts.setOption( {
        title : {
            text: '积分轨迹'
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['积分']
        },
        toolbox: {
          show : true,
          feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore : {show: true},
            saveAsImage : {show: true}
          }
        },
        calculable : true,
        xAxis : [
          {
            type : 'category',
            boundaryGap : false,
            data : ['2018-09-01','2018-09-02','2018-09-03','2018-09-04','2018-09-05','2018-09-06','2018-09-07']
          }
        ],
        yAxis : [
          {
              type : 'value'
          }
        ],
        series : [
          {
              name:'积分',
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data:[1320, 1132, 601, 234, 120, 90, 20]
          }
        ]
      })
      api.getIntegralTrajectory().then(res=>{
        let xdata = res.data.map((item, index, array) => {
        　　return item.date;
        })
        let ydata = res.data.map((item, index, array) => {
        　　return item.integralNumber;
        })

        this.charts.setOption({
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : xdata
            }
          ],
          series : [
            {
              name:'积分',
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data:ydata
            }
          ]
        })
      })
    }
  },
//调用
  mounted(){
      this.$nextTick(function() {
          this.drawPie('main')
      })
  },
  created(){
      //获取用户的积分扣分详情
      api.getUserIntegralLog().then(res =>{
        res.data.data.forEach(function(item,index){
          if(item.coverimage) item.coverimage = JSON.parse(item.coverimage)
        })
        this.integral=res.data.data
        this.total = res.data.total

      })
      //获取用户的积分规则
      api.getIntegralRule().then(res =>{
          this.rule=res.data
      })
      
      
  },
}
</script>
<style scoped>

.flex{
    display: flex;
    justify-content: space-between;      
}
.Capital {
}
.navdata {
  background-color: #fff;
  width: 98%;
  padding: 18px 12px;
}
.Title {
  font-size: 18px;
  color: #000;
  border-left: 4px solid #43b5f9;
  line-height: 22px;
  padding-left: 10px;
  font-weight: 400;
  margin-bottom: 25px;
}
.vipimg {
  margin-bottom: 15px;
}

.centent{
    display: flex;
    margin: 40px 0 25px 0;
}
.centent-left{
    width: 64%;
    margin-right: 20px;
}
.dynamic{
    display: block;
}
.dynamic>div{
    background-color: #fff;
    padding: 14px 18px;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
}
.somllicon{
    width: 72px;height: 72px;
    background-size: 100%;
}
.deduction{
    width: 486px;
}
.deduction>h2{
    font-size: 12px;
    color: #394853;
    margin-top: 10px;
    font-weight: 400;
}
.deduction>div{
    display: flex;
    justify-content: space-between;
}
.large{
    font-size: 14px;
    line-height: 22px;
    color: #394853;
}
.samll{
    font-size: 12px;
    line-height: 22px;
    color: #394853;
}
.centent-right{
    width: 36%;
}
.rule{
    display: block;
    padding: 16px 2px 16px 45px;
    background-color: #fff;
    height: 83%;
}
.rule ul li{
    margin: 20px 0;
    font-size: 12px;
    color: #3c3c3c;
    list-style-type:disc;
}
</style>