import React, { Component } from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import styled, { injectGlobal } from "react-emotion";
import { Layout, Link } from "$components";
import NextPrevious from '../components/NextPrevious';
import '../components/styles.css';
import config from '../../config';
import { getLangs, activeLang } from "../components/Switcher.js";
import { navigate } from 'gatsby';

const forcedNavOrder = config.sidebar.forcedNavOrder;
const languages = getLangs();


injectGlobal`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      "Roboto",
      "Roboto Light",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      sans-serif,
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol";

    font-size: 16px;
  }

  a {
    transition: color 0.15s;
    color: #663399;
  }
`;

const Edit = styled('div')`
  padding: 1rem 1.5rem;
  text-align: right;

  a {
    font-size: 14px;
    font-weight: 500;
    line-height: 1em;
    text-decoration: none;
    color: #555;
    border: 1px solid rgb(211, 220, 228);
    cursor: pointer;
    border-radius: 3px;
    transition: all 0.2s ease-out 0s;
    text-decoration: none;
    color: rgb(36, 42, 49);
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(116, 129, 141, 0.1) 0px 1px 1px 0px;
    height: 30px;
    padding: 5px 16px;
    &:hover {
      background-color: rgb(245, 247, 249);
    }
  }
`;

export default class MDXRuntimeTest extends Component {
  
  render() {
    //navigate to another index depending of the lang
    if(document.location.pathname=="/" && languages.indexOf(activeLang())>-1){
      navigate("/"+activeLang());
    }   
    const { data } = this.props;
    const {
      allMdx,
      mdx,
      site: {
        siteMetadata: { docsLocation, title }
      }
    } = data;
    const gitHub = require('../components/images/github.svg');

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
      // .concat(navItems.items)
      .map(slug => {
        let slugWithLang ="/"+activeLang() + slug;
          const { node } = allMdx.edges.find(({ node }) => {
            return node.fields.slug === slugWithLang;
          });

        return { title: node.fields.title, url: node.fields.slug };
      });

    // meta tags
    const metaTitle = mdx.frontmatter.metaTitle;
    const metaDescription = mdx.frontmatter.metaDescription;
    let canonicalUrl = config.gatsby.siteUrl;
    canonicalUrl = config.gatsby.pathPrefix !== '/' ? canonicalUrl + config.gatsby.pathPrefix : canonicalUrl; 
    canonicalUrl = canonicalUrl + mdx.fields.slug;

    return (
      <Layout {...this.props}>
        <Helmet>
          {metaTitle ? <title>{metaTitle}</title> : null }
          {metaTitle ? <meta name="title" content={metaTitle} /> : null}
          {metaDescription ? <meta name="description" content={metaDescription} /> : null}
          {metaTitle ? <meta property="og:title" content={metaTitle} /> : null}
          {metaDescription ? <meta property="og:description" content={metaDescription} /> : null}
          {metaTitle ? <meta property="twitter:title" content={metaTitle} /> : null}
          {metaDescription ? <meta property="twitter:description" content={metaDescription} /> : null}
          <link rel="canonical" href={canonicalUrl} />
        </Helmet>
        <div className={'titleWrapper'}>
          <h1 className={'title'}>
            {mdx.fields.title}
          </h1>
          <Edit className={'mobileView'}>
            <Link className={'gitBtn'} to={`${docsLocation}/${mdx.parent.relativePath}`}>
              <img src={gitHub} alt={'Github logo'} /> Edit on GitHub
            </Link>
          </Edit>
        </div>
        <div className={'mainWrapper'}>
          <MDXRenderer>{mdx.code.body}</MDXRenderer>
        </div>
        <div className={'addPaddTopBottom'}>
          <NextPrevious mdx={mdx} nav={nav} />
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
        docsLocation
      }
    }
    mdx(fields: { id: { eq: $id } }) {
      fields {
        id
        title
        slug
      }
      code {
        body
      }
      tableOfContents
      parent {
        ... on File {
          relativePath
        }
      }
      frontmatter {
        metaTitle
        metaDescription
      }
    }
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
`;
