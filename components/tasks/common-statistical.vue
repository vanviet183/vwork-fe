<template>
  <div class="wrapper-statistical p-4">
    <CommonChartGantt></CommonChartGantt>

    <div class="d-flex gap-4">
      <div class="overview w-1/3 box-item">
        <p>Tổng công việc</p>
        <!-- <CommonCircleProgress></CommonCircleProgress> -->
        <CommonDoughnutChart></CommonDoughnutChart>
        <div class="d-flex justify-between mt-4">
          <div>
            <p>HOÀN THÀNH</p>
            <p>14 đúng hạn</p>
            <p>3 muộn</p>
          </div>
          <div>
            <p>CHƯA HOÀN THÀNH</p>
            <p>0 Chưa tới hạn</p>
            <p>0 Quá hạn</p>
            <p>6 Chưa có hạn</p>
          </div>
        </div>
      </div>
      <div class="chart-gantt w-2/3 box-item">
        Quá trình hoàn thành theo ngày
        <CommonLineChart></CommonLineChart>
      </div>
    </div>
    <div class="d-flex gap-4 mt-4">
      <div class="efficiency w-1/3 box-item">
        <p>Hiệu suất công việc (%)</p>
        <CommonUserTask></CommonUserTask>
        <CommonUserTask></CommonUserTask>
        <CommonUserTask></CommonUserTask>
      </div>
      <div class="unfinished w-1/3 box-item">
        <p>Quá trình hoàn thành theo ngày</p>
        <CommonUserTask></CommonUserTask>
        <CommonUserTask></CommonUserTask>
      </div>
      <div class="out-of-date w-1/3 box-item">
        <p>Quá hạn</p>
        <CommonEmpty></CommonEmpty>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
@use 'sass:map';

.wrapper-statistical {
  background-color: #f2f2f5;
  min-height: 100vh;
}
.box-item {
  padding: 16px;
  border-radius: 10px;
  background-color: white;
  min-height: 102px;
}
</style>
