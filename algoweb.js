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
		if (lines[i].startsWith('Début')) {
			state.isBeforeStart = false;
		}
		if (lines[i].startsWith('Fin')) {
			break;
		}
		
	}
	output.innerHTML = result;
}