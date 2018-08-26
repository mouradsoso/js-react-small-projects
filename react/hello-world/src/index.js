import React from 'react';
import { render } from 'react-dom';
// css
import './style/css/bootstrap.min.css';
import './index.css';
// javascript perso
import { sampleText } from './sampleText';
// js libraries
import marked from 'marked';

class App extends React.Component {

	state = {

		text : sampleText
	}

		componentWillMount() {
		// Se lance juste avant le rendu
		const localStorageText = localStorage.getItem('text');

		if (localStorageText) {
			this.setState({
				text: localStorageText
			});
		}
	}

	componentWillUpdate(nextProps, nextState) {
		// Se lance juste après le rendu
		localStorage.setItem('text', nextState.text);
	}


	editText = (event) => {
			const text = event.target.value;
			this.setState({text:text});
	};

	renderText= (text) => {
		const renderText = marked(text, {sanitize: true});
		// On place le rendu dans un objet pour se souvenir que c'est dangereux d'insérer du code dans le DOM.
		return { __html: renderText };
	}	

	render(){

		return(

			<div className="container">
				<div className='row'>
					<div className='col-sm-6'>
						<textarea 
							rows='40' 
							value={this.state.text} 
							className='form-control'
							onChange={(e) => this.editText(e)} >
						</textarea>
						
					</div>
				


				  <div className="col-sm-6">
				  	<div dangerouslySetInnerHTML={this.renderText(this.state.text)} />
					</div>

				</div>
			</div>
			
		)
	}
}

render(

	<App />,
	document.getElementById('root')

	);