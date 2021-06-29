import { makeAutoObservable, runInAction } from "mobx";
import { Story } from "../interfaces";
import { agent } from "../api/agent";
import { history } from "../../";

export class PostStore {
  story:
    | {
        title: string;
        photo_url: string;
        name: string;
        story: string;
        id: string;
      }[]
    | any = [];
  comments: object[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  show = async (id: string) => {
    try {
      console.log(id);
      let post = await agent.story.get(id);
      runInAction(() => {
        this.story = [post];
      });
    } catch (error) {}
  };

  create = async (data: Story) => {
    try {
      let d = await agent.story.create({ ...data });
      console.log(d);
    } catch (error) {}
  };
}
