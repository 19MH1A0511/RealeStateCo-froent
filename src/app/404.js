import React from 'react';
import { useRouter } from 'next/router';
import { GNotFound } from '../components/commons/pagenotfound.page.component';
import appConfig from '../../app.config';

// Initialize app configuration
const AppConfigObject = new appConfig();
const AppConfig = AppConfigObject.getAppConfig();

// Define the NotFound component
function NotFound() {
    const router = useRouter();

    return (
        <div>
            {/* Render the GNotFound component with configuration props */}
            <GNotFound
                configs={{
                    title:  'Page Not Found', // Fallback title
                    description:  'The page you are looking for does not exist.', // Fallback description
                    '404ButtonLabel': 'Go to Home', // Button label
                    navigationURL:  '/', // Fallback URL to home
                    router: router, // Pass the Next.js router object
                    NotFoundImageConfig: {
                        NotfoundImage: '', // Add the image URL here if available
                        NotfoundImageWidth: '200px', // Set the image width
                    },
                    color: 'primary', // Button color
                }}
            />
        </div>
    );
}

export default NotFound;