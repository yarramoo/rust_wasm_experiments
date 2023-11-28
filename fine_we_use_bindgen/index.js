import { greet, factorial } from './pkg';

greet('World');

window.calculateFactorial = () => {
    const input = document.getElementById('numberInput').value;
    const result = factorial(parseInt(input));
    document.getElementById('result').innerText = result;
};