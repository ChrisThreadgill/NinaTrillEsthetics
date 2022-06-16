import "./HomePageAboutCSS/HomePageAbout.css";
import { useHistory } from "react-router-dom";

function HomePageAbout() {
  const history = useHistory();
  //

  return (
    <div className="home__page__about">
      <h1 className="home__page__about__header">Why we do it!</h1>
      <div className="home__page__about__bio">
        With Hannah and her crew it isn't all about aesthetics as much as it is your comfort. Hannah and her crew are
        extremely passionate about make sure that every client receives the most relaxing experience as possible. They
        take pride in expressing that they have a safe space here at NinaTrill Esthetics. We are here to help you get
        relaxed, make your skin feel great and make you feel better all together. Whether you just need a place to
        decompress for a few hours or you have specific beauty goals set out we can assure you, here at NinaTrill
        Esthetics we will exceed your expectations!
      </div>
      <div className="home__page__about__contact__us">
        <div>
          <h3>Give us a call!</h3>
          <p onClick={() => history.push("/services")} className="home__page__about__services__link">
            Or Book online today!
          </p>
          <p>(479)-301-4455</p>
        </div>
        <div>MAP</div>
      </div>
    </div>
  );
}

export default HomePageAbout;
