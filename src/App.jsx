import { useState } from "react";
import { Client } from "@notionhq/client";
import "./App.css";
import { SERVER_ADDR } from "./links";

function App() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = async () => {
    const body = new URLSearchParams();
    body.append("title", title);
    body.append("author", name);
    body.append("content", content);

    fetch(SERVER_ADDR, {
      method: "POST",
      body: body.toString(),
    });
  };

  return (
    <div className="App">
      <div className="content">
        <h1>튜터링 세션 질문</h1>
        <p>
          튜터링 자료 확인:{" "}
          <a href="https://bit.ly/pythonai2022">https://bit.ly/pythonai2022</a>
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
