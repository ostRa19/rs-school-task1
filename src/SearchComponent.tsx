import React, { Component } from 'react';

interface SearchProps {
    onSearch: (searchTerm: string) => void;
}

interface SearchState {
    searchTerm: string;
}

class SearchComponent extends Component<SearchProps, SearchState> {
    constructor(props: SearchProps) {
        super(props);
        const savedSearchTerm = localStorage.getItem('searchTerm') || '';
        this.state = {
            searchTerm: savedSearchTerm,
        };
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchTerm: event.target.value });
    };

    handleSearch = () => {
        this.props.onSearch(this.state.searchTerm);
    };

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.searchTerm}
                    onChange={this.handleChange}
                />
                <button onClick={this.handleSearch}>Search</button>
            </div>
        );
    }
}

export default SearchComponent;
