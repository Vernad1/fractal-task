import React from "react";

interface GitInfoProps {
  gitInfo: {
    title: string;
    count: number;
    error: string;
  } | null;
}

export const GitInfo: React.FC<GitInfoProps> = ({ gitInfo }) => {
  return (
    <>
      {gitInfo ? (
        !gitInfo.error ? (
          <div>
            name:{gitInfo.title}, count:{gitInfo.count}
          </div>
        ) : (
          <div>{gitInfo.error}</div>
        )
      ) : null}
    </>
  );
};
