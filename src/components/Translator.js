import React from "react";
import "../components/i18n.js";
import { useTranslation } from "react-i18next";

const Translator = ({ ...props }) =>{
    const { t } = useTranslation();
    return (
    <React.Fragment>{t(props.text)}</React.Fragment>
    );
}
export default Translator;
