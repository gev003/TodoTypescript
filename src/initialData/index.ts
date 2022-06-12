import { useMemo } from "react";
import { v4 } from "uuid";

const randomTodo = {
  id: v4(),
  name: "Clean the house",
  description: "hdjshjd hsjdhsjhdj dhsjhdjshdjs dhsj dhsj",
};

const randomTodo2 = {
  id: v4(),
  name: "Wash the car",
  description: "hdjshffffffffffdjs dhsj dhsj",
};

const initialTodoList = {
  todo: {
    title: "Backlog",
    items: [randomTodo, randomTodo2],
  },
  "in-progress": {
    title: "In Progress",
    items: [],
  },
  done: {
    title: "Done",
    items: [],
  },
};

export default initialTodoList;
