import {
  ActionEvent,
  managedChild,
  PageViewActivity,
  service,
  UIFormContext,
} from "typescene";
import TodoService, { TodoItem } from "../../services/TodoService";
import view from "./view";

export default class MainActivity extends PageViewActivity.with(view) {
  @service("App.Todo")
  todoService!: TodoService;

  /** Form context for the 'add a task' text field */
  @managedChild
  formInput = UIFormContext.create({
    newTask: "",
  });

  /** Event handler: add a task using the current form input */
  onAddTask() {
    let text = this.formInput.get("newTask");
    if (text) {
      this.todoService.addItem(text);
      this.formInput.set("newTask", "");
    }
  }

  /** Event handler: toggle a task */
  onToggleTask(e: ActionEvent<any, TodoItem>) {
    if (e.context instanceof TodoItem) {
      // Note: we update the item object directly here, although of course
      // we could have added a method to the service as well:
      e.context.complete = !e.context.complete;
      e.context.emitChange();
    }
  }
}

MainActivity.autoUpdate(module);
