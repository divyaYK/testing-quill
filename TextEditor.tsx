import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { Quill } from "react-quill";

const TOOLBAR_OPTIONS = [
  [{ variable: ["{{ firstName }}", "{{ lastName }}"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  ["clean"],
];

const TOOLBAR_FORMATS = [
  "header",
  "list",
  "bullet",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
];

// const VariableButton = () => (
//   <select title="variable" defaultValue={""} onChange={(e) => e.persist()}>
//     <option value="{{ firstName }}">First Name</option>
//     <option value="{{ lastName }}">Second Name</option>
//   </select>
// );

// const CustomToolbar = () => (
//   <div id="toolbar">
//     <select
//       title="header"
//       name="header"
//       defaultValue=""
//       onChange={(e) => e.persist()}
//       className="ql-header"
//     >
//       <option value="1"></option>
//       <option value="2"></option>
//       <option value="3"></option>
//       <option value="4"></option>
//       <option value="5"></option>
//       <option value="6"></option>
//       <option value="false"></option>
//     </select>
//     <button type="button" title="bold" className="ql-bold"></button>
//     <button type="button" title="italic" className="ql-italic"></button>
//     <button type="button" title="variable" className="ql-insertVariable">
//       <VariableButton />
//     </button>
//   </div>
// );

function variable(value: string) {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, value);
  this.quill.setSelection(cursorPosition + value.length);
}

const TextEditor = () => {
  const [editorValue, setEditorValue] = useState("");

  useEffect(() => {
    if (document) {
      const variableDropdown = document.querySelector(
        ".ql-variable .ql-picker-label"
      );
      if (variableDropdown !== null) {
        variableDropdown.textContent = "select variable";
      }
      const variableOptions = document.querySelectorAll(
        ".ql-variable .ql-picker-options .ql-picker-item"
      );
      if (variableOptions.length !== 0) {
        variableOptions.forEach(
          (item) => (item.textContent = item.dataset.value)
        );
      }
    }
  }, []);
  return (
    <div className="text-editor">
      <ReactQuill
        theme="snow"
        formats={TOOLBAR_FORMATS}
        modules={TextEditor.modules}
        value={editorValue}
        onChange={setEditorValue}
      />
    </div>
  );
};

TextEditor.modules = {
  toolbar: {
    container: TOOLBAR_OPTIONS,
    handlers: {
      variable,
    },
  },
};

export default TextEditor;
