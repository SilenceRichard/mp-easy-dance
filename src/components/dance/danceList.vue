<template>
  <mescroll-uni
    height="100%"
    :fixed="false"
    :up="upOption"
    :down="downOption"
    @down="downCallback"
    @up="upCallback"
  >
    <view class="news-li" v-for="item in dataList" :key="item.id">
      <view>{{item.title}}</view>
      <view class="new-content">{{item.address}}</view>
    </view>
  </mescroll-uni>
</template>

<script>
import Vue from "vue";
import * as DanceType from "@/types/dance";
import { PAGE_SIZE, DOWN_OPTION, UP_OPTION } from "@/constants/list";
import { eventBus } from "@/eventBus";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
export default Vue.extend({
  name: "DanceList",
  props: {
    dataList: {
      type: Array,
      default: []
    },
    currentPageLength: {
      type: Number,
      default: 0
    },
    hasNext: {
      type: Boolean,
      default: true
    }
  },
  components: {
    MescrollUni
  },
  data() {
    /**下拉刷新 手指往下滑, 更新一或多条数据 */
    /**上拉加载 手指往上滑, 获取下一页或更多页的数据 */
    return {
      downOption: {
        ...DOWN_OPTION
      },
      upOption: {
        ...DOWN_OPTION
      }
    };
  },
  methods: {
    /*下拉刷新的回调 */
    downCallback(mescroll) {
      this.$emit("onDown");
      eventBus.$on("serviceError", () => {
        mescroll.endErr();
      });
      mescroll.endSuccess();
      // //联网加载数据
      // this.getListDataFromNet(
      //   0,
      //   1,
      //   data => {
      //     //联网成功的回调,隐藏下拉刷新的状态
      //     mescroll.endSuccess();
      //     //设置列表数据
      //     this.dataList.unshift(data[0]);
      //   },
      //   () => {
      //     //联网失败的回调,隐藏下拉刷新的状态
      //     mescroll.endErr();
      //   }
      // );
    },
    /*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
    upCallback(mescroll) {
      const { num: page } = mescroll;
      this.$emit("onUp", { page });
      eventBus.$on("serviceError", () => {
        mescroll.endErr();
      });
      mescroll.endSuccess(this.currentPageLength, this.hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)
      //联网加载数据
      // this.getListDataFromNet(
      //   mescroll.num,
      //   mescroll.size,
      //   curPageData => {
      //     //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
      //     //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
      //     console.log(
      //       "mescroll.num=" +
      //         mescroll.num +
      //         ", mescroll.size=" +
      //         mescroll.size +
      //         ", curPageData.length=" +
      //         curPageData.length
      //     );
      //     //方法一(推荐): 后台接口有返回列表的总页数 totalPage
      //     //mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)
      //     //方法二(推荐): 后台接口有返回列表的总数据量 totalSize
      //     //mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)
      //     //方法三(推荐): 您有其他方式知道是否有下一页 hasNext
      //     //mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)
      //     //方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据.
      //     mescroll.endSuccess(curPageData.length);
      //     //设置列表数据
      //     this.dataList = this.dataList.concat(curPageData);
      //   },
      //   () => {
      //     //联网失败的回调,隐藏下拉刷新的状态
      //     mescroll.endErr();
      //   }
      // );
    },
    /*联网加载列表数据
			在您的实际项目中,请参考官方写法: http://www.mescroll.com/uni.html#tagUpCallback
			请忽略getListDataFromNet的逻辑,这里仅仅是在本地模拟分页数据,本地演示用
			实际项目以您服务器接口返回的数据为准,无需本地处理分页.
			* */
    getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
      //延时一秒,模拟联网
      setTimeout(function() {
        try {
          let newArr = [];
          if (pageNum == 0) {
            //此处模拟下拉刷新返回的数据
            let id = new Date().getTime();
            let newObj = {
              id: id,
              title: "【新增新闻" + id + "】 标题",
              content: "新增新闻的内容"
            };
            newArr.push(newObj);
          } else {
            //此处模拟上拉加载返回的数据
            for (let i = 0; i < pageSize; i++) {
              let upIndex = (pageNum - 1) * pageSize + i + 1;
              let newObj = {
                id: upIndex,
                title: "【新闻" + upIndex + "】 标题标题标题标题标题",
                content: "内容内容内容内容内容内容内容内容内容"
              };
              newArr.push(newObj);
            }
          }
          //联网成功的回调
          successCallback && successCallback(newArr);
        } catch (e) {
          //联网失败的回调
          errorCallback && errorCallback();
        }
      }, 1000);
    }
  }
});
</script>

<style>
/*说明*/
.notice {
  font-size: 30upx;
  padding: 40upx 0;
  border-bottom: 1upx solid #eee;
  text-align: center;
}
/*展示上拉加载的数据列表*/
.news-li {
  font-size: 32upx;
  padding: 32upx;
  border-bottom: 1upx solid #eee;
}
.news-li .new-content {
  font-size: 28upx;
  margin-top: 10upx;
  margin-left: 20upx;
  color: #666;
}
</style>
