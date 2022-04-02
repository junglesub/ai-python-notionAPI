import { useState } from "react";
import "./App.css";
import { SERVER_ADDR } from "./links";

function App() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = async () => {
    try {
      const body = new URLSearchParams();
      body.append("title", title);
      body.append("author", name);
      body.append("content", content);

      const response = await fetch(SERVER_ADDR, {
        method: "POST",
        body: body.toString(),
      });
      if (response.status === 200) {
        setName("");
        setTitle("");
        setContent("");
        window
          .open(
            "https://jryoo.notion.site/AI-2022-1-8f3dea50f3ac481d9653ba08011ce4e1",
            "_blank"
          )
          .focus();
      } else {
        throw new Error();
      }
    } catch {
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className="App">
      <div className="content">
        <h1>튜터링 세션 질문</h1>
        <p>
          튜터링 자료 확인:{" "}
          <a
            href="https://bit.ly/pythonai2022"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://bit.ly/pythonai2022
          </a>
        </p>
        <div className="form-area">
          <div className="name">
            <b>이름: </b>
            <input
              placeholder="익명"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="title">
            <b>제목: </b>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="question-content">
            <textarea
              name="question-content"
              id="question-content"
              rows="10"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            ></textarea>
          </div>
          <div className="confirm">
            <button onClick={submit}>등록</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
