import React, { useState } from "react";

export default function SearchBar(props) {
    const [searchInput, setSearchInput] = useState("");

    function handleSearch(e) {
        setSearchInput(e.target.value);
        props.onSearch(searchInput); // Appeler la fonction callback onSearch avec la valeur de recherche
    }

    // Pour pouvoir effacer avec ctrl a + backspace
    function handleKeyDown(e) {
        if (e.key === "Backspace" && e.ctrlKey && searchInput === "") {
            props.onSearch("");
        }
    }

    return (
        <input
                type="text"
                value={searchInput}
                placeholder="Rechercher..."
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
        />
    );
}
