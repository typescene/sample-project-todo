import { ViewComponent, JSX, bind, bindf, service } from "typescene";
import TodoService from "../../../services/TodoService";

/** View component that shows the current todo list status */
export default class TodoStatusLine extends ViewComponent.with(
  <flowcell hidden={bind("!todoService.items.count")} padding={{ y: 16 }}>
    <centerrow>
      <label textStyle={{ color: "@text/50%" }}>
        {bindf("${todoService.nRemaining} task#{/s} remaining")}
      </label>
      <linkbutton
        hidden={bind("!todoService.nCompleted")}
        onClick="+RemoveCompleted"
      >
        Remove completed
      </linkbutton>
    </centerrow>
  </flowcell>
) {
  @service("App.Todo")
  todoService!: TodoService;

  /** Event handler: remove all completed items */
  onRemoveCompleted() {
    this.todoService.removeCompleted();
  }
}
