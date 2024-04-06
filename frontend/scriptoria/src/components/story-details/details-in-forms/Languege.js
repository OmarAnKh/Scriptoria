import React from 'react';

const options = [
  { label: "English" },
  { label: "Français" },
  { label: "Italiano" },
  { label: "Deutsch" },
  { label: "Español" },
  { label: "Português" },
  { label: "Català" },
  { label: "Tiếng Việt" },
  { label: "Filipino" },
  { label: "Bahasa Indonesia" },
  { label: "Bahasa Melayu" },
  { label: "ภาษาไทย" },
  { label: "Русский" },
  { label: "Română" },
  { label: "Türkçe" },
  { label: "Česky" },
  { label: "Polski" },
  { label: "Magyar" },
  { label: "ελληνικά" },
  { label: "Eesti" },
  { label: "Latviešu" },
  { label: "Lietuvių" },
  { label: "Босански" },
  { label: "Српски" },
  { label: "Hrvatski" },
  { label: "Български" },
  { label: "Slovenčina" },
  { label: "Slovenščina" },
  { label: "Беларускі" },
  { label: "Українська" },
  { label: "Svenska" },
  { label: "Norsk" },
  { label: "Suomi" },
  { label: "Dansk" },
  { label: "Nederlands" },
  { label: "Íslenska" },
  { label: "简体中文" },
  { label: "繁體中文" },
  { label: "日本語" },
  { label: "한국어" },
  { label: "العربية" },
  { label: "ગુજરાતી" },
  { label: "עברית" },
  { label: "हिन्दी" },
  { label: "മലയാളം" },
  { label: "ଓଡ଼ିଆ" },
  { label: "فارسی" },
  { label: "ਪੰਜਾਬੀ" },
  { label: "অসমীয়া" },
  { label: "বাংলা" },
  { label: "தமிழ்" },
  { label: "Kiswahili" },
  { label: "Afrikaans" },
  { label: "मराठी" },
  { label: "Other" }
];


const Language = (props) => {
    const changeHandler = (event) => {
        props.method(event.target.value)
    
    }
    return (
        <div className="col-4 languege">
            <label className="form-label">Language</label>
            <select id="inputState" className="form-select" onChange={changeHandler} required>
                <option value="" selected disabled>select one</option>
                {options.map((option,index) => (
                    <option  key={index}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}

export default Language;
