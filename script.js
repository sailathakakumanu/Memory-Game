let selectedImages = [];
let moves = 0;
let mistakes = 0;
let matchedPairs = 0;  
let canClick = true;
let score = 100;
const images = [
    "minions.jpg", "minions.jpg",
    "doraemon.jpg", "doraemon.jpg",
    "ashpikachu.jpg", "ashpikachu.jpg",
    "oggy.jpg", "oggy.jpg",
    "tom&jerry.jpg", "tom&jerry.jpg",
    "shinchan.jpg", "shinchan.jpg",
    "chotabheem.jpg", "chotabheem.jpg",
    "mrbean.png", "mrbean.png"
];
function fisherYatesShuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
const shuffledImages = fisherYatesShuffle([...images]);
const gridItems = document.querySelectorAll('.grid-item img');
shuffledImages.forEach((image, index) => {
    gridItems[index].dataset.image = image;
});
gridItems.forEach((img) => {
    img.addEventListener('click', () => {
        if (!canClick || !img.src.includes('coverimage.jpg')) return;

        img.src = img.dataset.image;
        selectedImages.push(img);

        if (selectedImages.length === 2) {
            canClick = false;
            moves++;
            document.getElementById('moves').textContent = moves;

            if (selectedImages[0].dataset.image === selectedImages[1].dataset.image) {
                matchedPairs++;
                selectedImages = [];
                canClick = true;

                if (matchedPairs === images.length / 2) {
                    gameOver();
                }
            } 
            else {
                mistakes++;
                score -= 2;
                setTimeout(() => {
                    selectedImages.forEach(img => img.src = 'coverimage.jpg');
                    selectedImages = [];
                    canClick = true;
                }, 1000);
            }
        }
    });
});
function gameOver() {
    setTimeout(() => {
        document.getElementById('game-over').style.display = 'block';
        document.getElementById('final-score').textContent = `Score: ${score}`;
        document.getElementById('final-moves').textContent = `Moves: ${moves}`;
        document.getElementById('final-mistakes').textContent = `Misses: ${mistakes}`;
    }, 500);
}
function resetGame() {
    moves = 0;
    mistakes = 0;
    matchedPairs = 0;
    selectedImages = [];
    canClick = true;
    score = 100; 
    document.getElementById('moves').textContent = moves;
    const shuffledImages = fisherYatesShuffle([...images]);
    shuffledImages.forEach((image, index) => {
        gridItems[index].dataset.image = image;
        gridItems[index].src = 'coverimage.jpg';
    });
}
function playAgain() {
    document.getElementById('game-over').style.display = 'none';
    resetGame();
}
