import { makeAutoObservable, runInAction } from "mobx";
import { Story, Comment, SingleStory } from "../interfaces";
import { agent } from "../api/agent";
import { history } from "../../";
import { GiHeavyThornyTriskelion } from "react-icons/gi";

export class PostStore {
  loading = false;
  editMode = false;
  loadingInitial = false;
  selectedStory: Story[] = [];
  story: Story[] = [];
  comments: any[] = [];
  creatingComment = false;
  deletingComment = false;
  editingComment = false;
  //pagination
  updatePages: number = 1;
  totalPages: number = 1;
  currentPage: number = 1;

  constructor() {
    makeAutoObservable(this);
  }

  paginateLogic(page: number) {
    if (page === 1 && this.updatePages + 4 < this.totalPages) {
      this.updatePages += 1;
    } else if (page === -1 && this.updatePages - 1 > 0) {
      this.updatePages -= 1;
    }
  }

  get = async (page: number) => {
    this.loading = true;
    try {
      let posts = await agent.story.all(page);
      runInAction(() => {
        this.paginateLogic(page);
        console.log(posts);
        this.story = posts.data;
        this.currentPage = posts.meta.current_page;
        console.log(this.currentPage);
        this.totalPages = posts.meta.last_page;
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
      console.log(post);
      runInAction(() => {
        this.selectedStory = [{ ...post.post, profile_photo: post.url }];
        this.comments = post.post.comments;
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

  edit_comment = async (comment: { comment: string; id: string }) => {
    this.editingComment = true;
    try {
      await agent._comments.edit(comment);
      runInAction(() => {
        let updated = this.comments.map((c) => {
          if (c.id === comment.id) {
            c.comment = comment.comment;
          }
          return c;
        });
        this.comments = updated;
        this.editingComment = false;
      });
    } catch (error) {
      console.log(error);
    }
  };
  delete_comment = async (c_id: string) => {
    this.deletingComment = true;

    try {
      await agent._comments.delete(c_id);
      let comments = this.comments.filter((c) => c.id !== c_id);
      this.comments = comments;
      runInAction(() => {
        this.deletingComment = false;
      });
    } catch (error) {
      console.log(error);
    }
  };

  show_category = async (category: string) => {
    this.loading = true;
    try {
      let data = await agent.story.category(category);
      runInAction(() => {
        this.story = data;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
    }
  };
}
