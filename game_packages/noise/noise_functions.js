//custom package for generating perlin noise gradient maps adapted from https://rtouti.github.io/graphics/perlin-noise-algorithm


//class for creating directionless scalar vectors
class Vector2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	dot(other) {
		return this.x * other.x + this.y * other.y;
	}
}
//function for shuffling the permutation table array
function Shuffle(arrayToShuffle) {
	for (let e = arrayToShuffle.length - 1; e > 0; e--) {
		const index = Math.round(gen() * (e - 1));
		const temp = arrayToShuffle[e];

		arrayToShuffle[e] = arrayToShuffle[index];
		arrayToShuffle[index] = temp;
	}
}
//function for generating a permutation table
function MakePermutation() {
	const permutation = [];
	for (let i = 0; i < 256; i++) {
		permutation.push(i);
	}

	Shuffle(permutation);

	for (let i = 0; i < 256; i++) {
		permutation.push(permutation[i]);
	}

	return permutation;
}
const Permutation = MakePermutation();

function GetConstantVector(v) {
	// v is the value from the permutation table
	const h = v & 3;
	if (h == 0)
		return new Vector2(1.0, 1.0);
	else if (h == 1)
		return new Vector2(-1.0, 1.0);
	else if (h == 2)
		return new Vector2(-1.0, -1.0);
	else
		return new Vector2(1.0, -1.0);
}
//fade function for
function Fade(t) {
	return ((6 * t - 15) * t + 10) * t * t * t;
}

function Lerp(t, a1, a2) {
	return a1 + t * (a2 - a1);
}

function Noise2D(x, y) {
	const X = Math.floor(x) & 255;
	const Y = Math.floor(y) & 255;

	const xf = x - Math.floor(x);
	const yf = y - Math.floor(y);
	//get the vectors for each corner of the grid square
	const topRight = new Vector2(xf - 1.0, yf - 1.0);
	const topLeft = new Vector2(xf, yf - 1.0);
	const bottomRight = new Vector2(xf - 1.0, yf);
	const bottomLeft = new Vector2(xf, yf);

	// Select a value from the permutation array for each of the 4 corners
	const valueTopRight = Permutation[Permutation[X + 1] + Y + 1];
	const valueTopLeft = Permutation[Permutation[X] + Y + 1];
	const valueBottomRight = Permutation[Permutation[X + 1] + Y];
	const valueBottomLeft = Permutation[Permutation[X] + Y];
	//get the dot products between the corner values and their associated vectors
	const dotTopRight = topRight.dot(GetConstantVector(valueTopRight));
	const dotTopLeft = topLeft.dot(GetConstantVector(valueTopLeft));
	const dotBottomRight = bottomRight.dot(GetConstantVector(valueBottomRight));
	const dotBottomLeft = bottomLeft.dot(GetConstantVector(valueBottomLeft));

	const u = Fade(xf);
	const v = Fade(yf);

	return Lerp(u,
		Lerp(v, dotBottomLeft, dotTopLeft),
		Lerp(v, dotBottomRight, dotTopRight)
	);
}
function FractalBrownianMotion(x, y, numOctaves, amplitude, frequency, freq_mult, amp_mult) {
	let result = 0.0;

	for (let octave = 0; octave < numOctaves; octave++) {
		const n = amplitude * Noise2D(x * frequency, y * frequency);
		result += n;

		amplitude *= amp_mult;
		frequency *= freq_mult;
	}

	return result;
}

//generate a normal perlin noise map
function generateNoisemap(height, width, seed) {
	var noise_coords = [];
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height, y++) {
			var noise_val = Noise2D(x, y)
			var rounded_val = Math.round(noise_val * 100) / 100;
			noise_coords.push({ x: x, y: y, value: rounded_val })
		}
	}
	return noise_coords;
}
//generates a noise map while also using brownian motion
function generateBrownianNoisemap(height, width, seed, frequency, octaves, freq_mult, amp_mult) {
	var noise_coords = [];
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			var noise_val = FractalBrownianMotion(x, y, octaves, 1, frequency, freq_mult, amp_mult)
			var rounded_val = Math.round(noise_val * 100) / 100;
			noise_coords.push({ x: x, y: y, value: rounded_val })

		}

	}
	return noise_coords
}

