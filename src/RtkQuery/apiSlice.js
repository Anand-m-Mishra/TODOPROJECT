import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTask: builder.query({
      query: () => "/tasks",
      transformResponse: (tasks) => tasks.reverse(),
      providesTags: ["Tasks"],
    }),
    addTask: builder.mutation({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
      async onQueryStarted(task, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getTasks", undefined, (draft) => {
            draft.unshift({ id: crypto.randomUUID(), ...task });
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateTask: builder.mutation({
      query: ({ id, ...updatedTask }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: updatedTask,
      }),
      invalidatesTags: ["Tasks"],
      async onQueryStarted(
        { id, ...updatedTask },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          api.util.updateQueryData("getTasks", undefined, (tasksList) => {
            const taskIndex = tasksList.findIndex((el) => el.id === id);
            tasksList[taskIndex] = { ...tasksList[taskIndex], ...updatedTask };
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getTasks", undefined, (tasksList) => {
            const taskIndex = tasksList.findIndex((el) => el.id === id);
            tasksList.splice(taskIndex, 1);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
 
  getSubtasks:builder.query({
    query:(taskId)=>`/tasks/${taskId}/sub-tasks`,
    providesTags:["subTasks"],
  }),
  addSubTask: builder.mutation({
    query: ({ taskId, subTask }) => ({
      url: `/tasks/${taskId}/sub-tasks`,
      method: "POST",
      body: subTask,
    }),
    invalidatesTags:['SubTasks'],
    async onQueryStarted({ taskId, subTask }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getSubTasks", taskId, (draft) => {
            draft.unshift({ id: crypto.randomUUID(), ...subTask });
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateSubTask: builder.mutation({
        query: ({ taskId, subTaskId, updatedSubTask }) => ({
          url: `/tasks/${taskId}/sub-tasks/${subTaskId}`,
          method: "PATCH",
          body: updatedSubTask,
        }),
        invalidatesTags: ["SubTasks"],
        async onQueryStarted(
          { taskId, subTaskId, updatedSubTask },
          { dispatch, queryFulfilled },
        ) {
          const patchResult = dispatch(
            api.util.updateQueryData("getSubTasks", taskId, (subTasksList) => {
              const subTaskIndex = subTasksList.findIndex((el) => el.id === subTaskId);
              subTasksList[subTaskIndex] = { ...subTasksList[subTaskIndex], ...updatedSubTask };
            }),
          );
  
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
      }),
      deleteSubTask: builder.mutation({
        query: ({ taskId, subTaskId }) => ({
          url: `/tasks/${taskId}/sub-tasks/${subTaskId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["SubTasks"],
      }),
 }),
});

export const {
  useGetTaskQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetSubtasksQuery,
  useAddSubTaskMutation,
  useUpdateSubTaskMutation,
  useDeleteSubTaskMutation,
} = api;