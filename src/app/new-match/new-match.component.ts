import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Matches } from '../models/matches';
import { MatchesService } from '../services/matches.service';
import * as moment from 'moment';

@Component({
  selector: 'app-new-match',
  templateUrl: './new-match.component.html',
  styleUrls: ['./new-match.component.css']
})
export class NewMatchComponent implements OnInit {
  
  match = {} as Matches;
  matches: Matches[];

  constructor(private matchesService: MatchesService) {}
  
  ngOnInit() {
    // Inicia a listagem de partidas
    this.getMatches();
  }

  // POST e PUT Partidas
  saveMatch(form: NgForm) {
    if (this.match.id !== undefined) {
      this.matchesService.updateMatch(this.match).subscribe((result) => {
        console.log("Resultado: " , result);
        this.cleanForm(form);
      });
    } else {
      this.matchesService.createMatch(this.match).subscribe((result) => {
        console.log("Resultado: " , result);
        this.cleanForm(form);
      });
    }
  }

  // GET Partidas
  getMatches() {
    this.matchesService.getMatches().subscribe((matches: Matches[]) => {

      for (const key in matches) {
        matches[key]['date'] = moment(matches[key]['date'], 'YYYY-MM-DD HH:mm:ss').format("DD/MM/YYYY");
      }
      
      this.matches = matches;
    });
  }

  // DELETE Partida
  deleteMatch(match: Matches) {
    this.matchesService.deleteMatch(match).subscribe((result) => {
      console.log("Resultado: " , result);
      this.getMatches();
    });
  }

  // Campos para PUT Partidas
  editMatch(match: Matches) {
    this.match = { ...match };
  }

  // Limpa o formulário
  cleanForm(form: NgForm) {
    this.getMatches();
    form.resetForm();
    this.match = {} as Matches;
  }

}
