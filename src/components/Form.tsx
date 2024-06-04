import React, { useState } from "react";

interface IFormValue {
  type: "user" | "repo";
  value: string;
}

interface IFormProps {
  setGitInfo: (gitInfo: {
    title: string;
    count: number;
    error: string;
  }) => void;
}

interface IRepoResponse {
  name: string;
  stargazers_count: number;
}
interface IUserResponse {
  name: string;
  login: string;
  public_repos: number;
}

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return typeof error === "object" && error !== null && "message" in error;
};

interface ErrorWithMessage {
  documentation_url: number;
  message: string;
}

export const Form: React.FC<IFormProps> = ({ setGitInfo }) => {
  const [formState, setFormState] = useState<IFormValue>({
    type: "user",
    value: "",
  });

  function handleChangeOption(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  async function fetchApi(type: "user" | "repo") {
    if (type === "user") {
      await fetch(`https://api.github.com/users/${formState.value}`)
        .then(async (res) => {
          if (res.ok) {
            return await res.json();
          } else {
            throw await res.json();
          }
        })
        .then((data: IUserResponse) =>
          setGitInfo({
            title: data.name ? data.name : data.login,
            count: data.public_repos,
            error: "",
          })
        )
        .catch((e: unknown) => {
          isErrorWithMessage(e)
            ? setGitInfo({ title: "", count: 0, error: e.message })
            : setGitInfo({ title: "", count: 0, error: "Неизвестная ошибка" });
        });
    } else {
      await fetch(`https://api.github.com/repos/${formState.value}`)
        .then(async (res) => {
          if (res?.ok) {
            return await res.json();
          } else {
            throw await res.json();
          }
        })
        .then((data: IRepoResponse) =>
          setGitInfo({
            title: data.name,
            count: data.stargazers_count,
            error: "",
          })
        )
        .catch((e: unknown) => {
          isErrorWithMessage(e)
            ? setGitInfo({ title: "", count: 0, error: e.message })
            : setGitInfo({ title: "", count: 0, error: "Неизвестная ошибка" });
        });
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetchApi(formState.type);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="type">Тип:</label>
        <select
          id="type"
          name="type"
          value={formState.type}
          onChange={handleChangeOption}
        >
          <option value="user">Пользователь</option>
          <option value="repo">Репозиторий</option>
        </select>
      </div>
      <div>
        <label htmlFor="value">Значение:</label>
        <input
          id="value"
          name="value"
          type="text"
          value={formState.value}
          onChange={handleChangeOption}
        />
      </div>
      <button type="submit">Отправить</button>
    </form>
  );
};
