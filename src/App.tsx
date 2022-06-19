import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { v4 } from "uuid";
import {
  IAddTodoItem,
  IEditableData,
  ITodoItem,
  ITodoList,
} from "./types/types";
import TodoForm from "./components/addSearchTodoForm";
import initialTodoList from "./initialData";
import TodoItemsList from "./components/dragAndDrop";
import replaceItemOfArray from "./helpers/replaceItemOfArray";

function App() {
  const [todoList, setTodoList] = useState<ITodoList>(() => {
    const todoDataFromLS = localStorage.getItem("todoList");
    return todoDataFromLS ? JSON.parse(todoDataFromLS) : initialTodoList;
  });
  const [searchTodoData, setSearchTodoData] = useState<null | ITodoList>(null);
  // There is a case when edit btn is clicked and you can drag it. It can be solved with editing state.
  // const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editableData, setEditableData] = useState<null | IEditableData>(null);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const addOrUpdateTodo = useCallback(
    (inputValues: IAddTodoItem) => {
      setTodoList((prev) => {
        if (editableData) {
          const {
            origin,
            element: { id },
            index,
          } = editableData;
          const { name, description } = inputValues;
          const foundedItem = todoList[origin].items.find(
            (todo) => todo.id === id
          );
          if (foundedItem) {
            foundedItem.name = name;
            foundedItem.description = description;
          }

          setTimeout(() => {
            setEditableData(null);
          }, 1000);

          return {
            ...prev,
            [origin]: {
              ...todoList[origin],
              items: replaceItemOfArray(
                todoList[origin].items,
                index,
                foundedItem
              ),
            },
          };
        } else {
          return {
            ...prev,
            todo: {
              title: "BackLog",
              items: [
                {
                  id: v4(),
                  name: inputValues.name,
                  description: inputValues.description,
                },
                ...prev.todo.items,
              ],
            },
          };
        }
      });
    },
    [todoList, editableData]
  );

  const handleDragEnd = useCallback(
    ({ destination, source }: any) => {
      if (!destination) {
        return;
      }

      if (
        destination.index === source.index &&
        destination.droppableId === source.droppableId
      ) {
        return;
      }

      const itemCopy = { ...todoList[source.droppableId].items[source.index] };

      setTodoList((prev) => {
        prev = { ...prev };
        prev[source.droppableId].items.splice(source.index, 1);

        prev[destination.droppableId].items.splice(
          destination.index,
          0,
          itemCopy
        );

        return prev;
      });
    },
    [todoList]
  );

  const deleteTodoItem = useCallback(
    (key: string, id: string) => {
      const filteredTodoList = todoList[key].items.filter(
        (todo) => todo.id !== id
      );
      setTodoList((prev) => {
        return {
          ...prev,
          [key]: {
            ...prev[key],
            items: filteredTodoList,
          },
        };
      });

      if (editableData && editableData.element.id === id) {
        setEditableData(null);
      }
    },
    [todoList]
  );

  const filterAndSetSearchData = useCallback(
    (value: string) => {
      if (value.trim().length) {
        const stringOfTodoList = JSON.stringify(todoList);
        const copyOfTodoList = JSON.parse(stringOfTodoList);
        for (let key in copyOfTodoList) {
          const filteredArray = copyOfTodoList[key].items.filter(
            (item: ITodoItem) =>
              item.name.toLowerCase().startsWith(value.toLowerCase())
          );
          copyOfTodoList[key].items = filteredArray;
        }

        setSearchTodoData(copyOfTodoList);
      } else setSearchTodoData(null);
    },
    [todoList]
  );

  const editTodoItem = useCallback(
    (key: string, element: ITodoItem, index: number) => {
      setEditableData({ origin: key, element, index });
    },
    []
  );

  return (
    <div className="App">
      <TodoForm
        addOrUpdateTodo={addOrUpdateTodo}
        filterAndSetSearchData={filterAndSetSearchData}
        editableData={editableData}
      />
      <TodoItemsList
        deleteTodoItem={deleteTodoItem}
        todoList={todoList}
        handleDragEnd={handleDragEnd}
        searchTodoData={searchTodoData}
        editTodoItem={editTodoItem}
      />
    </div>
  );
}

export default App;
