import "./SearchResults.css"
import Book from "./Book.js"
import ActionButton from "./IntractButton.js";
import React from 'react';

const SearchResultsPage = () => {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className="row">
                <div className="col text-center">
                    <div className="Search-container">
                        <div className="bookFrame">
                            <div className="BookCard">
                                <Book img="https://media.discordapp.net/attachments/1101950978435055726/1219311866870890546/image.png?ex=6614122a&is=66019d2a&hm=7dce18d9d23a245464b7a9177ade49287d5f6cd789a247e5721913ed847710bb&=&format=webp&quality=lossless&width=349&height=350" />
                                <div className='info-container'>
                                    <h1 className="">Soul</h1>
                                    <h6>By ahmad iyrot</h6>
                                    <br />
                                    <div className="nexteach">
                                        <p>
                                            A vida que Kim e Krickitt Carpenter conheciam mudou completamente no dia 24 de novembro de 1993, dois meses após o seu casamento, quando a traseira do seu carro foi atingida por uma caminhonete que transitava em alta velocidade. Um ferimento sério na cabeça deixou Krickitt em coma por várias semanas. Quando finalmente despertou, parte da sua memória estava comprometida e ela não conseguia se lembrar de seu marido. Ela não fazia a menor ideia de quem ele era. Essencialmente, a "Krickitt" com quem Kim havia se casado morreu no acidente, e naquele momento ele precisava reconquistar a mulher que amava.
                                        </p>
                                        <div className="buttonflex">
                                            <ActionButton
                                                label="Read"
                                                className="intractButton thebtn"
                                                path1="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 16 16"
                                            />
                                            <ActionButton
                                                label="Listen"
                                                className="intractButton thebtn"
                                                path1="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"
                                                path2="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"
                                                path3="M10.025 8a4.5 4.5 0 0 1-1.318 3.182L8 10.475A3.5 3.5 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.5 4.5 0 0 1 10.025 8M7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 16 16"
                                            />
                                        </div>
                                        <div className="StarRate"><i className="bi bi-star color"></i>2.3</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultsPage;