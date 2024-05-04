<template>
  <div class="relative h-[450px] mb-4">
    <div class="wrapper-gantt">
      <ejs-gantt
        ref="gantt"
        :data-source="projectNewData"
        :task-fields="taskFields"
        :tree-column-index="1"
        :task-mode="scheduleMode"
        :enable-critical-path="true"
        :highlight-weekends="true"
        :work-week="weekdays"
        :allow-unscheduled-tasks="true"
        :toolbar="['CriticalPath']"
        :edit-settings="{
          allowAdding: true,
          allowEditing: true,
          allowDeleting: true,
          allowTaskbarEditing: true,
          showDeleteConfirmDialog: true,
        }"
        :timeline-settings="{
          topTier: {
            format: 'MM dd, yyyy',
            unit: 'Week',
          },
          bottomTier: {
            format: 'dd',
            unit: 'Day',
          },
        }"
        :height="450"
      >
        <e-columns>
          <e-column
            field="TaskID"
            header-text="Task ID"
            width="100"
            text-align="Right"
          ></e-column>
          <e-column
            field="TaskName"
            header-text="Task Name"
            text-align="Left"
            width="150"
          ></e-column>
          <e-column
            field="StartDate"
            header-text="Start Date"
            text-align="Right"
            format="dd/MM/yyyy"
            width="100"
          ></e-column>
          <e-column
            field="Duration"
            header-text="Duration"
            text-align="Right"
            width="100"
          ></e-column>
        </e-columns>
      </ejs-gantt>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  CriticalPath,
  DayMarkers,
  ColumnDirective as EColumn,
  ColumnsDirective as EColumns,
  Edit,
  GanttComponent as EjsGantt,
  Toolbar,
} from '@syncfusion/ej2-vue-gantt'
import { storeToRefs } from 'pinia'
import { useProjectStore } from '~/stores/project/project-store'

provide('gantt', [Edit, Toolbar, DayMarkers, CriticalPath])

const scheduleMode = 'Custom'
// const events = [
//   {
//     day: new Date('04/02/2024'),
//   },
//   {
//     day: new Date('04/09/2024'),
//     label: 'Design Phase',
//   },
// ]
// const leaveDetails = [
//   {
//     from: new Date('04/05/2024'),
//     to: new Date('04/06/2024'),
//     label: 'Good Friday',
//   },
//   {
//     from: new Date('04/11/2024'),
//     label: 'Local Holiday',
//   },
//   {
//     from: new Date('05/01/2024'),
//     label: 'May Day',
//   },
// ]

const weekdays = ref([
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
])

const projectStore = useProjectStore()
const { listTask } = storeToRefs(projectStore)

const taskFields = ref({
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  endDate: 'EndDate',
  duration: 'Duration',
  progress: 'Progress',
  dependency: 'Predecessor',
  child: 'subtasks',
  manual: 'isManual',
  indicators: 'Indicators',
})

const projectNewData = computed(() => getListTask())

const getListTask = () => {
  return listTask.value?.map((item) => ({
    TaskID: item.id,
    TaskName: item.taskName,
    StartDate: new Date(item.startDate),
    EndDate: new Date(item.endDate),
    isManual: true,
  }))
}

