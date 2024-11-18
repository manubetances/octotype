
import sentencesData from '../data/sentences.json';

export function getRandomSentenceWords(count: number): string {
    const sentences = sentencesData.easySentences;

    if (!Array.isArray(sentences) || sentences.length === 0) {
        throw new Error('Words data is missing or invalid.');
    }

    // Pick a random sentence
    const randomIndex = Math.floor(Math.random() * sentences.length);
    const randomSentence = sentences[randomIndex];

    //
    const words = randomSentence
    .split(/\s+/)
    .map(word => word.replace(/[.,!?]/g, '').toLowerCase());

    const limitedWords = words.slice(0, count);
    
    return limitedWords.join(' ');
}