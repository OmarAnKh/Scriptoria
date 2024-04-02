import "./SearchResults.css"
import Book from "./Book.js"
import Card from "./Card.js";
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
                                <Card
                                description="A vida que Kim e Krickitt Carpenter conheciam mudou completamente no dia 24 de novembro de 1993, dois meses após o seu casamento, quando a traseira do seu carro foi atingida por uma caminhonete que transitava em alta velocidade. Um ferimento sério na cabeça deixou Krickitt em coma por várias semanas. Quando finalmente despertou, parte da sua memória estava comprometida e ela não conseguia se lembrar de seu marido. Ela não fazia a menor ideia de quem ele era. Essencialmente, a Krickitt com quem Kim havia se casado morreu no acidente, e naquele momento ele precisava reconquistar a mulher que amava"
                                name="Soul"
                                auther="Ahmad iyrot"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultsPage;