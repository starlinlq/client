import { makeAutoObservable, runInAction } from "mobx";
import { Story, Comment } from "../interfaces";
import { agent } from "../api/agent";
import { history } from "../../";

export class PostStore {
  loading = false;
  editMode = false;
  loadingInitial = false;
  selectedStory: Story[] = [];
  story: Story[] = [];
  comments: any[] = [];
  creatingComment = false;
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
      console.log(post.comments);
      runInAction(() => {
        this.selectedStory = [post];
        this.comments = post.comments;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  create = async (data: any) => {
    this.loading = true;

    try {
      let story = await agent.story.create({ ...data });

      runInAction(() => {
        this.selectedStory = [story];
        this.loading = false;
        history.push(`/story/${story.id}`);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  create_comment = async (comment: { comment: string }) => {
    this.creatingComment = true;
    try {
      let story_id = this.selectedStory[0].id;
      if (story_id) {
        let new_comment = await agent._comments.create({
          ...comment,
          story_id,
        });
        runInAction(() => {
          this.comments.unshift(new_comment);
          this.creatingComment = false;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}
