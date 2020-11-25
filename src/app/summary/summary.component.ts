import { Component, OnInit } from '@angular/core';
import {PartyService} from '../services/party.service';
import {MaterialEntry} from '../model/MaterialEntry';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  public ascensionStage: number = 0;

  constructor(public partyService: PartyService) { }

  ngOnInit(): void {
    for(let member of this.partyService.party) { }
  }

  requiredItemsForNextAscension(): Map<string, MaterialEntry>{
    const entries = new Map<string, MaterialEntry>();
    for (const member of this.partyService.party){
      if (member.ascension === 6 || !member.include){
        continue;
      }
      const nextStage = member.ascension;
      for(const entry of member.character.ascension[nextStage].materials){
        if (entries.has(entry.material_id)){
          let oldEntry = entries.get(entry.material_id);
          oldEntry.amount = +oldEntry.amount + +entry.amount;
          entries.set(entry.material_id, oldEntry);
        } else {
          let newEntry = new MaterialEntry();
          newEntry.material_id = entry.material_id;
          newEntry.material = entry.material;
          newEntry.amount = +entry.amount;
          entries.set(entry.material_id, newEntry)
        }
      }
    }
    return entries;
  }

  onAscensionStageChange(): void{
    for(const member of this.partyService.party){
      member.ascension = this.ascensionStage;
    }
  }
}
