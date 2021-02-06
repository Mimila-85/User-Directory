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
            icon: "fas fa-sort-up"
        }
    }

    componentDidMount() {
        API.search()
            .then(res => this.setState({ results: res.data.results }))
            .catch(err => console.log(err));
        this.setState({icon: "fas fa-sort-up"}); 
    }

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    sortFunction = (column) => {

        let sortDirection = this.state.sort.direction;
        sortDirection = sortDirection === "desc" ? "asc" : "desc";
        let setIcon = sortDirection === "desc" ? "fas fa-sort-up" : "fas fa-sort-down";
        this.setState({icon: setIcon});
        const sortResult = this.state.results.sort((a,b) => {
            switch (column) {
                case "Name":
                    const nameA = a.name.first.toLowerCase();
                    const nameB = b.name.first.toLowerCase();
                    // nameA is less than nameB by some ordering criterion
                    if (nameA > nameB) return -1;
                    // nameB is less than nameA by some ordering criterion
                    if (nameB > nameA) return 1;
                    // nameA must be equal to nameB
                return 0;
                case "Email":
                    const emailA = a.email.toLowerCase();
                    const emailB = b.email.toLowerCase();
                    // nameA is less than nameB by some ordering criterion
                    if (emailA > emailB) return -1;
                    // nameB is less than nameA by some ordering criterion
                    if (emailB > emailA) return 1;
                    // nameA must be equal to nameB
                return 0;
                case "Phone":
                    const numA = parseInt(a.phone.replace(/[^0-9]/g, ''), 10);
                    const numB = parseInt(b.phone.replace(/[^0-9]/g, ''), 10);
                    //To compare numbers instead of strings, the compare function can subtract b from a. The following function will sort the array in ascending order.
                return numA - numB;
                case "DOB":
                    const dobA = parseInt(a.dob.date.replace(/[^0-9]/g, ''), 10);
                    const dobB = parseInt(b.dob.date.replace(/[^0-9]/g, ''), 10);
                    //To compare numbers instead of strings, the compare function can subtract b from a. The following function will sort the array in ascending order.
                return dobA - dobB;
                default:
                    break;
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
                    subHeading="Click on the arrows to sort each column by ascending or descending or use the search box to narrow your results."
                />
                <SearchForm
                    value={this.state.search}
                    handleInputChange={this.handleInputChange}
                />
                <EmployeeList
                    sortFunction={this.sortFunction}
                    icon={this.state.icon}
                    results={searchResult}
                />
            </div>
        );
    }
}

export default EmployeeContainer;