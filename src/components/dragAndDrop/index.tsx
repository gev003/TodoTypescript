import classNames from "classnames";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ElementFlags } from "typescript";
import DeleteIconSvg from "../../icons/deleteIcon";
import EditingIcon from "../../icons/editingSvgIcon";
import { ITodoList } from "../../types/types";
import styles from "./index.module.scss";

type IProps = {
  todoList: ITodoList;
  handleDragEnd: any;
  deleteTodoItem: (key: string, id: string) => void;
  searchTodoData: null | ITodoList;
  editTodoItem: (key: any, el: any, index: number) => void;
};

const TodoItemsList = ({
  todoList,
  handleDragEnd,
  deleteTodoItem,
  searchTodoData,
  editTodoItem,
}: IProps) => (
  <div className={styles.dragAndDropContainer}>
    <DragDropContext onDragEnd={handleDragEnd}>
      {Object.entries(searchTodoData || todoList).map(([key, data]) => (
        <div key={key} className={styles.column}>
          <h3>{data.title}</h3>
          <Droppable droppableId={key}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.droppableCol}
              >
                {data.items.map((el, index) => (
                  <Draggable key={el.id} index={index} draggableId={el.id}>
                    {(provided, snapshot) => (
                      <div
                        className={classNames(
                          styles.item,
                          snapshot.isDragging && styles.dragging
                        )}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p className={styles.title}>{el.name}</p>
                        <p className={styles.description}>{el.description}</p>
                        <EditingIcon
                          onClick={() => editTodoItem(key, el, index)}
                          className={styles.icon}
                        />
                        <DeleteIconSvg
                          onClick={() => deleteTodoItem(key, el.id)}
                          className={styles.icon}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      ))}
    </DragDropContext>
  </div>
);

export default TodoItemsList;
