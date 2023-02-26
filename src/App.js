import {Component, useEffect, useState} from "react";
import './App.css';
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

const App = () => {
    const [searchField, setSearchField] = useState('')
    const [monsters, setMonsters] = useState([]);
    const [filterMonsters, setFilterMonsters] = useState(monsters);


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((users) => setMonsters(users))
    },[])

    useEffect(() => {
        const newFilterdMonsters = monsters.filter((monster) => { return monster.name.toLowerCase().includes(searchField)});
        setFilterMonsters(newFilterdMonsters)
    },[monsters,searchField])


    const onSearchChange = (event) => {
        const searchFieldString = event.target.value.toLowerCase()
        setSearchField(searchFieldString);
    }
    return (<div className="App">
        <h1 className={"app-title"}>Monsters Rolodex</h1>
        <SearchBox
            className="search-box"
            onChangeHandler={onSearchChange}
            placeholder="search monsters"/>
        <CardList monsters={filterMonsters}/>
    </div>)
}

export default App;
