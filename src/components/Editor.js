import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';

function Editor({ title, onTitleChange, content, onContentChange }) {
  return (
    <div className="editor-wrapper">
      <div className="editor-group">
        <label className="editor-label">제목</label>
        <input
          type="text"
          placeholder="글제목"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="editor-title-input"
        />
      </div>

      <div className="editor-group">
        <ReactQuill
          value={content}
          onChange={onContentChange}
          placeholder="내용을 입력해주세요..."
          className="custom-quill"
        />
      </div>
    </div>
  );
}

export default Editor;