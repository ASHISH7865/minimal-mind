import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export type Priority = "HIGH" | "MEDIUM" | "LOW";
export interface Todo {
  id: string;
  title: string;
  status: "COMPLETED" | "NOT_COMPLETED";
  priority: Priority;
  tags: string[];
}

interface TodoState {
  todos: Todo[];
  isZenMode: boolean;
}

const initialState: TodoState = {
  todos: [],
  isZenMode: false,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<Todo, "id">>) => {
      state.todos.push({
        id: nanoid(),
        ...action.payload,
      });
    },
    addBulkTodo: (state, action: PayloadAction<Omit<Todo, "id">[]>) => {
      action.payload.forEach((todo) => {
        state.todos.push({ id: nanoid(), ...todo });
      });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.status = todo.status === "COMPLETED" ? "NOT_COMPLETED" : "COMPLETED";
      }
    },
    editTodo: (state, action: PayloadAction<{ id: string; newTitle: string }>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.newTitle;
      }
    },
    updateTodoPriority: (state, action: PayloadAction<{ id: string; priority: Priority }>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.priority = action.payload.priority;
      }
    },
    addTagToTodo: (state, action: PayloadAction<{ id: string; tag: string }>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo && !todo.tags.includes(action.payload.tag)) {
        todo.tags.push(action.payload.tag);
      }
    },
    removeTagFromTodo: (state, action: PayloadAction<{ id: string; tag: string }>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.tags = todo.tags.filter((tag) => tag !== action.payload.tag);
      }
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => todo.status !== "COMPLETED");
    },
    clearAll: (state) => {
      state.todos = [];
    },
    toggleZenMode: (state) => {
      state.isZenMode = !state.isZenMode;
    },
  },
});

export const {
  addTodo,
  addBulkTodo,
  toggleTodo,
  editTodo,
  updateTodoPriority,
  addTagToTodo,
  removeTagFromTodo,
  clearCompleted,
  clearAll,
  toggleZenMode,
} = todoSlice.actions;

export default todoSlice.reducer;
