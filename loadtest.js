// loadTest.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 100, // Number of virtual users
    duration: '10s', // Duration of the test
};

export default function () {
    // Test the backend API
    const backendUrl = 'http://localhost:3000/api/routine/1'; // Adjust the URL as needed
    const response = http.get(backendUrl);

    check(response, {
        'is status 200': (r) => r.status === 200,
    });

    // Simulate a request to the frontend (if applicable)
    const frontendUrl = 'http://localhost:3001/'; // Adjust the URL as needed
    const frontendResponse = http.get(frontendUrl);

    check(frontendResponse, {
        'frontend is up': (r) => r.status === 200,
    });

    sleep(1); // Wait for 1 second before the next iteration
}