//Classe Calendrier
//creation du calendrier
class Calendar {

    constructor(domTarget) {

        try {
            this.domElement = document.querySelector(domTarget);

            // renvoit une erreur si l'élément n'éxiste pas
            if (!this.domElement) throw "ERROR";
     	 } 
	catch (e) {
           document.getElementById('stateCalendar').innerHTML = "Error: " + e.message + ".";

        }


        // liste des mois de l'année 
        this.monthList = new Array('janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aôut', 'septembre', 'octobre', 'novembre', 'décembre');


        // liste des jours de la semaine
        this.dayList = new Array('lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche');


        // date actuelle
        this.today = new Date();
        this.today.setHours(0, 0, 0, 0);

        // mois actuel
        this.currentMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);

        // le div qui contiendra l'entête de notre calendrier
        let entete = document.createElement('div');
        entete.classList.add('entete');
        this.domElement.appendChild(entete);

        // le div qui contiendra les jours de notre calendrier
        this.content = document.createElement('div');
        this.domElement.appendChild(this.content);

        // le div qui contiendra les jours feriés de notre calendrier
        let contentSpec = document.createElement('div');
        contentSpec.classList.add("contentSpec");
        contentSpec.setAttribute("id", "contentSpec");
        contentSpec.textContent = ""
        this.domElement.appendChild(contentSpec);

        // bouton "précédent"
        let previousButton = document.createElement('button');
        previousButton.setAttribute('data-action', '-1');
        previousButton.textContent = '<';
        entete.appendChild(previousButton);

        // div qui contiendra le mois/année affiché
        this.monthDiv = document.createElement('div');
        this.monthDiv.classList.add('month');
        entete.appendChild(this.monthDiv);

        // bouton "suivant"
        let nextButton = document.createElement('button');
        nextButton.setAttribute('data-action', '1');
        nextButton.textContent = '>';
        entete.appendChild(nextButton);

        // action des boutons "précédent" et "suivant"
        this.domElement.querySelectorAll('button').forEach(element => {
            element.addEventListener('click', () => {
       this.currentMonth.setMonth(this.currentMonth.getMonth() * 1 + element.getAttribute('data-action') * 1);
       this.loadMonth(this.currentMonth);
            });
        });

        // chargement du mois actuel 
        this.loadMonth(this.currentMonth);
 
    }


    loadMonth(date) {
        //marqueur journée feriée
        function JoursFeries(dateferies) {
            var joursFerie = "aucun";
            //liste des jours feries avec le mois dans l'année
            var arrayJoursferies = new Array("1/1", "1/5", "8/5", "14/7", "15/8", "1/11", "11/11", "25/12");
            for (var i = 0; i < arrayJoursferies.length; i++) {
                if (dateferies == arrayJoursferies[i] && i == 0) {
                    joursFerie = "Nouvel an";
                } else if (dateferies == arrayJoursferies[i] && i == 1) {
                    joursFerie = "Fête de travail";
                } else if (dateferies == arrayJoursferies[i] && i == 2) {
                    joursFerie = "Fête de la victoire";
                } else if (dateferies == arrayJoursferies[i] && i == 3) {
                    joursFerie = "Fête nationale";
                } else if (dateferies == arrayJoursferies[i] && i == 4) {
                    joursFerie = "Assompton";
                } else if (dateferies == arrayJoursferies[i] && i == 5) {
                    joursFerie = "Toussaint";
                } else if (dateferies == arrayJoursferies[i] && i == 6) {
                    joursFerie = "Armistice";
                } else if (dateferies == arrayJoursferies[i] && i == 7) {
                    joursFerie = "NOÊL";
                
                }
              
            }
            return joursFerie;
        }



        // On ajoute le mois/année affiché
        this.monthDiv.textContent = this.monthList[date.getMonth()].toUpperCase() + ' ' + date.getFullYear();

        // Creation des cellules contenant le jour de la semaine
        for (let i = 0; i < this.dayList.length; i++) {
            let cell = document.createElement('span');
            cell.classList.add('cell');
            cell.classList.add('day');
            cell.textContent = this.dayList[i].substring(0, 3).toUpperCase();
            if (cell.textContent === 'SAM' || cell.textContent === 'DIM') {
                cell.style.color = "#b4d8ee";
            } else
                cell.style.color = "none";
            this.content.appendChild(cell);
        }

        // nombre de jour dans le mois affiche
        let monthLength = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        // Creation des cellules vides si nécessaire
        var nbCellEmpty = date.getDay();

        if (date.getDay() === 0) {
            nbCellEmpty = 7;
        }

        for (let i = 1; i <= (nbCellEmpty - 1); i++) {
            let cel = document.createElement('span');
            cel.classList.add('cell');
            cel.classList.add('empty');
            this.content.appendChild(cel);

        }


        // Creation des cellules contenant les jours du mois affiche
        for (let i = 1; i <= monthLength + 1; i++) {
            var newDate = new Date(date.getFullYear(), date.getMonth(), i);

            var dayMark = document.createElement('span');
            var cheekJourFeries = 0;
            let cel = document.createElement('button');
            cel.classList.add('cell');
            if (i == (monthLength + 1)) {
                cel = document.createElement('span');
                cel.classList.add('empty');
                cel.textContent = "";
                cel.setAttribute("value", 0);
            } else {
                cel.textContent = i;
                cel.value = i;
                cel.setAttribute("value", i);
                cheekJourFeries = i + "/" + (this.currentMonth.getMonth() + 1);

            }
            var celToday = this.today.getDate() + "/" + this.today.getMonth();
            var celSelect = newDate.getDate() + "/" + newDate.getMonth();


            //style css des weekend
            if (newDate.getDay() == 0 || newDate.getDay() == 6) {
                if (((newDate.getDay() - 1) != this.today.getDay()) && celToday != celSelect) {
                    cel.style.color = "red";
                }
            }


           var markMeeting = localStorage.getItem(i + "/" + (this.currentMonth.getMonth() + 1) + "/" + this.currentMonth.getFullYear() + "-" + 1);
          
            //on ajoute le marqueur pour le jour fernier
            if (JoursFeries(cheekJourFeries) != "aucun") {
                dayMark.textContent = ".";
              this.content.appendChild(cel).appendChild(dayMark);
            }
	    else 
                this.content.appendChild(cel);

            // Timestamp de la cellule recupere la date d une cellule
           let timestamp = new Date(date.getFullYear(), date.getMonth(), i).getTime();

            // Ajoute une classe spéciale pour aujourd'hui
            if (timestamp === this.today.getTime()) {
                cel.classList.add('today');
            }
        }



        // action du boutton de chaque date 
        this.content.querySelectorAll('button').forEach(element => {
            element.addEventListener('click', (e) => {

                // on recupere la valeur du button selectionee
                let targetCheek = e.target.value == null ? e.target.parentElement.value : e.target.value;

                //on ajoute le mois current a la date selectionee
                let jourSelectione = targetCheek + "/" + (this.currentMonth.getMonth() + 1);

                // on affiche sur le dom l'évenement spécifique à cette date
                document.getElementById("contentSpec").innerHTML = JoursFeries(jourSelectione);

                //on ajoute l'année courante à la date selectionée
                jourSelectione += "/" + this.currentMonth.getFullYear();
	   });
        });


    }


}

	const calendar = new Calendar('#calendar');
