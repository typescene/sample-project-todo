import { JSX, bind, UIStyle, UIColor } from "typescene";
import TodoStatusLine from "./view/TodoStatusLine";

// Use a style group to contain some styles separately from the view:
const styles = UIStyle.group({
  form: {
    decoration: {
      padding: { x: 16, y: 8 },
      borderColor: "@separator",
      borderThickness: 1,
    },
  },
  completedItem: {
    textStyle: { strikeThrough: true, color: UIColor.Text.alpha(0.5) },
  },
});

export default (
  <scrollcontainer>
    <flowcell
      dimensions={{ width: 640, maxWidth: "100vw" }}
      position={{ gravity: "center" }}
      padding={{ top: 32, x: 16 }}
      revealTransition="fade"
    >
      {/* --- page heading: */}
      <row>
        <label icon="check" iconSize={40} iconColor="@green" />
        <h1>Todo</h1>
      </row>
      <spacer height={32} />

      {/* --- new task input form: */}
      <form style={styles.form} formContext={bind("formInput")}>
        <row>
          <borderlesstextfield
            name="newTask"
            placeholder="Enter a task..."
            onEnterKeyPress="+AddTask"
            requestFocus
          />
          <borderlessbutton label="Add" onClick="+AddTask" />
        </row>
      </form>
      <spacer dimensions={{ height: 16 }} />

      {/* --- Items list: */}
      <list items={bind("todoService.items")}>
        {/* --- 1. List item template: */}
        <listcell padding={{ x: 16, y: 8 }} revealTransition="down">
          <row>
            <toggle state={bind("object.complete")} onChange="+ToggleTask" />
            <expandedlabel
              style={bind("object.complete").then(styles.completedItem)}
              onClick="+ToggleTask"
            >
              {bind("object.text")}
            </expandedlabel>
          </row>
        </listcell>

        {/* --- 2. List container: */}
        <closecolumn
          layout={{ separator: { lineThickness: 1 } }}
          animatedContentRenderingDuration={200}
        />

        {/* --- 3. Footer ('book end'), hidden if the list is empty: */}
        <TodoStatusLine />
      </list>
    </flowcell>
  </scrollcontainer>
);
