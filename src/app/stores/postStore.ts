import { makeAutoObservable, runInAction } from "mobx";
import { Story } from "../interfaces";
import { agent } from "../api/agent";
import { history } from "../../";

export class PostStore {
  story = null;
  comments: object[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  create = async (data: Story) => {
    let d = await agent.story.create({ ...data });
    console.log(d);
  };
}
