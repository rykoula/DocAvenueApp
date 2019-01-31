import config from "../config/config.dist";

export default {
  async fetchPosts() {
    try {
      let response = await fetch(config.api_url);
      let responseJsonData = await response.json();
      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  }
};
