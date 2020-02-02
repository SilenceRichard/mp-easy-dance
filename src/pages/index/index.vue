<template>
  <view class="content">
    <view>
      <uni-search-bar></uni-search-bar>
    </view>
    <view style="height: 90vh">
      <dance-list-view
        :dataList="danceList"
        :currentPageLength="currentPageLength"
        :hasNext="hasNext"
        @onDown="onDown"
        @onUp="onUp"
      ></dance-list-view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import { cloneDeep } from "lodash";
import danceListView from "@/components/dance/danceList.vue";
import uniSearchBar from "@/components/uni-ui/uni-search-bar/uni-search-bar.vue";
import * as DanceType from "@/types/dance";
import { PAGE_SIZE } from "@/constants/list";
import { getDanceList } from "@/services/dance";
interface DataType {
  danceList: Array<DanceType.DanceListItem>;
  newList: Array<DanceType.DanceListItem>;
  hasNext: boolean;
  currentPageLength: number;
}
export default Vue.extend({
  components: {
    danceListView,
    uniSearchBar
  },
  data(): DataType {
    return {
      newList: [],
      danceList: [],
      hasNext: true,
      currentPageLength: 0
    };
  },
  async onLoad() {
    await this.getData(0);
    this.danceList = cloneDeep(this.newList);
  },
  methods: {
    async getData(page: number) {
      const data = await getDanceList(page);
      const { list } = data;
      this.newList = list;
      this.hasNext = this.newList.length === PAGE_SIZE;
      this.currentPageLength = this.newList.length;
    },
    async onDown() {
      await this.getData(0);
      this.danceList = this.newList.concat(this.danceList);
    },
    async onUp(params: { page: number }) {
      const { page } = params;
      await this.getData(page);
      this.danceList = this.danceList.concat(this.newList);
    }
  }
});
</script>

<style>
</style>
