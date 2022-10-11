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
            title: task.title,
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
      const date = new Date();
      const { data, error } = await supabase
        .from("tasks")
        .update({ is_complete: bool , completed_at: date.toISOString()})
        .eq("id", id);
      console.log(error);
    },
    async editTask(task) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ title: task.title, notes: task.notes, is_private: task.private })
        .eq("id", task.id);
    },
    async deleteTask(id) {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);
    },
  },
});
