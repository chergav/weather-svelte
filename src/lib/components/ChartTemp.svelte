<svg
	viewBox="0 0 {chartWidth} {chartHeight}"
	width={chartWidth}
	height={chartHeight}
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- <rect width="100%" height="100%" stroke="#555" fill="none" /> -->
	<path
		d={svgPathD(points, bezierCommand)}
		fill="none"
		stroke-width="1"
		class="stroke-amber-700 dark:stroke-amber-300"
	/>
	{#each points as point}
		{@const [cx, cy] = point}
		<circle {cx} {cy} r="2" class="fill-grey-900 dark:fill-white" />
	{/each}
</svg>

<script>
export let temps;

const chartHeight = 40;
const chartSmoothing = 0.2;
const tempCount = temps.length;
const chartWidth = tempCount * 70;
const roundedTemps = temps.map(Math.round);
const tempMin = Math.min(...roundedTemps);
const tempMax = Math.max(...roundedTemps);

const yUnit = (chartHeight * 0.7) / (tempMax - tempMin || 1); // 0.7 - 30% reduced for padding
const yPoints = roundedTemps.map(v => (v - tempMin) * yUnit);
const points = yPoints.reduce((a, v, i) => [...a, [25 + i * 70, chartHeight * 0.85 - v]], []); // 0.85 - 15% top and bottom padding

const line = (pointA, pointB) => {
	const lengthX = pointB[0] - pointA[0];
	const lengthY = pointB[1] - pointA[1];
	return {
		length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
		angle: Math.atan2(lengthY, lengthX),
	};
};

const controlPoint = (current, previous, next, reverse) => {
	const p = previous || current;
	const n = next || current;

	const o = line(p, n);

	const angle = o.angle + (reverse ? Math.PI : 0);
	const length = o.length * chartSmoothing;

	const x = current[0] + Math.cos(angle) * length;
	const y = current[1] + Math.sin(angle) * length;
	return [x, y];
};

const bezierCommand = (point, i, a) => {
	const cps = controlPoint(a[i - 1], a[i - 2], point);

	const cpe = controlPoint(point, a[i - 1], a[i + 1], true);
	return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
};

const svgPathD = (points, command) => {
	const d = points.reduce(
		(acc, point, i, a) =>
			i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${command(point, i, a)}`,
		''
	);
	return d;
};
</script>
