<template>
  <div v-if="projectTaskData" class="relative h-[450px] mb-4">
    <div class="wrapper-gantt">
      <ejs-gantt
        id="GanttContainer"
        ref="gantt"
        :data-source="projectTaskData"
        :task-fields="taskFields"
        :height="450"
        :highlight-weekends="true"
        :work-week="weekdays"
        :query-taskbar-info="queryTaskbarInfo"
        :label-settings="labelSettings"
        :timeline-settings="{
          topTier: {
            unit: 'Week',
          },
          bottomTier: {
            format: 'dd',
            unit: 'Day',
          },
        }"
        :toolbar="['ZoomIn', 'ZoomOut', 'ZoomToFit']"
        :selection-settings="{ mode: 'Both' }"
        :allow-pdf-export="true"
      ></ejs-gantt>
      <!-- :project-start-date="new Date(projectInfo?.startDate ?? '')" -->
      <!-- :project-end-date="new Date(projectInfo?.endDate ?? '')" -->
      <!-- :collapse-all-parent-tasks="true" -->
      <!-- :toolbar-click="toolbarClick" -->
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  DayMarkers,
  Edit,
  GanttComponent as EjsGantt,
  PdfExport,
  Selection,
  Toolbar,
} from '@syncfusion/ej2-vue-gantt'
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'
import { useProjectStore } from '~/stores/project/project-store'

provide('gantt', [Edit, Toolbar, DayMarkers, PdfExport, Selection])

const route = useRoute()
const projectId = computed(() => Number(route.query.projectId))

const weekdays = ref([
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
])

const gantt = ref()

const labelSettings = {
  rightLabel: '${taskData.TaskName}',
  taskLabel: '${Progress}%',
}

// function toolbarClick(args: any) {
//   const ganttObj = gantt.value.ej2Instances
//   if (args.item.id === 'GanttContainer_pdfexport') {
//     ganttObj.pdfExport({
//       fileName: 'exportData.pdf',
//       enableFooter: false,
//       fitToWidthSettings: {
//         isFitToWidth: true,
//       },
//     })
//   }
// }

const projectStore = useProjectStore()
const { listTaskInProject } = storeToRefs(projectStore)

onMounted(async () => {
  await projectStore.getProjectInfo(projectId.value)
})

const taskFields = ref({
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration',
  progress: 'Progress',
  child: 'subtasks',
})

function queryTaskbarInfo(args: any) {
  // console.log('args', args)
  args.taskbarBgColor = 'rgb(58, 176, 255)'
  args.taskLabelColor = 'black'
  args.progressBarBgColor = 'rgb(21, 245, 186)'

  // if (args.data.Progress <= 30) {
  //   args.progressBarBgColor = 'rgb(21, 245, 186)'
  // }
}

const projectTaskData = computed(() => mapTasks())

interface GroupTask {
  [key: string]: any
}

function mapTasks() {
  const groupedTasks: GroupTask = {}

  listTaskInProject.value?.forEach((task) => {
    const phase = task.phase
    if (!groupedTasks[phase]) {
      groupedTasks[phase] = {
        TaskID: listTaskInProject.value?.indexOf(task),
        TaskName: phase,
        StartDate: null,
        EndDate: null,
        isParent: true,
        subtasks: [],
      }
    }

    const taskObject = {
      TaskID: task.id,
      TaskName: task.taskName,
      StartDate: new Date(task.startDate),
      EndDate: new Date(task.endDate),
      Duration: getDuration(task.endDate, task.startDate),
      Progress: task.progress,
      isParent: false,
    }

    if (
      !groupedTasks[phase].StartDate ||
      task.startDate <= groupedTasks[phase].StartDate
    ) {
      groupedTasks[phase].StartDate = task.startDate
    }

    if (
      !groupedTasks[phase].EndDate ||
      task.endDate >= groupedTasks[phase].EndDate
    ) {
      groupedTasks[phase].EndDate = task.endDate
    }

    groupedTasks[phase].subtasks.push(taskObject)
  })

  return Object.values(groupedTasks)
}

function getDuration(end: string, start: string) {
  const duration = dayjs(end).diff(dayjs(start), 'day')

  return duration || 1
}
// Example usage
</script>
<style>
/* @import url('https://cdn.syncfusion.com/ej2/material.css'); */
@import '~/node_modules/@syncfusion/ej2-base/styles/material.css';
@import '~/node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '~/node_modules/@syncfusion/ej2-calendars/styles/material.css';
@import '~/node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
@import '~/node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '~/node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '~/node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '~/node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
@import '~/node_modules/@syncfusion/ej2-layouts/styles/material.css';
@import '~/node_modules/@syncfusion/ej2-grids/styles/material.css';
@import '~/node_modules/@syncfusion/ej2-treegrid/styles/material.css';
@import '~/node_modules/@syncfusion/ej2-vue-gantt/styles/material.css';

.wrapper-gantt {
  position: absolute;
  height: 450px;
  left: 0;
  top: 0;
  right: 0;
}
</style>
