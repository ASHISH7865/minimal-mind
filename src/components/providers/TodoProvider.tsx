import { nanoid } from 'nanoid';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { defaultTodos } from '../../todo';

export interface Todo {
    id: string,
    title: string,
    status: "COMPLETED" | "NOT_COMPLETED"
}


interface TodoContextType {
    todos: Todo[];
    addTodo: (title: string) => void,
    addBulkTodo: (titles: string[]) => void,
    toggleTodo: (id: string) => void,
    editTodo: (id: string, newTitle: string) => void;
    clearAll: () => void;
    clearCompleted: () => void;
}


const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const storedTodos = localStorage.getItem('todos');
        return storedTodos ? JSON.parse(storedTodos) : defaultTodos
    });


    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const addTodo = (title: string) => {
        setTodos([...todos, { id: nanoid(), title, status: "NOT_COMPLETED" }])
    }

    const addBulkTodo = (titles: string[]) => {
        setTodos([...todos, ...titles.map(title => ({ id: nanoid(), title, status: "NOT_COMPLETED" as const }))])
    }

    const toggleTodo = (id: string) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, status: todo.status === "COMPLETED" ? "NOT_COMPLETED" : "COMPLETED" } : todo))
    }

    const editTodo = (id: string, newTitle: string) => {
        if (newTitle.trim() === "") {
            console.log(id, todos)
            setTodos(todos.filter(todo => todo.id !== id))
            return;
        }
        setTodos(todos.map(todo => todo.id === id ? { ...todo, title: newTitle } : todo))
    }

    const clearCompleted = () => {
        setTodos(todos.filter(todo => todo.status !== "COMPLETED"))
    }

    const clearAll = () => {
        setTodos([])
    }



    return (
        <TodoContext.Provider value={{ todos, addTodo, toggleTodo, editTodo, clearCompleted, clearAll, addBulkTodo }}>
            {children}
        </TodoContext.Provider>
    )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTodo = (): TodoContextType => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error("useTodo must be used within a TodoProvider");
    }
    return context;
}
