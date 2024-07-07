import React, { Component } from 'react';

interface ResultsProps {
    results: Array<{ id: number; title: string; body: string }>;
}

class ResultsComponent extends Component<ResultsProps> {
    render() {
        return (
            <div>
                {this.props.results.map((result, index) => (
                    <div key={index}>
                        <h2>{result.title}</h2>
                        <p>{result.body}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default ResultsComponent;
