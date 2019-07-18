import React from "react";
import { StaticQuery, graphql } from "gatsby";
import GitHubButton from "react-github-btn";
import Link from "./link";
import "./styles.css";
import Translator from "./Translator"
import Sidebar from "./sidebar";
import Switcher,{activeLang} from "./Switcher.js";
const Header = ({ location }) => (
  <StaticQuery
    query={graphql`
      query headerTitleQuery {
        site {
          siteMetadata {
            githubUrl
            helpUrl
            tweetText
            logo
            headerLinks {
              link
              text
            }
          }
        }
      }
    `}
    render={data => {
      const logoImg = require("./images/logo.svg");
      const twitter = require("./images/twitter.svg");
      const {
        site: {
          siteMetadata: {
            githubUrl,
            helpUrl,
            tweetText,
            logo,
            headerLinks,
            languages
          }
        }
      } = data;
      const homePath="/"+activeLang();
      return (
        <div className={"navBarWrapper"}>
          <nav className={"navbar navbar-default navBarDefault"}>
            <div className={"navbar-header"}>
              <button
                type="button"
                className={"navbar-toggle collapsed navBarToggle"}
                data-toggle="collapse"
                data-target="#navbar"
                aria-expanded="false"
                aria-controls="navbar"
              >
                <span className={"sr-only"}>Toggle navigation</span>
                <span className={"icon-bar"} />
                <span className={"icon-bar"} />
                <span className={"icon-bar"} />
              </button>
              <Link to={homePath} className={"navbar-brand navBarBrand"}>
                {logo !== "" ? (
                  <img className={"img-responsive"} src={logo} alt={"logo"} />
                ) : (
                  <img
                    className={"img-responsive"}
                    src={logoImg}
                    alt={"logo"}
                  />
                )}
                <Translator text="heading"/>
              </Link>
            </div>
            <div
              id="navbar"
              className={"navbar-collapse collapse navBarCollapse"}
            >
              <div className={"visible-xs"}>
                <Sidebar location={location} />
                <hr />
              </div>
              <ul className={"nav navbar-nav navBarUL"}>
                {githubUrl !== "" ? (
                  <li className={"githubBtn"}>
                    <GitHubButton
                      href={githubUrl}
                      data-show-count="true"
                      aria-label="Star on GitHub"
                    >
                      Star
                    </GitHubButton>
                  </li>
                ) : null}
                {helpUrl !== "" ? (
                  <li>
                    <a href={helpUrl}><Translator text="needHelp"/></a>
                  </li>
                ) : null}
              </ul>
              <ul className={"nav navbar-nav navBarUL navbar-right"}>
                <Switcher/>
                {tweetText !== "" ? (
                  <li>
                    <a
                      href={
                        "https://twitter.com/intent/tweet?&text=" + tweetText
                      }
                      target="_blank"
                    >
                      <img
                        className={"twitterIcon"}
                        src={twitter}
                        alt={"Twitter"}
                      />
                    </a>
                  </li>
                ) : null}
                {headerLinks.map((link, key) => {
                  if (link.link !== "" && link.text !== "") {
                    return (
                      <li key={key}>
                        <a href={link.link} target="_blank">
                          {link.text}
                        </a>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </nav>
        </div>
      );
    }}
  />
);

export default Header;
