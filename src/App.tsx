import { useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { GitInfo } from "./components/GitInfo";

interface IGitInfo {
  title: string;
  count: number;
  error: string;
}

const App = () => {
  const [gitInfo, setGitInfo] = useState<IGitInfo | null>(null);
  return (
    <>
      <h1>Hello</h1>
      <Form setGitInfo={setGitInfo}></Form>
      <GitInfo gitInfo={gitInfo}></GitInfo>
    </>
  );
};
export default App;
