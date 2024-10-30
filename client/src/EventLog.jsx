import React, { useEffect, useState } from 'react';

const EventLog = () => {
    const [number, setNumber] = useState(null);

    useEffect(() => {
        // Connect to the SSE endpoint
        const eventSource = new EventSource('http://localhost:3000/events');

        // Listen for messages from the server
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setNumber(data.number);
        };

        // Cleanup on component unmount
        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div>
            <h1>Random Number from Server:</h1>
            <p>{number !== null ? number : 'Waiting for data...'}</p>
        </div>
    );
};

export default EventLog;
