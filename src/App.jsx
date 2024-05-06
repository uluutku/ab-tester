import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import UploadImages from './UploadImages';
import ABTest from './ABTest';
import Report from './Report';
import './App.css';

export default function App() {
    const [images, setImages] = useState([]);
    const [results, setResults] = useState([]);
    const [stage, setStage] = useState('upload');

    const handleImageUpload = (uploadedImages) => {
        setImages(uploadedImages);
        setStage('test');
    };

    const handleTestComplete = (testResults) => {
        setResults(testResults);
        setStage('report');
    };

    const resetTest = () => {
        setImages([]);
        setResults([]);
        setStage('upload');
    };

    const renderContent = () => {
        switch (stage) {
            case 'upload':
                return <UploadImages onImagesUploaded={handleImageUpload} />;
            case 'test':
                if (images.length > 1) {
                    return <ABTest images={images} onComplete={handleTestComplete} />;
                } else {
                    alert('Please conjure more images to begin the magical testing.');
                    setStage('upload');
                    return null;
                }
            case 'report':
                return <Report imageData={results} onReset={resetTest} />;
            default:
                return <Typography variant="h6">Something mystical went wrong...</Typography>;
        }
    };

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" gutterBottom className="app-title">
                Magical Picture A/B Tester
            </Typography>
            {renderContent()}
        </Container>
    );
}
