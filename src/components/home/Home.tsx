import DisplayByCategory from "../DisplayByCategory/DisplayByCategory";
import Header from "../header/Header";
import ShareAStory from "../sharestory/ShareAStory";
export default function Home() {
  return (
    <div className="home_container">
      <Header />
      <DisplayByCategory category="Universe" itemToDisplay={20} />
      <DisplayByCategory category="Family" itemToDisplay={20} />
      <DisplayByCategory category="Nature" itemToDisplay={6} flex={true} />
      <DisplayByCategory category="Rebirth" itemToDisplay={20} />
      <DisplayByCategory category="Adventure" itemToDisplay={20} />
      <ShareAStory />
    
    </div>
  );
}
