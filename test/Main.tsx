import * as React from "react";
import { App } from "./App";

interface IProps {
  app: App;
}

export class Main extends React.Component<IProps, {}> {
  public render(): JSX.Element {
    return (
      <>
        <div>hello main</div>
      </>
    );
  }
}
