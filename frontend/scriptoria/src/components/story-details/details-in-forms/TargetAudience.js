import React from 'react';
import { useTranslation } from 'react-i18next';
const options = [
    { label: "Young Adult (13-18 years of age)" },
    { label: "New Adult (18-25 years of age)" },
    { label: "Adult (25+ years of age)" }
];

function TargetAudience(props) {
    const { t } = useTranslation()
    const changeHandler = (event) => {
        props.method(event.target.value)

    }
    return (
        <div className="col-md-3 Target">
            <label className="form-label">{t("StoryDetails.Target")}</label>
            <select id="inputState" className="form-select" onChange={changeHandler} required>
                <option value="" selected disabled>{t("StoryDetails.select_one")}</option>
                {options.map((option, index) => (
                    <option key={index}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}

export default TargetAudience;
