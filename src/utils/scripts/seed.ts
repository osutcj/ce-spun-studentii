import { set, ref } from 'firebase/database';
import { exit } from 'process';
import { DB, PointsMode } from '../../shared/models/db';
import { db } from '../firebase/firebase';

const questions = [
  "Ce găsești în geanta unei studente?",
  "Care este cel mai folosit lucru într-o cameră de studenti?",
  "Care este cel mai tare club din Cluj?",
  "Cum iți treci cel mai uşor o restanță?",
  "Cum poți sa nu adormi la cursuri ?",
  "Cel mai bun înlocuitor pentru mâncare este?",
  "Ce mancare se gaseste in frigiderul unei persoane care sta la camin?",
  "Mancarea pe care se lupta tot studentul la cantina?",
  "Cea mai nasoală materie este?",
  "Care e cea mai buna bere din Lidl?",
  "Bautura care nu ar trebui sa lipseasca din frigider este:",
  "Cele mai frecventate busuri de catre studenti?",
  "Care sunt ingredientele din zacusca?",
  "Care este foietajul preferat al studentilor de la Lidl?",
  "De ce un student ar sta mai bine peste weekend la parinti in loc sa stea la camin/chirie?",
  "O studentă isi poate pune pe Tinder descrierea : 'Ies doar cu cineva care ......'",
  "Care sunt motivele pentru care un student nu termina facultatea?",
  "Pe ce cheltuie studentii banii?",
  "La ce tip de party vor studentii sa mearga?",
  "Ce gasesti sub patul de camin?"
];

const answers = [
  ["Absorbante-24", "Servetele umede-15", "Laptop-15", "Elastice de par-14", "Foi-13", "Make-up-12", "Pixuri-7"],
  ["Laptop-28", "Frigider-22", "Tirbuson-13", "Zacuscă-12", "Tigaie-6", "Microunde-11", "Uscator de rufe-8", ""],
  ["After Eight-27", "Euphoria-20", "Form-18", "Caro-12", "NOA-7", "Midi-5", "Phi18-4", "Revolution-7"],
  ["Copiezi-33", "Inveti-31", "Pui un pomelnic-23", "Trimiti pe altcineva-6", "Te milogești de prof-4", "Mita-3", "", "", ""],
  ["Nu te duci-36", "Cafea-20", "Razi cu prietenii-15", "Te joci pe telefon-13", "Energizant-7", "Somn de dinainte-5", "Iti faci notite-4", ""],
  ["Somn-24", "Bere-22", "Tigari-17", "Cafea-16", "Apa-13", "Energizant-8", "", "", ""],
  ["Alcool-27", "Snitele-23", "Zacusca-20", "Nimic-14", "Mezeluri-8", "Chiftele-5", "Salata de boeuf-3"],
  ["Snitel-30", "Cartofi Prajiti-18", "Cas pane-15", "Prajitura-13", "Snitel Elvetian/Gordon Bleu-12", "Gratar de porc-7", "Friptura de pui-5", "", "", ""],
  ["Rezistenta materialelor-34", "Mecanica - Furdulea-17", "Electronica de putere - Festila-16", "ASDN - Cret-15", "MP - Cistelecan-15", "TM - Varga-3", "", "", ""],
  ["Peroni-26", "Becks-23", "Neumarkt-18", "Argus-10", "Calsberg-9", "Steampunk-5", "Perlenbacher-5", "Strasnic-4"],
  ["Bere-73", "Tuica/Palinca-13", "Vin-13", "Suc(Cocktail)-11", "Vodka-7", "Whisky-5", "Gin-5", "Rom-3", "", "", ""],
  ["24B-33", "35-27", "25-10", "46B-9", "5-9", "43P-6", "45-3", "50-3"],
  ["Gogosar-21", "Vinete-19", "Ceapa-18", "Fasole-17", "Rosii-13", "Morcovi-7", "Ciuperci-5", "", ""],
  ["Pizza snack-39", "Foietaj cu carnacior-21", "Foietaj cu ciocolata-14", "Gogosi-12", "Foietaj cu Telemea-9", "Melc cu stafide-5", "", "", ""],
  ["Mancare-36", "Spalat haine-27", "Ii sarac-17", "Prieteni-8", "Colegi de camera enervanti-7", "Obligat de parinti-5", "", "", "", ""],
  ["E dotat peste tot-22", "Nu are restante-18", "Are bani-18", "Are masina-17", "E amuzant-13", "E destept-12", "", "", "", ""],
  ["Restante-40", "Petreceri-23", "Nu-si ia licenta-17", "Devine parinte-14", "N-are bani de taxa-6", "", "", "", "", ""],
  ["Bautura-25", "Tigari-23", "Mancare-19", "Restante-14", "Camin/Chirie-11", "Chestii pt camera-5", "", "", "", ""],
  ["Glow in the crush-24", "Retro-22", "Tehnoase-16", "Retromaneloteca-16", "Kitsch-14", "DnB-5", "PPP-4", "", "", ""],
  ["Papuci-27", "Sticle/PET-uri-19", "Gandaci-15", "Praf/Mizerie-14", "Sosete-12", "Colegu din alta camera-8", "", "", "", ""],
];

const questionData = questions
  .map((question, index) => ({
    id: index,
    revealed: false,
    text: question,
    answers: answers[index].flatMap((answer) => {
      if (!answer.trim()) return [];

      const regex = /^(.+)-(\d+)\s*$/;

      const result = regex.exec(answer);

      if (result === null) throw new Error(`String ${answer} is not valid`);

      return [{
        text: result[1],
        points: +result[2],
        revealed: false,
      }];
    }),
  }));

// const applicationData: Omit<DB, 'questions'> = {
//   currentQuestion: 0,
//   pointsMultiplier: PointsMode.Single,
//   team1: {
//     name: 'Team 1',
//     points: 0,
//   },
//   team2: {
//     name: 'Team 2',
//     points: 0,
//   },
// }

// const finalSeedingData: DB = {
//   ...applicationData,
//   questions: questionData,
// }

// set(ref(db, '/'), finalSeedingData).then(() => {
//   console.log('Seeding done.');
//   exit();
// });
