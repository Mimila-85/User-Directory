import React, { Component } from "react";
import SearchForm from "./SearchForm";
import API from "../utils/API";
import Jumbotron from "./Jumbotron";
import EmployeeList from "./EmployeeList";

class EmployeeContainer extends Component {

    state = {
        search: "",
        results: [],
        sort: {
            column: null,
            direction: "desc",
            icon: "fas fa-sort-alpha-down-alt"
        }
    }

    componentDidMount() {
        API.search()
            .then(res => this.setState({ results: res.data.results }))
            .catch(err => console.log(err));
        this.setState({icon: "fas fa-sort-alpha-down-alt"}); 
    }

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    sortName = (column) => {
        let sortDirection = this.state.sort.direction;
        sortDirection = sortDirection === "desc" ? "asc" : "desc";
        let setIcon = sortDirection === "desc" ? "fas fa-sort-alpha-down-alt" : "fas fa-sort-alpha-down";
        this.setState({icon: setIcon});
        const sortResult = this.state.results.sort((a,b) => {
            if (column === "Name"){
                const nameA = a.name.first.toLowerCase();
                const nameB = b.name.first.toLowerCase();
                // nameA is less than nameB by some ordering criterion
                if (nameA > nameB) return -1;
                // nameB is less than nameA by some ordering criterion
                if (nameB > nameA) return 1;
                // nameA must be equal to nameB
                return 0;
            }
        });
        if (sortDirection === "desc"){
            sortResult.reverse();
        }
        this.setState({
            results: sortResult,
            sort: {
                column: column,
                direction: sortDirection,
            }
        })
    }

    render() {
        const lowercasedSearch = this.state.search.toLowerCase();
        const searchResult = this.state.results.filter(name => name.name.first.concat(name.name.last).toLocaleLowerCase().includes(lowercasedSearch));
        return (
            <div>
                <Jumbotron
                    heading="Employee Directory"
                    subHeading="Click on the column Name to Sort Names by Ascending or Descending or use the search box to narrow your results."
                />
                <SearchForm
                    value={this.state.search}
                    handleInputChange={this.handleInputChange}
                />
                <EmployeeList
                    sortName={this.sortName}
                    icon={this.state.icon}
                    results={searchResult}
                />
            </div>
        );
    }
}

export default EmployeeContainer;