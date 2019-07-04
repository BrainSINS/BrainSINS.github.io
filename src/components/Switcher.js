import React from "react";
import i18n from "i18next";

const languages = Object.keys(i18n.services.resourceStore.data);
export default () => (
  <React.Fragment>
    {languages.map(lang => {
      return (
        <li key={lang}>
          <a href="#" lang={lang} onClick={(e)=>{
              i18n.changeLanguage(e.currentTarget.lang);
              }}>
            {lang}
          </a>
        </li>
      );
    })}
  </React.Fragment>
);

export const getLangs=()=> languages;
export const activeLang=()=> i18n.language;