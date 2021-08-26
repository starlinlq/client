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
  currentComments: any[] = [];
  creatingComment = false;
  deletingComment = false;
  editingComment = false;
  //pagination
  updatePages: number = 1;
  totalPages: number = 1;
  currentPage: number = 1;
  selectedCategory = "all";
  isLoadingMore = false;

  constructor() {
    makeAutoObservable(this);
  }

  handlePageJump = (page: number) => {
    if (page < 5 && page > 0) {
      this.updatePages = page;
      this.get(page, this.selectedCategory);
    } else if (page >= 5) {
      this.updatePages = page - 4;
      this.get(page, this.selectedCategory);
    }
  };

  paginateLogic(page: number) {
    if (page === 1 && this.updatePages + 4 < this.totalPages) {
      this.updatePages += 1;
    } else if (page === -1 && this.updatePages - 1 > 0) {
      this.updatePages -= 1;
    }
  }

  loadMorelogic = (index: number) => {
    console.log(index);
    this.currentComments = this.comments.slice(0, index);
    console.log(this.currentComments);
  };

  get = async (page: number, category = "all") => {
    this.loading = true;
    try {
      let posts = await agent.story.all(page, category);
      runInAction(() => {
        this.selectedCategory = category;
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
      let data = await agent.story.show(id);
      console.log(data);
      runInAction(() => {
        this.selectedStory = [{ ...data.post[0], profile_photo: data.url }];
        this.comments = data.post[0].comments;
        this.currentComments = data.post[0].comments.slice(0, 10);
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
          this.currentComments.unshift(new_comment);
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
