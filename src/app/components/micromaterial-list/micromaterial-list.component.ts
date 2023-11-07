import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MicroMaterial } from './model/micromaterial.interface';
import { loadMicromaterials } from './bl/micromateriallist';
import { VSCodeCommunicationService } from 'src/app/services/vscode-communication.service';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-micromaterial-list',
  templateUrl: './micromaterial-list.component.html',
  styleUrls: ['./micromaterial-list.component.scss']
})
export class MicromaterialListComponent implements OnInit {
  materials: MicroMaterial[] = [];

  selectedTags: string[] = [];
  allTags: string[] = [];

  nameSearchStr: string = '';

  constructor(private vsCodeComm: VSCodeCommunicationService) {}
  
  ngOnInit(): void {
    this.materials = [
      {
        name: 'Your micromaterial here?',
        description: 'Have you built a micromaterial that you feel can be benificial for the community of learners? Have you encountered an amazing micromaterial online? Contact us via Github or create a pull request to have that micromaterial included in this list so it can be discovered by learners worldwide.',
        url: 'https://github.com/yoshimalaise/Explorotron',
        tags: []
      },
      ...loadMicromaterials().sort((a, b) => (a.name.toLocaleUpperCase() < b.name.toLocaleUpperCase()) ? -1 : (a.name.toLocaleUpperCase() > b.name.toLocaleUpperCase()) ? 1 : 0)
    ];

    this.allTags = this.getAllTags();
  }

  openWebpage(url: string) {
    this.vsCodeComm.sendMessage('openWebpage', { url });
  }

  private getAllTags(): string[] {
    return [... new Set(
      this.materials.reduce((acc, ell) => [...acc, ...ell.tags], [])
    )].sort((a, b) => (a.toLocaleUpperCase() < b.toLocaleUpperCase()) ? -1 : (a.toLocaleUpperCase() > b.toLocaleUpperCase()) ? 1 : 0);
  }

  search() {
    this.materials = [
      ...loadMicromaterials().sort((a, b) => (a.name.toLocaleUpperCase() < b.name.toLocaleUpperCase()) ? -1 : (a.name.toLocaleUpperCase() > b.name.toLocaleUpperCase()) ? 1 : 0)
    ];

    if (this.nameSearchStr !== '') {
      this.materials = this.materials.filter(m => m.name.toLocaleLowerCase().includes(this.nameSearchStr.toLocaleLowerCase()));
    }

    if (this.selectedTags.length > 0) {
      this.materials = this.materials.filter(m => this.hasSubArray(m.tags, this.selectedTags));
    }
    
  }

  clearFilters() {
    this.nameSearchStr = '';
    this.selectedTags = [];
    this.materials = [
      {
        name: 'Your micromaterial here?',
        description: 'Have you built a micromaterial that you feel can be benificial for the community of learners? Have you encountered an amazing micromaterial online? Contact us via Github or create a pull request to have that micromaterial included in this list so it can be discovered by learners worldwide.',
        url: 'https://github.com/yoshimalaise/Explorotron',
        tags: []
      },
      ...loadMicromaterials().sort((a, b) => (a.name.toLocaleUpperCase() < b.name.toLocaleUpperCase()) ? -1 : (a.name.toLocaleUpperCase() > b.name.toLocaleUpperCase()) ? 1 : 0)
    ];
  }

  private hasSubArray(master, sub) {
    return sub.every((i => v => i = master.indexOf(v, i) + 1)(0));
  }
}
