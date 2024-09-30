export const getWatchedVideos = () => {
    return JSON.parse(localStorage.getItem("watchedVideos") || "[]");
  };
  
export const storeWatchedVideo = (videoId) => {
  let watchedVideos = getWatchedVideos();
  
  watchedVideos = watchedVideos.filter(id => id !== videoId);
  
  watchedVideos.unshift(videoId);

  if (watchedVideos.length > 10) {
    watchedVideos = watchedVideos.slice(0, 10);
  }

  localStorage.setItem("watchedVideos", JSON.stringify(watchedVideos));

};

  