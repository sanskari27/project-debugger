import { init } from 'debugger-core'; // Importing the core library
import { useEffect, useRef, useState } from 'react';
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
import './App.css';
import reactLogo from './assets/react.svg';
import events from './events.json';
import viteLogo from '/vite.svg';

function App() {
	const rrWebLoadedRef = useRef(false);
	useEffect(() => {
		init({
			eventsAPIUrl: 'http://localhost:3000/api/events', // Replace with your actual API URL
			sid: 'demo-session-id', // Example session ID
			uid: 'demo-user-id', // Example user ID
			channel: 'demo-channel', // Example channel
		});
	}, []);
	useEffect(() => {
		if (rrWebLoadedRef.current) return;
		rrWebLoadedRef.current = true;
		console.log('events', events.length);
		new rrwebPlayer({
			target: document.getElementById('rrweb-player') as HTMLElement, // customizable root element
			props: {
				events,
				width: window.innerWidth,
				height: window.innerHeight,
				maxScale: 1,
				autoPlay: true,
			},
		});
	}, []);
	const [count, setCount] = useState(0);

	return (
		<>
			<div id='rrweb-player' className='main-container'></div>
			<div className='main-container'>
				<div>
					<a href='https://vite.dev' target='_blank'>
						<img src={viteLogo} className='logo' alt='Vite logo' />
					</a>
					<a href='https://react.dev' target='_blank'>
						<img src={reactLogo} className='logo react' alt='React logo' />
					</a>
				</div>
				<h1>Vite + React</h1>
				<div className='card'>
					<button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
					<p>
						Edit <code>src/App.tsx</code> and save to test HMR
					</p>
				</div>
				<p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
			</div>
			<div className='main-container'>
				<div>
					<a href='https://vite.dev' target='_blank'>
						<img src={viteLogo} className='logo' alt='Vite logo' />
					</a>
					<a href='https://react.dev' target='_blank'>
						<img src={reactLogo} className='logo react' alt='React logo' />
					</a>
				</div>
				<h1>Vite + React</h1>
				<div className='card'>
					<button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
					<p>
						Edit <code>src/App.tsx</code> and save to test HMR
					</p>
				</div>
				<p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
			</div>
			<div className='main-container'>
				<div>
					<a href='https://vite.dev' target='_blank'>
						<img src={viteLogo} className='logo' alt='Vite logo' />
					</a>
					<a href='https://react.dev' target='_blank'>
						<img src={reactLogo} className='logo react' alt='React logo' />
					</a>
				</div>
				<h1>Vite + React</h1>
				<div className='card'>
					<button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
					<p>
						Edit <code>src/App.tsx</code> and save to test HMR
					</p>
				</div>
				<p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
			</div>
		</>
	);
}

export default App;
