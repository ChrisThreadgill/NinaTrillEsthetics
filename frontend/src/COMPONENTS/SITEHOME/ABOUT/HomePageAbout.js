import "./HomePageAboutCSS/HomePageAbout.css";
import { useHistory } from "react-router-dom";
import { ExternalLink } from "react-external-link";

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
        <div className="home__page__about__phone">
          <h3>Give us a call or</h3>
          <p onClick={() => history.push("/services")} className="home__page__about__services__link">
            Book online today!
          </p>
          <p>(479)-301-4455</p>
        </div>
        <div>
          <iframe
            className="location__map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3220.632315250071!2d-94.16308308430843!3d36.17550101031224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c96ca4baf46027%3A0xaf13ccedaea93eeb!2s1127%20S%20Gutensohn%20Rd%2C%20Springdale%2C%20AR%2072762!5e0!3m2!1sen!2sus!4v1655489562153!5m2!1sen!2sus"
            width="600"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="footer__container__about">
        <div>
          <div>NinaTrill Esthetics LLC</div>
          <span>1127 S Gutensohn Rd, Springdale, AR 72764</span>
          <span>(479) 301-4455</span>
        </div>
        <div>
          <div>Meet the dev</div>

          <ExternalLink className="about__links" href="https://www.linkedin.com/in/chris-threadgill-b05090185/">
            Portfolio
          </ExternalLink>
          <ExternalLink className="about__links" href="https://www.linkedin.com/in/chris-threadgill-b05090185/">
            LinkedIn
          </ExternalLink>
          <ExternalLink className="about__links" href="https://github.com/ChrisThreadgill">
            Github
          </ExternalLink>
        </div>
        <div>
          <div className="tech__used__container">Technologies Used</div>
          <container className="tech__links__div">
            <container className="tech__links__container">
              <label className="technologies__links">JavaScript</label>
              <label className="technologies__links">Express</label>
              <label className="technologies__links">NodeJS</label>
              <label className="technologies__links">Sequelize</label>
              <label className="technologies__links">PostgreSQL</label>
              <label className="technologies__links">Docker</label>
            </container>
            <container className="tech__links__container__right">
              <label className="technologies__links">HTML/CSS</label>
              <label className="technologies__links">React</label>
              <label className="technologies__links">Redux</label>
              <label className="technologies__links">Github</label>
              <label className="technologies__links">YAML</label>
            </container>
          </container>
        </div>
      </div>
    </div>
  );
}

export default HomePageAbout;
