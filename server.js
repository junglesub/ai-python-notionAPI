require("dotenv").config();
const http = require("http");
const qs = require("querystring");
const { URLSearchParams } = require("url");
const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_KEY,
});
const databaseID = process.env.NOTION_DATABASE_ID;

const HEADER = {
  "Content-Type": "text/plain",
  "Access-Control-Allow-Origin": process.env.CORS_ALLOWED,
};
// title, author, content
const server = http.createServer((req, res) => {
  if (req.method !== "POST") {
    res.writeHead(400, HEADER);
    res.end("Invalid Request");
    return;
  }

  let body = "";
  req.on("data", (data) => {
    body += data;
  });

  req.on("end", async () => {
    const data = decodeURI(body.toString());
    const params = new URLSearchParams(data);

    try {
      const response = await notion.pages.create({
        parent: { database_id: databaseID },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: params.get("title") || "질문입니다",
                },
              },
            ],
          },
          상태: {
            select: {
              name: "미답변",
            },
          },
          질문자: {
            rich_text: [
              {
                text: {
                  content: params.get("author") || "익명",
                },
              },
            ],
          },
        },
        children: [
          {
            object: "block",
            type: "paragraph",
            paragraph: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: params.get("content") || "",
                  },
                },
              ],
            },
          },
        ],
      });
      // console.log(response);
      console.log("success!");
      res.writeHead(200, HEADER);
      res.end("Success");
    } catch {
      console.log("This is an error");
      res.writeHead(500, HEADER);
      res.end("Error.");
    }
  });
});

const PORT = process.env.SERVER_PORT || 8080;
server.listen(PORT, () => {
  console.log("Server listening at", PORT);
});
