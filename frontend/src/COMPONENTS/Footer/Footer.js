import "./Footer.css";
import { ExternalLink } from "react-external-link";

function Footer() {
  //

  return (
    <div className="footer__container">
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
  );
}

export default Footer;
