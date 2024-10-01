import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export interface Todo {
    id: string;
    title: string;
    status: 'COMPLETED' | 'NOT_COMPLETED';
}

interface TodoState {
    todos: Todo[];
    isZenMode: boolean; // Add Zen mode state
}

const initialState: TodoState = {
    todos: [],
    isZenMode: false, // Initialize Zen mode state
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            state.todos.push({ id: nanoid(), title: action.payload, status: 'NOT_COMPLETED' });
        },
        addBulkTodo: (state, action: PayloadAction<string[]>) => {
            action.payload.forEach(title => {
                state.todos.push({ id: nanoid(), title, status: 'NOT_COMPLETED' });
            });
        },
        toggleTodo: (state, action: PayloadAction<string>) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.status = todo.status === 'COMPLETED' ? 'NOT_COMPLETED' : 'COMPLETED';
            }
        },
        editTodo: (state, action: PayloadAction<{ id: string; newTitle: string }>) => {
            const todo = state.todos.find(todo => todo.id === action.payload.id);
            if (todo) {
                todo.title = action.payload.newTitle;
            }
        },
        clearCompleted: (state) => {
            state.todos = state.todos.filter(todo => todo.status !== 'COMPLETED');
        },
        clearAll: (state) => {
            state.todos = [];
        },
        toggleZenMode: (state) => { // Add toggleZenMode action
            state.isZenMode = !state.isZenMode;
        },
    },
});

export const { addTodo, addBulkTodo, toggleTodo, editTodo, clearCompleted, clearAll, toggleZenMode } = todoSlice.actions;
export default todoSlice.reducer;
