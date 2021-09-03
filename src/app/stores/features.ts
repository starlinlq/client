import { makeAutoObservable, runInAction } from "mobx";
import { agent } from "../api/agent";

class Features {
  loading = false;
  url: string = "";
  currentPage: number = 1;
  bookmark: number = 0;
  searhResult: { data: any[]; type: string; active: boolean } = {
    data: [],
    type: "",
    active: false,
  };
  constructor() {
    makeAutoObservable(this);
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  setSearchData(data: any) {
    this.searhResult = data;
  }

  set_image_url(url: string) {}

  handlebookmark = (n: number) => {
    console.log(n);
    this.bookmark = n;
  };

  async upload_image(image: File) {
    this.set_loading(true);
    const newForm = new FormData();
    newForm.append("image", image);
    let img = await agent.features.upload(newForm);
    if (img) {
      this.set_url(img.url);
      this.set_loading(false);
    } else {
      this.set_loading(false);
    }
  }

  set_url(url: string) {
    this.url = url;
  }

  set_loading(b: boolean) {
    this.loading = b;
  }
}

export default Features;