const projectNewData2 = ref([
  {
    TaskID: 1,
    TaskName: 'Product concept',
    StartDate: new Date('04/02/2019'),
    EndDate: new Date('04/21/2019'),
    isManual: true,
    subtasks: [
      {
        TaskID: 2,
        TaskName: 'Defining the product and its usage',
        StartDate: new Date('04/02/2019'),
        Duration: 3,
        Progress: 30,
      },
      {
        TaskID: 3,
        TaskName: 'Defining target audience',
        StartDate: new Date('04/02/2019'),
        Duration: 3,
      },
      {
        TaskID: 4,
        TaskName: 'Prepare product sketch and notes',
        StartDate: new Date('04/02/2019'),
        Duration: 2,
        Predecessor: '2',
        Progress: 30,
        isManual: true,
      },
    ],
  },
  {
    TaskID: 5,
    TaskName: 'Concept approval',
    StartDate: new Date('04/02/2019'),
    Duration: 3,
    Predecessor: '3,4',
    Indicators: [
      {
        date: '04/12/2019',
        name: 'Design Phase',
        tooltip: 'Design phase completed',
        iconClass: 'okIcon e-icons',
      },
    ],
  },
  {
    TaskID: 6,
    TaskName: 'Market research',
    StartDate: new Date('04/02/2019'),
    EndDate: new Date('04/21/2019'),
    isManual: true,
    subtasks: [
      {
        TaskID: 7,
        TaskName: 'Demand analysis',
        StartDate: new Date('04/04/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
          {
            TaskID: 8,
            TaskName: 'Customer strength',
            StartDate: new Date('04/04/2019'),
            Duration: 4,
            Predecessor: '5',
            Progress: 30,
          },
          {
            TaskID: 9,
            TaskName: 'Market opportunity analysis',
            StartDate: new Date('04/04/2019'),
            Duration: 4,
            Predecessor: '5',
          },
        ],
      },
      {
        TaskID: 10,
        TaskName: 'Competitor analysis',
        StartDate: new Date('04/04/2019'),
        Duration: 4,
        Predecessor: '7, 8',
        Progress: 30,
        isManual: true,
      },
      {
        TaskID: 11,
        TaskName: 'Product strength analsysis',
        StartDate: new Date('04/04/2019'),
        Duration: 4,
        Predecessor: '9',
      },
      {
        TaskID: 12,
        TaskName: 'Research complete',
        StartDate: new Date('04/04/2019'),
        Duration: 0,
        Predecessor: '10',
        Indicators: [
          {
            date: '04/20/2019',
            name: 'Research completed',
            tooltip: 'Research completed',
            iconClass: 'description e-icons',
          },
        ],
      },
    ],
  },
  {
    TaskID: 13,
    TaskName: 'Product design and development',
    StartDate: new Date('04/04/2019'),
    EndDate: new Date('04/21/2019'),
    subtasks: [
      {
        TaskID: 14,
        TaskName: 'Functionality design',
        StartDate: new Date('04/04/2019'),
        Duration: 3,
        Progress: 30,
        Predecessor: '12',
      },
      {
        TaskID: 15,
        TaskName: 'Quality design',
        StartDate: new Date('04/04/2019'),
        Duration: 3,
        Predecessor: '12',
      },
      {
        TaskID: 16,
        TaskName: 'Define reliability',
        StartDate: new Date('04/04/2019'),
        Duration: 2,
        Progress: 30,
        Predecessor: '15',
      },
      {
        TaskID: 17,
        TaskName: 'Identifying raw materials',
        StartDate: new Date('04/04/2019'),
        Duration: 2,
        Predecessor: '15',
      },
      {
        TaskID: 18,
        TaskName: 'Define cost plan',
        StartDate: new Date('04/04/2019'),
        EndDate: new Date('04/21/2019'),
        isManual: true,
        subtasks: [
          {
            TaskID: 19,
            TaskName: 'Manufacturing cost',
            StartDate: new Date('04/04/2019'),
            Duration: 2,
            Progress: 30,
            Predecessor: '17',
          },
          {
            TaskID: 20,
            TaskName: 'Selling cost',
            StartDate: new Date('04/04/2019'),
            Duration: 2,
            Predecessor: '17',
          },
        ],
      },
      {
        TaskID: 21,
        TaskName: 'Development of the final design',
        StartDate: new Date('04/04/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
          {
            TaskID: 22,
            TaskName: 'Defining dimensions and package volume',
            StartDate: new Date('04/04/2019'),
            Duration: 2,
            Progress: 30,
            Predecessor: '19,20',
          },
          {
            TaskID: 23,
            TaskName: 'Develop design to meet industry standards',
            StartDate: new Date('04/04/2019'),
            Duration: 2,
            Predecessor: '22',
            isManual: true,
          },
          {
            TaskID: 24,
            TaskName: 'Include all the details',
            StartDate: new Date('04/04/2019'),
            Duration: 3,
            Predecessor: '23',
          },
        ],
      },
      {
        TaskID: 25,
        TaskName: 'CAD computer-aided design',
        StartDate: new Date('04/04/2019'),
        Duration: 3,
        Progress: 30,
        Predecessor: '24',
      },
      {
        TaskID: 26,
        TaskName: 'CAM computer-aided manufacturing',
        StartDate: new Date('04/04/2019'),
        Duration: 3,
        Predecessor: '25',
      },
      {
        TaskID: 27,
        TaskName: 'Design complete',
        StartDate: new Date('04/04/2019'),
        Duration: 0,
        Predecessor: '26',
      },
    ],
  },
  {
    TaskID: 28,
    TaskName: 'Prototype testing',
    StartDate: new Date('04/04/2019'),
    Duration: 4,
    Progress: 30,
    Predecessor: '27',
  },
  {
    TaskID: 29,
    TaskName: 'Include feedback',
    StartDate: new Date('04/04/2019'),
    Duration: 4,
    Predecessor: '28ss',
    Indicators: [
      {
        date: '05/24/2019',
        name: 'Production phase',
        tooltip: 'Production phase completed',
        iconClass: 'okIcon e-icons',
      },
    ],
  },
  {
    TaskID: 30,
    TaskName: 'Manufacturing',
    StartDate: new Date('04/04/2019'),
    Duration: 5,
    Progress: 30,
    Predecessor: '28,29',
  },
  {
    TaskID: 31,
    TaskName: 'Assembling materials to finsihed goods',
    StartDate: new Date('04/04/2019'),
    Duration: 5,
    Predecessor: '30',
  },
  {
    TaskID: 32,
    TaskName: 'Feedback and testing',
    StartDate: new Date('04/04/2019'),
    EndDate: new Date('04/21/2019'),
    subtasks: [
      {
        TaskID: 33,
        TaskName: 'Internal testing and feedback',
        StartDate: new Date('04/04/2019'),
        Duration: 3,
        Progress: 45,
        Predecessor: '31',
      },
      {
        TaskID: 34,
        TaskName: 'Customer testing and feedback',
        StartDate: new Date('04/04/2019'),
        Duration: 3,
        Progress: 50,
        Predecessor: '33',
      },
    ],
  },
  {
    TaskID: 35,
    TaskName: 'Final product development',
    StartDate: new Date('04/04/2019'),
    EndDate: new Date('04/21/2019'),
    subtasks: [
      {
        TaskID: 36,
        TaskName: 'Important improvements',
        StartDate: new Date('04/04/2019'),
        Duration: 4,
        Progress: 30,
        Predecessor: '34',
      },
      {
        TaskID: 37,
        TaskName: 'Address any unforeseen issues',
        StartDate: new Date('04/04/2019'),
        Duration: 4,
        Progress: 30,
        Predecessor: '36ss',
        Indicators: [
          {
            date: '06/21/2019',
            name: 'Sales and marketing',
            tooltip: 'Sales and marketing',
            iconClass: 'description e-icons',
          },
        ],
      },
    ],
  },
  {
    TaskID: 38,
    TaskName: 'Final product',
    StartDate: new Date('04/04/2019'),
    EndDate: new Date('04/21/2019'),
    subtasks: [
      {
        TaskID: 39,
        TaskName: 'Branding product',
        StartDate: new Date('04/04/2019'),
        Duration: 4,
        Predecessor: '37',
      },
      {
        TaskID: 40,
        TaskName: 'Marketing and presales',
        StartDate: new Date('04/04/2019'),
        Duration: 4,
        Progress: 30,
        Predecessor: '39',
      },
    ],
  },
])
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
