webpackJsonp([14],{X6jC:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("Dd8w"),i=a.n(o),n=a("NYxO"),s=a("m4jk"),l=a("wEYB"),r={data:function(){return{list:[],total:0,page:1,pageSize:l.c}},methods:i()({},Object(n.b)({setGoodsType:"setGoodsType",setGoodsInfo:"setGoodsInfo",setGoodsKill:"setGoodsKill"}),{editView:function(t){this.setGoodsType("kill"),this.setGoodsInfo({link:t.goodslink,id:t.goodsid,editId:t.id,salecount:t.salecount,coverimage:t.coverimage.main}),this.setGoodsKill({goodsTime:t.startfield,goodsDate:t.startdate}),this.$router.push({path:"/Secondfrom"})},handleCurrentChange:function(t){var e=this;s.a.getUserKillList({type:"refuse",page:t}).then(function(a){a.data.data.forEach(function(t,e){t.refuse=JSON.parse(t.refuse),t.coverimage=JSON.parse(t.coverimage)}),e.list=a.data.data,e.total=a.data.total,e.page=t})}}),created:function(){var t=this;s.a.getUserKillList({type:"refuse",page:0}).then(function(e){e.data.data.forEach(function(t,e){t.refuse=JSON.parse(t.refuse),t.coverimage=JSON.parse(t.coverimage)}),t.list=e.data.data,t.total=e.data.total})}},c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"Examineing right-content"},[a("h2",{staticClass:"Title"},[t._v("审核被拒")]),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.list,"highlight-current-row":""}},[a("el-table-column",{attrs:{prop:"goodstitle",label:"商品标题",width:"280"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("img",{staticClass:"coverimage",attrs:{src:e.row.coverimage.main,alt:"商品"}}),t._v(" "),a("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(e.row.goodstitle))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"startdate",label:"秒杀日期"}}),t._v(" "),a("el-table-column",{attrs:{prop:"startfield",label:"秒杀场次"}}),t._v(" "),a("el-table-column",{attrs:{prop:"refuse.content",label:"被拒原因"}}),t._v(" "),a("el-table-column",{attrs:{prop:"begintime",label:"操作",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.editView(e.row)}}},[t._v("修改重新提交")])]}}])})],1),t._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{"page-size":t.pageSize,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],1)};c._withStripped=!0;var d={render:c,staticRenderFns:[]},u=d;var p=!1;var f=a("VU/8")(r,u,!1,function(t){p||a("f6ck")},"data-v-7cad535e",null);f.options.__file="src/views/SecondKill/Examine/Examineno.vue";e.default=f.exports},f6ck:function(t,e,a){var o=a("ig02");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a("rjj0")("9e04d042",o,!1,{})},ig02:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.Examineing[data-v-7cad535e] {\n  padding-bottom: 20px;\n  background-color: #fff;\n}\n.Examineing .pagination[data-v-7cad535e] {\n    margin-top: 20px;\n    text-align: center;\n}\n",""])}});