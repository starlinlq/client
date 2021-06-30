import { makeAutoObservable, runInAction } from "mobx";
import { Story } from "../interfaces";
import { agent } from "../api/agent";
import { history } from "../../";

export class PostStore {
  loading = false;
  editMode = false;
  loadingInitial = false;
  selectedStory: Story[] = [];
  story: Story[] = [];
  comments: object[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  get = async () => {
    this.loading = true;
    try {
      let data = await agent.story.all();
      runInAction(() => {
        this.story = data;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  show = async (id: string) => {
    this.loading = true;
    try {
      let post = await agent.story.show(id);
      runInAction(() => {
        this.selectedStory = [post];
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  create = async (data: Story) => {
    this.loading = true;
    try {
      let story = await agent.story.create({ ...data });
      runInAction(() => {
        this.selectedStory = [story];
        this.loading = false;
        history.push(`/story/${story.id}`);
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
