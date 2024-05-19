function run() {
	const input = document.getElementById('input').value;
	const output = document.getElementById('output');
	let result = '';
	const state = {
		variables: {},
		isBeforeStart: true,
	};
	const lines = input.split('\n');
	if(!lines[0].toLowerCase().startsWith('algorithme')) {
		result = 'Erreur: le programme doit commencer par "Algorithme <nom>".';
	}
	for (let i = 1; i < lines.length; i++) {
		console.log(lines[i]);
		if (lines[i].toLowerCase().startsWith('variables')) {
			console.log('variables');
			if(!state.isBeforeStart) {
				result = 'Erreur: les variables doivent être déclarées avant le début de l\'algorithme.';
			}
			const variableKeyword = lines[i].split(' ')[0];
			const variables = lines[i].replace(variableKeyword, '').split(',');
			console.log(variables)
			variables.forEach(variable => {
				let [name, type] = variable.split(':');
				type = type.trim();
				name = name.trim();
				let isArray = false;
				if (state.variables[name]) {
					result = 'Erreur: la variable ' + name + ' est déjà déclarée.';
				}
				if(name.includes("Tableau")) {
					isArray = true;
					name = name.replace("Tableau", "");

				}
				if(!type) {
					result = 'Erreur: le type de la variable ' + name + ' est manquant.';
				}
				if(!['entier', 'réel', 'reel', 'chaine', 'chaine de caractères', 'chaine de caracteres', 'booléen', 'booleen', 'caractère', 'caractere'].includes(type)) {
					result = 'Erreur: le type de la variable ' + name + ' est inconnu.';
				}
				switch(type) {
					case 'reel':
						type = 'réel';
						break;
					case 'chaine de caractères':
					case 'chaine de caracteres':
						type = 'chaine';
						break;
					case 'booleen':
						type = 'booléen';
						break;
					case 'caractere':
						type = 'caractère';
						break;
				}
				state.variables[name] = { type, value: null, isArray, isFunction: false};
				console.log(state.variables);
			});
		}
		if (lines[i].startsWith('Début') || lines[i].startsWith('Debut')) {
			state.isBeforeStart = false;
		}
		if (lines[i].startsWith('Fin')) {
			break;
		}
		if (lines[i].toLowerCase().startsWith('fonction')) {
			const functionKeyword = lines[i].split(' ')[0];
			const functionName = lines[i].replace(functionKeyword, '').split('(')[0].trim();
			if (state.variables[functionName]) {
				result = 'Erreur: la fonction ' + functionName + ' est déjà déclarée.';
			}
			state.variables[functionName] = { type: 'fonction', value: null, isArray: false, isFunction: true};
		}
		if (lines[i].toLowerCase().startsWith('procedure')) {
			const procedureKeyword = lines[i].split(' ')[0];
			const procedureName = lines[i].replace(procedureKeyword, '').split('(')[0].trim();
			if (state.variables[procedureName]) {
				result = 'Erreur: la procédure ' + procedureName + ' est déjà déclarée.';
			}
			state.variables[procedureName] = { type: 'procedure', value: null, isArray: false, isFunction: true};
		}
		if (lines[i].includes('<-')) {
			const [name, value] = lines[i].split('<-');
			if(!state.variables[name]) {
				result = 'Erreur: la variable ' + name + ' n\'est pas déclarée.';
			}
			state.variables[name].value = value;
		}
		if (lines[i].includes('ecrire')) {
			const name = lines[i].replace('ecrire(', '').replace(')', '');
			if(!name) {
				result = 'Erreur: la valeur à afficher est manquante.';
			} else {
				result += state.variables[name].value + '\n';
			}
		}

		
	}
	output.innerHTML = result;
}