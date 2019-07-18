import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "react-emotion";
import { ExternalLink } from "react-feather";
import Link from "./link";
import "./styles.css";
import config from "../../config";
import { getLangs, activeLang } from "./Switcher.js";

const forcedNavOrder = config.sidebar.forcedNavOrder;
const languages = getLangs();

const Sidebar = styled("aside")`
  width: 100%;
  /* background-color: rgb(245, 247, 249); */
  /* border-right: 1px solid #ede7f3; */
  height: 100vh;
  overflow: auto;
  position: fixed;
  padding-left: 24px;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  top: 0;
  padding-right: 0;
  background-color: #f39933;
  /* Safari 4-5, Chrome 1-9 */
  background: linear-gradient(#f39933, #d94909);
  background: -webkit-gradient(
    linear,
    0% 0%,
    0% 100%,
    from(#f39933),
    to(#d94909)
  );
  /* Safari 5.1, Chrome 10+ */
  background: -webkit-linear-gradient(top, #f39933, #d94909);
  /* Firefox 3.6+ */
  background: -moz-linear-gradient(top, #f39933, #d94909);
  /* IE 10 */
  background: -ms-linear-gradient(top, #f39933, #d94909);
  /* Opera 11.10+ */
  background: -o-linear-gradient(top, #f39933, #d94909);
  @media only screen and (max-width: 767px) {
    padding-left: 0px;
    background-color: #f39933;
    background: #f39933;
  }
  @media (min-width: 767px) and (max-width: 1023px) {
    padding-left: 0;
  }
  @media only screen and (max-width: 1023px) {
    width: 100%;
    position: relative;
    height: auto;
  }
`;

// eslint-disable-next-line no-unused-vars
const ListItem = styled(({ className, active, level, ...props }) => {
  if (level === 0) {
    return (
      <li className={className}>
        <Link {...props} />
      </li>
    );
  } else if (level === 1) {
    const customClass = active ? "active" : "";
    return (
      <li className={"subLevel " + customClass}>
        <Link {...props} />
      </li>
    );
  } else {
    return (
      <li className={className}>
        <Link {...props} />
      </li>
    );
  }
})`
  list-style: none;

  a {
    color: #fff;
    text-decoration: none;
    font-weight: ${({ level }) => (level === 0 ? 700 : 400)};
    padding: 0.45rem 0 0.45rem ${props => 2 + (props.level || 0) * 1}rem;
    display: block;
    position: relative;

    &:hover {
      background-color: #FFFFFF;
    }

    ${props =>
      props.active &&
      `
      color: #000000 !important;
      background-color: #FFFFFF;
    `} // external link icon
    svg {
      float: right;
      margin-right: 1rem;
    }
  }
`;

const Divider = styled(props => (
  <li {...props}>
    <hr />
  </li>
))`
  list-style: none;
  padding: 0.5rem 0;

  hr {
    margin: 0;
    padding: 0;
    border: 0;
    border-bottom: 1px solid #ede7f3;
  }
`;

const SidebarLayout = ({ location }) => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
                title
              }
            }
          }
        }
      }
    `}
    render={({ allMdx }) => {
      const navItems = allMdx.edges
        .map(({ node }) => {
          return { slug: node.fields.slug};
        })
        .filter(item => {
          return (
            item.slug !== "/" && languages.indexOf(item.slug.split("/")[1] < 0)
          );
        })
        .sort()
        .reduce(
          (acc, cur) => {
            if (forcedNavOrder.find(url => url === cur)) {
              return { ...acc, [cur]: [cur] };
            }
            let prefix =cur.slug.replace("/" + activeLang() + "/", "/");
            if (prefix && forcedNavOrder.find(url => url === `${prefix}`)) {
              return { ...acc, [`${cur.slug}`]: [...acc[`${cur.slug}`], cur] };
            } else {
              return { ...acc, items: [...acc.items, cur] };
            }
          },
          { items: [] }
        );
      const nav = forcedNavOrder
        // .reduce((acc, cur) => {
        //   return acc.concat(navItems[cur]);
        // }, [])
        //.concat(navItems.items)
        .map(slug => {
          
          let slugWithLang ="/"+activeLang() + slug;
          const { node } = allMdx.edges.find(({ node }) => {
            return node.fields.slug === slugWithLang;
          });
          let isActive = false;
          if (
            location &&
            (location.pathname === slugWithLang)
          ) {
            isActive = true;
          }
          return (
            <ListItem
              key={node.fields.slug}
              to={`${node.fields.slug}`}
              level={node.fields.slug.split("/").length - 3}
              active={isActive}
            >
              {node.fields.title}
            </ListItem>
          );
        });

      return (
        <Sidebar>
          <ul className={"sideBarUL"}>
            {nav}
            <Divider />
            {config.sidebar.links.map((link, key) => {
              if (link.link !== "" && link.text !== "") {
                return (
                  <ListItem key={key} to={link.link}>
                    {link.text}
                    <ExternalLink size={14} />
                  </ListItem>
                );
              }
            })}
          </ul>
        </Sidebar>
      );
    }}
  />
);

export default SidebarLayout;
