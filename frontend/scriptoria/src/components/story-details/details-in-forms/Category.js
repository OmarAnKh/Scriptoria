import React from 'react';
import { useTranslation } from 'react-i18next';
const options = [
    { label: "Action", value: "Action" },
    { label: "Adventure", value: "Adventure" },
    { label: "ChickLit", value: "ChickLit" },
    { label: "Fanfiction", value: "Fanfiction" },
    { label: "Fantasy", value: "Fantasy" },
    { label: "General", value: "General Fiction" },
    { label: "Historical", value: "Historical Fiction" },
    { label: "Horror", value: "Horror" },
    { label: "Humor", value: "Humor" },
    { label: "Mystery", value: "Mystery" },
    { label: "Paranormal", value: "Paranormal" },
    { label: "Poetry", value: "Poetry" },
    { label: "Random", value: "Random" },
    { label: "Romance", value: "Romance" },
    { label: "Science", value: "Science Fiction" },
    { label: "Short-Story", value: "Short Story" },
    { label: "Spiritual", value: "Spiritual" },
    { label: "Vampire", value: "Vampire" },
    { label: "Werewolf", value: "Werewolf" }
];

function Category(props) {
    const { t } = useTranslation()
    const changeHandler = (event) => {
        props.method(event.target.value)

    }
    return (
        <div className="col-md-3 Category">
            <label className="form-label">{t("StoryDetails.category")}</label>
            <select id="inputState" className="form-select" onChange={props.handleChange} required>
                <option value="" selected disabled>{t("StoryDetails.select")}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
            <div>
                {props.displayCategorys()}
            </div>
        </div>
    );
}
export default Category;
