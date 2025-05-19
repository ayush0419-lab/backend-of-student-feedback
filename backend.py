from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import uuid

app = Flask(__name__)
CORS(app)

# Download NLTK data
nltk.download('vader_lexicon')
sid = SentimentIntensityAnalyzer()

# In-memory storage
feedback = []

@app.route('/feedback', methods=['POST'])
def submit_feedback():
    data = request.json
    
    # Analyze sentiment
    scores = sid.polarity_scores(data['comment'])
    sentiment = 'positive' if scores['compound'] > 0.05 else 'negative' if scores['compound'] < -0.05 else 'neutral'
    
    feedback_item = {
        'id': str(uuid.uuid4()),
        'event': data['event'],
        'rating': data['rating'],
        'comment': data['comment'],
        'sentiment': sentiment,
        'sentiment_score': scores['compound']
    }
    
    feedback.append(feedback_item)
    return jsonify(feedback_item)

@app.route('/feedback', methods=['GET'])
def get_feedback():
    return jsonify(feedback)

if __name__ == '__main__':
    app.run(debug=True)