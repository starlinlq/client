import { useEffect } from "react";
import { Story } from "../../app/interfaces";
import { useStore } from "../../app/stores/stores";
import Loading from "../../features/loader/Loading";
import StoryCard from "../storyCard/StoryCard";
import { observer } from "mobx-react-lite";
import { useState } from "react";

function Bookmark() {
  const { user, features } = useStore();
  const [bookmarkData, setBookmarkData] = useState<any>([]);

  useEffect(
    function () {
      if (user.bookmark.length > 0) {
        setBookmarkData(user.handlebookmark());
      }
    },
    [user.bookmark]
  );

  useEffect(
    function () {
      let data = bookmarkData.filter(
        (element: any) => element.id !== features.bookmark
      );
      setBookmarkData(data);
    },
    [features.bookmark]
  );

  return (
    <div className="stories_container bookmark_container">
      {user.loading ? (
        <Loading />
      ) : (
        <>
          <div className="">
            <h3>BOOKMARKED</h3>
          </div>
          <div className="display_stories">
            {bookmarkData.length === 0 ? (
              <h3>No stories bookmarked </h3>
            ) : (
              bookmarkData.map(
                ({
                  story,
                  title,
                  user_name,
                  id,
                  photo_url,
                  created_at,
                  category_title,
                  likes,
                }: Story) => (
                  <StoryCard
                    likes={likes}
                    flex={true}
                    key={id}
                    date={created_at}
                    story={story}
                    title={title}
                    name={user_name}
                    id={id}
                    photo_url={photo_url}
                    category={category_title}
                  />
                )
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default observer(Bookmark);
/*
 */
