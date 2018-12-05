const helper = {
  getTitle(pathname) {
    const urls = [{ url: "/404", name: "404" }];
    let item = urls.find(v => new RegExp(v.url, "gi").test(pathname));
    return { urls, title: item ? item.name : "WYJ" };
  }
};
export default helper;
