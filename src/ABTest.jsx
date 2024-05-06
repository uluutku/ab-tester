import PropTypes from 'prop-types';
import "./ABTest.css";
import { useState, useEffect , useCallback} from 'react';
import { Typography, Grid, Paper, Card, CardActionArea, IconButton, LinearProgress, Skeleton } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

export default function ABTest({ images, onComplete }) {
    const [imageData, setImageData] = useState(images.map(url => ({
        url,
        health: 100,
        wins: 0,
        losses: 0,
        decisionTimes: []
    })));
    const [currentPair, setCurrentPair] = useState([]);
    const [voteHistory, setVoteHistory] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);

    const pickRandomPair = useCallback(() => {
        setLoading(true);
        setTimeout(() => {
            let activeImages = imageData.filter(img => img.health > 0);
            if (activeImages.length > 1) {
                activeImages.sort(() => 0.5 - Math.random());
                setCurrentPair(activeImages.slice(0, 2));
                setStartTime(Date.now());
            } else {
                onComplete(imageData);
            }
            setLoading(false);
        }, 0); // Added delay to simulate loading
    }, [imageData, onComplete]);

    useEffect(() => {
        pickRandomPair();
    }, [images, pickRandomPair]);

    const handleVote = (winnerIndex) => {
    const endTime = Date.now();
    const decisionTime = endTime - startTime;
    const loserIndex = 1 - winnerIndex;
    const winner = currentPair[winnerIndex];
    const loser = currentPair[loserIndex];

    // Define base points and calculate the multiplier based on decision time
    const basePoints = 10;
    let multiplier;
    if (decisionTime <= 800) { // 3 seconds or less for a strong decision
        multiplier = 3;
    } else if (decisionTime <= 2000) { // Between 3 and 6 seconds for a moderate decision
        multiplier = 1;
    } else { // More than 6 seconds for a weak decision
        multiplier = 0.33;
    }

    // Apply the multiplier to the base points
    const winnerPoints = Math.round(basePoints * multiplier);
    const loserPoints = Math.round(basePoints * multiplier);

    const updatedImageData = imageData.map(img => {
        if (img.url === winner.url) {
            return {
                ...img,
                health: Math.min(img.health + winnerPoints, 100),
                wins: img.wins + 1,
                decisionTimes: [...img.decisionTimes, decisionTime],
                votes: (img.votes || 0) + 1
            };
        } else if (img.url === loser.url) {
            return {
                ...img,
                health: Math.max(img.health - loserPoints, 0), 
                losses: img.losses + 1,
                votes: (img.votes || 0) + 1
            };
        }
        return img;
    });
    setImageData(updatedImageData);

    // Updating vote history to correctly calculate progress
    const newVoteHistory = [...voteHistory, { winner: winner.url, loser: loser.url }];
    setVoteHistory(newVoteHistory);
    updateProgress(newVoteHistory.length);

    pickRandomPair();
};

    const updateProgress = (pairsTested) => {
        const totalPairsPossible = imageData.length * (imageData.length - 1) / 2;
        setProgress((pairsTested / totalPairsPossible) * 100);
    };

    return (
        <Paper elevation={3} className="abtest-container">
            <Typography variant="h5" className="test-heading">Just select the better-looking one between theese.</Typography>
            <LinearProgress variant="determinate" value={progress} className="progress-bar" />
            <Grid container spacing={2}>
                {currentPair.map((item, index) => (
                    <Grid item xs={12} sm={6} key={index} className="grid-item">
                        <Card className="image-card">
                            <CardActionArea onClick={() => handleVote(index)}>
                                {loading ? (
                                    <Skeleton variant="rounded" animation="wave" className="card-skeleton" />
                                ) : (
                                    <img src={item.url} alt={`Image ${index}`} className="image-display" />
                                )}
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <div className="action-buttons">
                <IconButton onClick={() => onComplete(imageData)} className="icon-button" disabled={loading}>
                    <DoneIcon />
                </IconButton>
            </div>
        </Paper>
    );
}

ABTest.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    onComplete: PropTypes.func.isRequired,
};
