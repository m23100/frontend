webpackJsonp([24],{"2SZg":function(t,a,e){var o=e("yWRX");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);e("rjj0")("03b8f4c2",o,!1,{})},lp5V:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var o=e("m4jk"),n=e("wEYB"),s={data:function(){return{list:[],total:0,page:1,type:1,state:2,pageSize:n.c}},inject:["reload"],methods:{handleCurrentChange:function(t){var a=this;o.a.auditing({type:this.type,state:this.state,page:t}).then(function(e){e.data.data.forEach(function(t,a){t.coverimage=JSON.parse(t.coverimage)}),a.list=e.data.data,a.total=e.data.total,a.page=t})},offGoods:function(t){var a=this;this.$confirm("此操作将下架该商品, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){o.a.lowerFrameGood({id:t.id,status:6}).then(function(t){0==t.code?(a.$message({type:"success",message:"操作成功!"}),a.reload()):(a.$message({type:"info",message:"操作失败"}),a.reload())})}).catch(function(){a.$message({type:"info",message:"已取消操作"})})}},created:function(){var t=this;o.a.auditing({type:this.type,state:this.state}).then(function(a){a.data.data.forEach(function(t,a){t.coverimage=JSON.parse(t.coverimage)}),t.list=a.data.data,t.total=a.data.total})}},i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"Viptestok right-content"},[e("h2",{staticClass:"Title"},[t._v("爆款通过")]),t._v(" "),e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.list,"highlight-current-row":""}},[e("el-table-column",{attrs:{label:"商品名",width:"280"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("img",{staticClass:"coverimage",attrs:{src:a.row.coverimage.main,alt:"商品"}}),t._v(" "),e("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(a.row.goodstitle))])]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"passtime",label:"通过时间"}}),t._v(" "),e("el-table-column",{attrs:{prop:"couponremain",label:"销量增长"}}),t._v(" "),e("el-table-column",{attrs:{prop:"increment",label:"领券信息"},scopedSlots:t._u([{key:"default",fn:function(a){return[t._v("\n        "+t._s(a.row.coupontotal)+"张("+t._s(a.row.coupontotal-a.row.couponremain)+"/"+t._s(a.row.coupontotal)+")\n      ")]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"goodsstate",label:"操作",width:"180"},scopedSlots:t._u([{key:"default",fn:function(a){return[2==a.row.goodsstate?e("el-button",{attrs:{type:"success",round:"",size:"small"},on:{click:function(e){t.offGoods(a.row)}}},[t._v("下架")]):t._e(),t._v(" "),4==a.row.goodsstate||6==a.row.goodsstate?e("el-button",{attrs:{type:"warning",round:"",size:"small"}},[t._v("已下架")]):t._e()]}}])})],1),t._v(" "),e("div",{staticClass:"pagination"},[e("el-pagination",{attrs:{"page-size":t.pageSize,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],1)};i._withStripped=!0;var r={render:i,staticRenderFns:[]},l=r;var c=!1;var p=e("VU/8")(s,l,!1,function(t){c||e("2SZg")},"data-v-0a0ac99b",null);p.options.__file="src/views/platform/Svip/Sviptestok.vue";a.default=p.exports},yWRX:function(t,a,e){(t.exports=e("FZ+f")(!1)).push([t.i,"\n.Viptestok[data-v-0a0ac99b] {\n  padding-bottom: 20px;\n  background-color: #fff;\n}\n.Viptestok .pagination[data-v-0a0ac99b] {\n    margin-top: 20px;\n    text-align: center;\n}\n",""])}});