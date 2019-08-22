import {
  CHANGE,
  managedChild,
  ManagedRecord,
  PageViewActivity,
  service,
  UIListCellAdapterEvent,
} from "typescene";
import TodoService, { TodoItem } from "../../services/TodoService";
import view from "./view";

export default class MainActivity extends PageViewActivity.with(view) {
  path = "/";

  @service("App.Todo")
  todoService!: TodoService;

  /** Form context for the 'add a task' text field */
  @managedChild
  formInput = ManagedRecord.create({
    newTask: "",
  });

  // event handlers:

  addTask() {
    this.todoService.addItem(this.formInput.newTask);
    this.formInput.newTask = "";
    this.formInput.emit(CHANGE);
  }

  toggleTask(e: UIListCellAdapterEvent<TodoItem>) {
    if (e.object instanceof TodoItem) {
      e.object.complete = !e.object.complete;
      e.object.emit(CHANGE);
    }
  }

  removeCompleted() {
    this.todoService.removeCompleted();
  }
}
