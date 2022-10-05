import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";


export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      return this.tasks;
    },
    async addTask(task) {
      try {
        const { data, error } = await supabase.from("tasks").insert([
          {
            user_id: useUserStore().user.id,
            title: task.name,
            notes: task.notes,
            is_private: task.private,
            is_complete: false,
          },
        ]);
        if(error) throw(error);
      } catch (error) {
        console.log(error);
      }
    },
    async toggleCompleteTask(id, bool) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ is_complete: bool })
        .eq("id", id);
    },
    async editTask(id, task) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ title: task.title, description: task.notes, is_private: task.private })
        .eq("id", id);
    },
    async deleteTask(id) {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);
    },
  },
});
