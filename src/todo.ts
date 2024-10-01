import { nanoid } from 'nanoid';
import { Todo } from './redux/todoSlice';

const defaultTodos: Todo[] = [
  {
    id: nanoid(),
    title: "Buy groceries for the week",
    status: "NOT_COMPLETED"
  },
  {
    id: nanoid(),
    title: "Schedule annual health check-up with the doctor",
    status: "COMPLETED"
  },
  {
    id: nanoid(),
    title: "Clean the garage",
    status: "NOT_COMPLETED"
  },
  {
    id: nanoid(),
    title: "Pay utility bills",
    status: "COMPLETED"
  },
  {
    id: nanoid(),
    title: "Plan weekend trip with family",
    status: "NOT_COMPLETED"
  },
  {
    id: nanoid(),
    title: "Renew gym membership",
    status: "NOT_COMPLETED"
  },
  {
    id: nanoid(),
    title: "Organize closet and donate unused clothes",
    status: "NOT_COMPLETED"
  },
  {
    id: nanoid(),
    title: "Call mom for her birthday",
    status: "COMPLETED"
  },
  {
    id: nanoid(),
    title: "Start a new book",
    status: "NOT_COMPLETED"
  },
  {
    id: nanoid(),
    title: "Prepare presentation for work meeting next week",
    status: "NOT_COMPLETED"
  }
];

export { defaultTodos };
