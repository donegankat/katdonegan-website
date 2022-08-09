import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from './config/firebaseConfig';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Background from './components/background/Background';
import blue from "@mui/material/colors/blue";

import "./styles/index.scss";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

const customTheme = createTheme({
	palette: {
		mode: "dark",
		primary: blue
	}
});

root.render(
	<React.StrictMode>
		<Background></Background>
		<ThemeProvider theme={customTheme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
