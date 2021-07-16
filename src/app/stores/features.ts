import { makeAutoObservable, runInAction } from "mobx";
import { agent } from "../api/agent";

class Features {
  loading = false;
  url: string | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  set_image_url(url: string) {}

  async upload_image(image: File) {
    this.set_loading(true);
    const newForm = new FormData();
    newForm.append("image", image);
    let img = await agent.story.upload(newForm);
    if (img) {
      console.log(img);
      this.set_loading(false);
    } else {
      this.set_loading(false);
    }
  }

  set_loading(b: boolean) {
    this.loading = b;
  }
}

export default Features;