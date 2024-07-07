import React, { Component } from 'react';
import SearchComponent from './SearchComponent';
import ResultsComponent from './ResultsComponent';
import ErrorBoundary from './ErrorBoundary';

interface AppState {
    results: Array<{ id: number; title: string; body: string }>;
    loading: boolean;
}

class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            results: [],
            loading: true,
        };
    }

    componentDidMount() {
        const searchTerm = localStorage.getItem('searchTerm') || '';
        this.fetchResults(searchTerm);
    }

    fetchResults = (searchTerm: string) => {
        this.setState({ loading: true });
        const url = searchTerm 
            ? `https://jsonplaceholder.typicode.com/posts?userId=${searchTerm}` 
            : `https://jsonplaceholder.typicode.com/posts`;
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => this.setState({ results: data, loading: false }))
            .catch(error => {
                console.error('Error fetching data:', error);
                this.setState({ loading: false });
            });
    };

    handleSearch = (searchTerm: string) => {
        localStorage.setItem('searchTerm', searchTerm);
        this.fetchResults(searchTerm.trim());
    };

    render() {
        return (
            <ErrorBoundary>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                    <div style={{ flex: '0 1 auto' }}>
                        <SearchComponent onSearch={this.handleSearch} />
                    </div>
                    <div style={{ flex: '1 1 auto', overflowY: 'auto' }}>
                        {this.state.loading ? (
                            <p>Loading...</p>
                        ) : (
                            <ResultsComponent results={this.state.results} />
                        )}
                    </div>
                </div>
            </ErrorBoundary>
        );
    }
}

export default App;
