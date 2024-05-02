import { useState, useEffect, useId } from "react";
import Comment from "./Comment";
import Heart from "./Heart";
import Plus from "./Plus";
import Rates from "./Rates";
import Share from "./Share";
import { findAccount } from "../../../api/accountApi";
import useAuth from "../../../hooks/useAuth";
import { useTranslation } from 'react-i18next';

const Icons = ({ data, id, setData }) => {

    const { t } = useTranslation();

    return (
        <div className='icons my-2 mx-5 d-flex gap-1 justify-content-center align-items-center' style={{ display: 'flex', alignItems: 'center', borderRadius: '10px' }}>
            <Heart className="icons-header" num={data?.likes} storyId={id} setData={setData} t={t}/>
            <Comment className="icons-header" id={id} t={t}/>
            <Rates className="icons-header" id={id} t={t}/>
            <Plus className="icons-header" id={id} t={t}/>
            <Share className="icons-header" t={t}/>
        </div>
    );
}

export default Icons;