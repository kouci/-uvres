import React, { useEffect, useRef, useState } from "react";
import {
    Audio,
    Bars,
    BallTriangle,
    Oval,
    MagnifyingGlass,
} from "react-loader-spinner";
import Oeuvre from "./Oeuvre";
import data from "../data.json";

const Oeuvres = () => {
    const [oeuvres, setOeuvres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const defaultOeuvres = {};

                for (const oeuvre of data.oeuvres) {
                    // Check if the period is already added to the defaultOeuvres
                    if (!defaultOeuvres[oeuvre.periode]) {
                        defaultOeuvres[oeuvre.periode] = [];
                    }

                    if (defaultOeuvres[oeuvre.periode].length < 3) {
                        defaultOeuvres[oeuvre.periode].push({ ...oeuvre });
                    }
                }

                // Flatten the defaultOeuvres object into an array
                const flattenedDefaultOeuvres =
                    Object.values(defaultOeuvres).flat();

                setOeuvres(flattenedDefaultOeuvres);
                setIsLoading(false);
            } catch (error) {
                console.error("Erreur lors du chargement des données:", error);
            }
        };

        fetchData();
    }, []);

    console.log("oeuvres", oeuvres);

    return (
        <div className="container">
            {isLoading && (
                <MagnifyingGlass
                    visible={true}
                    height="100"
                    width="100"
                    ariaLabel="magnifying-glass-loading"
                    wrapperStyle={{}}
                    wrapperClass="magnifying-glass-wrapper"
                    glassColor="#c0efff"
                    color="#e15b64"
                />
            )}

            <div className="oeuvres-container">
                {oeuvres?.map((oeuvre) => (
                    <Oeuvre
                        key={oeuvre.id}
                        imageSrc={oeuvre.image}
                        title={oeuvre.titre}
                        dateCreation={oeuvre.date}
                        prix={oeuvre.prix}
                        periode={oeuvre.periode}
                        id={oeuvre.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default Oeuvres;
