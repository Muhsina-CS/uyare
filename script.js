// Mental Health App Main JavaScript File

// User Authentication Module
const AuthModule = {
    currentUser: null,
    
    login: function(email, password) {
        // Simulated login logic
        if (email && password) {
            this.currentUser = { email: email };
            this.redirectToDashboard();
            return true;
        }
        return false;
    },
    
    signup: function(userData) {
        // Simulated signup logic
        if (userData.email && userData.password) {
            this.currentUser = userData;
            this.redirectToDashboard();
            return true;
        }
        return false;
    },
    
    redirectToDashboard: function() {
        // Hide all sections
        ['login-page', 'signup-page'].forEach(id => {
            document.getElementById(id).style.display = 'none';
        });
        
        // Show dashboard
        document.getElementById('dashboard').style.display = 'block';
    }
};

// Mood Tracking Module
const MoodTrackingModule = {
    moodHistory: [],
    
    setMood: function(mood) {
        const moodEntry = {
            date: new Date(),
            mood: mood
        };
        
        this.moodHistory.push(moodEntry);
        this.updateMoodChart();
        this.provideMoodInsights(mood);
    },
    
    updateMoodChart: function() {
        // Update mood tracking chart
        const ctx = document.getElementById('mood-chart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.moodHistory.map(entry => entry.date.toLocaleDateString()),
                datasets: [{
                    label: 'Mood Trends',
                    data: this.moodHistory.map(entry => this.getMoodScore(entry.mood)),
                    borderColor: 'blue',
                    tension: 0.1
                }]
            }
        });
    },
    
    getMoodScore: function(mood) {
        const moodScores = {
            'happy': 5,
            'neutral': 3,
            'sad': 1,
            'anxious': 2
        };
        return moodScores[mood] || 3;
    },
    
    provideMoodInsights: function(mood) {
        const suggestions = {
            'happy': ['Maintain this positive energy!', 'Share your joy with others'],
            'neutral': ['Try some relaxation techniques', 'Engage in a hobby'],
            'sad': ['Practice self-care', 'Reach out to a friend'],
            'anxious': ['Try deep breathing', 'Consider meditation']
        };
        
        const suggestionList = document.getElementById('mood-suggestions');
        suggestionList.innerHTML = suggestions[mood]
            .map(suggestion => `<li>${suggestion}</li>`)
            .join('');
    }
};

// Wellness Resources Module
const WellnessModule = {
    musicPlaylists: [
        { name: 'Calm Sounds', url: 'calm-playlist.mp3' },
        { name: 'Nature Sounds', url: 'nature-sounds.mp3' }
    ],
    
    yogaVideos: [
        { name: '10 Min Calm', url: 'calm-yoga.mp4' },
        { name: 'Breathing Exercise', url: 'breathing-exercise.mp4' }
    ],
    
    motivationalStories: [
        "Overcoming personal challenges through resilience.",
        "Finding inner strength during difficult times.",
        "Transforming life through positive mindset."
    ],
    
    playMusic: function(playlistName) {
        const playlist = this.musicPlaylists.find(p => p.name === playlistName);
        if (playlist) {
            const audioPlayer = document.querySelector('audio');
            audioPlayer.src = playlist.url;
            audioPlayer.play();
        }
    },
    
    playYogaVideo: function(videoName) {
        const video = this.yogaVideos.find(v => v.name === videoName);
        if (video) {
            const videoPlayer = document.querySelector('video');
            videoPlayer.src = video.url;
            videoPlayer.play();
        }
    },
    
    generateStory: function() {
        const randomStory = this.motivationalStories[
            Math.floor(Math.random() * this.motivationalStories.length)
        ];
        document.getElementById('story-content').textContent = randomStory;
    }
};

// Counseling Module
const CounselingModule = {
    counselors: [
        {
            name: 'Dr. Emily Johnson',
            experience: 12,
            specialization: 'Anxiety & Depression',
            availability: {
                videoCall: true,
                liveChat: true
            }
        },
        {
            name: 'Dr. Michael Lee',
            experience: 8,
            specialization: 'Stress Management',
            availability: {
                videoCall: true,
                liveChat: true
            }
        }
    ],
    
    bookConsultation: function(counselorName, consultationType) {
        const counselor = this.counselors.find(c => c.name === counselorName);
        
        if (counselor && counselor.availability[consultationType]) {
            alert(`Booking ${consultationType} with ${counselorName}`);
            // Implement actual booking logic
        } else {
            alert('Consultation not available');
        }
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Login Form Submission
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        const password = e.target.querySelector('input[type="password"]').value;
        AuthModule.login(email, password);
    });
});