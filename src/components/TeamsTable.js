import React from 'react';

function TeamsTable(props) {
    
    // Render the component
    return (
        <div>
            {props.message}
            {props.teams.loading && <p>Loading...</p>} {/* Show loading message */}
            {props.teams.error && <p>Error: {props.teams.error}</p>} {/* Show error message */}
            {props.teams.data && ( /* Render data when available */
                <table>
                    <tbody>
                        <tr>
                            <td>Season:</td>
                            <td>Team:</td>
                            <td>Id:</td>
                        </tr>
                        {Object.keys(props.teams.data).map(key => (
                        <tr key={key}>
                            <td>{props.teams.data[key].season}</td>
                            <td>{props.teams.data[key].name}</td>
                            <td>{props.teams.data[key].id}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default TeamsTable;
