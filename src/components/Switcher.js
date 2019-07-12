import React from "react";
import i18n from "i18next";
import { Link } from "gatsby";
import { navigate } from "gatsby";

const languages = Object.keys(i18n.services.resourceStore.data);
export default () => (
  <React.Fragment>
    {languages.map(lang => {
        // let path=(location.pathname.indexOf("/"+lang+"/")<0 && lang!=="en") ? "/"+lang+location.pathname : let let originalPath=location.pathname.replace("/"+lang+"/","");
        
        let regex = new RegExp('\/es[\/]?', "");
        let path=location.pathname.replace(regex,"/");
        if(lang!="en" && path!="/es"){
            path="/"+lang+((path=="/") ? "" : path);
        }
        console.log(path);
      return (
        <li key={lang}>
          <Link to={path} path={path} lang={lang} onClick={(e)=>{
              i18n.changeLanguage(e.currentTarget.lang,(destination)=>{
                  //console.log(destination);
                  //navigate(e.currentTarget.to);
                });
              }}>
            {lang}
          </Link>
        </li>
      );
    })}
  </React.Fragment>
);

export const getLangs=()=> languages;
export const activeLang=()=> i18n.language;